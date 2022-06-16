<script context="module">
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {};
	}
</script>

<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import AdminNavbar from '$lib/Dashboard/Navbars/AdminNavbar.svelte';
	import Sidebar from '$lib/Dashboard/Sidebar/Sidebar.svelte';
	import HeaderStats from '$lib/Dashboard/Headers/HeaderStats.svelte';
	import FooterAdmin from '$lib/Dashboard/Footers/FooterAdmin.svelte';
</script>

<div>
	<Sidebar />
	<div class="relative md:ml-64 bg-blueGray-100">
		<AdminNavbar />
		<HeaderStats />
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<slot />
			<FooterAdmin />
		</div>
	</div>
</div>

<SvelteToast />
