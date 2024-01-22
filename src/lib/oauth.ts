import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { APPWRITE_ENDPOINT } from '$env/static/private';

export function signInWithGithub() {
	if (!browser) return;

	const url = new URL(`${APPWRITE_ENDPOINT}/account/sessions/oauth2/github`);

	url.searchParams.set('success', `${window.location.origin}/api/auth`);
	url.searchParams.set('failure', `${window.location.origin}/`);

	// Crucial: Set token to true to get a auth token in the success URL
	url.searchParams.set('token', `true`);

	goto(url.toString());
}
