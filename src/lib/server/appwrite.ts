import type { RequestEvent } from '@sveltejs/kit';
import { Client, Account } from 'luke-node-appwrite-ssr';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

export const SESSION_COOKIE = 'a_session';

export function createAppwriteClient(
	event: RequestEvent,
	options?: { setKey?: boolean; setSession?: boolean }
) {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID);

	const { setKey = true, setSession = true } = options ?? {};
	if (setKey) {
		client.setKey(APPWRITE_KEY);
	}

	const origin = event.request.headers.get('origin');
	if (origin) {
		client.setForwardedFor(origin);
	}

	const userAgent = event.request.headers.get('user-agent');
	if (userAgent) {
		client.setForwardedUserAgent(userAgent);
	}

	const session = event.cookies.get(SESSION_COOKIE);
	if (session && setSession) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		}
	};
}
