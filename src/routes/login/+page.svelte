<script>
	import { enhance } from '$app/forms';
</script>

<section class="card">
	<h1 class="heading-level-1">Login or register</h1>
	<form
		method="POST"
		action="?/login"
		class="form u-margin-block-start-16 u-gap-16 u-width-full-line u-max-width-500"
	>
		<input class="input-text" name="email" type="email" placeholder="Email" />
		<input class="input-password" name="password" type="password" placeholder="Password" />
		<button class="button" type="submit">Login</button>
	</form>

	<form
		method="POST"
		action="?/register"
		class="form u-margin-block-start-16 u-gap-16 u-width-full-line u-max-width-500"
	>
		<input class="input-text" name="name" type="text" placeholder="Name" />
		<input class="input-text" name="email" type="email" placeholder="Email" />
		<input class="input-password" name="password" type="password" placeholder="Password" />

		<button class="button" type="submit">Register</button>
	</form>
</section>
