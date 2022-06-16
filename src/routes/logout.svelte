<script context="module">
	export async function load({ fetch, session }) {
		const res = await fetch('logout');

		return {
			status: 302,
			redirect: '/login'
		};
	}
</script>
