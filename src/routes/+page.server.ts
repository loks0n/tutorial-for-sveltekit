import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) throw redirect(301, '/signin');

	return {
		user: locals.user
	};
}

export const actions = {
	default: async ({ locals, cookies }) => {
		const { account } = locals.appwrite;

		await account.deleteSession('current');
		cookies.delete('session');

		throw redirect(301, '/signin');
	}
};
