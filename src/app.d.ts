import type { Models } from 'luke-appwrite-ssr-test';
import type { AppwriteService } from '$lib/appwrite';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Models.User<Preferences>;
			appwrite: AppwriteService;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
