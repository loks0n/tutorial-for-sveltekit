import { redirect } from '@sveltejs/kit';

function getFormString(formData: FormData, key: string, defaultValue: string): string {
	const value = formData.get(key);
	if (!value || typeof value !== 'string') {
		return defaultValue;
	}
	return value;
}

export const actions = {
	login: async ({ locals, request, cookies }) => {
		const { appwrite } = locals;
		const form = await request.formData();

		const email = getFormString(form, 'email', '');
		const password = getFormString(form, 'password', '');

		await appwrite.login(email, password, cookies);
		throw redirect(302, '/');
	},
	register: async ({ locals, request, cookies }) => {
		const { appwrite } = locals;

		const form = await request.formData();

		const email = getFormString(form, 'email', '');
		const password = getFormString(form, 'password', '');
		const name = getFormString(form, 'name', '');

		await appwrite.register(email, password, name, cookies);
		throw redirect(302, '/');
	},
	logout: async ({ locals, cookies }) => {
		const { appwrite } = locals;
		await appwrite.logout(cookies);
		throw redirect(302, '/');
	}
};

export async function load({ locals }) {
	const { user } = locals;

	if (user) {
		throw redirect(302, '/');
	}
}
