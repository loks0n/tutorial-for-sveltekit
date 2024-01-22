import type { Cookies } from '@sveltejs/kit';
import { Client, Account, type Models, Users } from 'luke-node-appwrite-ssr';
import { APPWRITE_KEY } from '$env/static/private';

export const SESSION_COOKIE = 'a_session';
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
		const session = cookies.get(SESSION_COOKIE);
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
}
