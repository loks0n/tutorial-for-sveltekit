import { SESSION_COOKIE } from '$lib/server/appwrite.js';

export async function GET({ url, locals, cookies }) {
	const { account } = locals.appwrite;

	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');

	if (userId && secret) {
		const session = await account.createSession(userId, secret);

		cookies.set(SESSION_COOKIE, session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true
		});
	}

	return new Response(null, { status: 302, headers: { location: '/' } });
}
