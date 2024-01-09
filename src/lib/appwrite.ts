import type { Cookies } from '@sveltejs/kit';
import { Client, Account, type Models, Users, ID } from 'luke-appwrite-ssr-test';
import { APPWRITE_KEY } from '$env/static/private';

const SESSION_COOKIE_NAME = 'a_session';
const PROJECT_ID = '6544e1b4ae36c03a1f34';

export class AppwriteService {
	client: Client;
	account: Account;
	users: Users;

	constructor() {
		this.client = new Client()
			.setEndpoint('http://localhost/v1')
			.setProject(PROJECT_ID)
			.setKey(APPWRITE_KEY);

		this.account = new Account(this.client);
		this.users = new Users(this.client);
	}

	setSessionFromCookies(cookies: Cookies): boolean {
		const session = cookies.get(SESSION_COOKIE_NAME);
		if (!session) return false;

		this.client.setSession(session);
		return true;
	}

	setForwardedHeaders(headers: Headers): void {
		const originalIp = headers.get('origin');
		if (originalIp) this.client.setForwardedFor(originalIp);

		const userAgent = headers.get('user-agent');
		if (userAgent) this.client.setForwardedUserAgent(userAgent);
	}

	async getLoggedInUser(): Promise<Models.User<Models.Preferences> | undefined> {
		try {
			return await this.account.get();
		} catch (error) {
			return undefined;
		}
	}

	async register(
		email: string,
		password: string,
		name: string,
		cookies: Cookies
	): Promise<Models.Session> {
		await this.account.create(ID.unique(), email, password, name);
		return this.login(email, password, cookies);
	}

	async login(email: string, password: string, cookies: Cookies): Promise<Models.Session> {
		const session = await this.account.createEmailSession(email, password);
		cookies.set(SESSION_COOKIE_NAME, session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true
		});
		return session;
	}

	async logout(cookies: Cookies): Promise<void> {
		cookies.delete(SESSION_COOKIE_NAME);
		await this.account.deleteSession('current');
	}
}
