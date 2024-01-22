import { SESSION_COOKIE } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.user) throw redirect(301, '/');
}

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const { account } = locals.appwrite;

		const form = await request.formData();

		const email = form.get('email') as string;
		const password = form.get('password') as string;

		const session = await account.createEmailSession(email, password);

		cookies.set(SESSION_COOKIE, session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true
		});

		throw redirect(301, '/');
	}
};