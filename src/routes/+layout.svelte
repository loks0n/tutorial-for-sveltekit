<script>
	import { enhance } from '$app/forms';
	import '@appwrite.io/pink';
	import '@appwrite.io/pink-icons';

	export let data;

	const { user } = data;
</script>

<div class="u-padding-16 u-max-width-600 u-full-width" style="margin: 0 auto;">
	<nav class="u-flex u-main-space-between u-cross-center u-gap-16 u-padding-16">
		<a class="heading-level-6" href="/">Idea Tracker</a>
		<div class="u-flex u-gap-16 u-cross-center">
			{#if user}
				<span>{user.email}</span>
				<form action="/login?/logout" method="POST">
					<button class="button" type="submit">Logout</button>
				</form>
			{:else}
				<a class="button" href="/login">Login</a>
			{/if}
		</div>
	</nav>
	<main class="u-flex-vertical u-gap-16">
		<slot />
	</main>
</div>
