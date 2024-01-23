import { SESSION_COOKIE } from '$lib/server/appwrite.js';

export async function GET({ url, locals, cookies }) {
	const { account } = locals.appwrite;

	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');

	const headers = new Headers();
	headers.set('location', '/');

	if (userId && secret) {
		const session = await account.createSession(userId, secret);

		headers.set(
			'set-cookie',
			cookies.serialize(SESSION_COOKIE, session.secret, {
				sameSite: 'strict',
				expires: new Date(session.expire)
			})
		);
	}

	return new Response(null, { status: 302, headers });
}
