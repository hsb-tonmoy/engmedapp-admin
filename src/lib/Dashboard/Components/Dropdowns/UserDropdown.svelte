<script>
	import { session } from '$app/stores';
	import { post } from '$lib/utils.js';

	import { createPopper } from '@popperjs/core';

	// core components

	let dropdownPopoverShow = false;

	let btnDropdownRef;
	let popoverDropdownRef;

	const toggleDropdown = (event) => {
		event.preventDefault();
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: 'bottom-start'
			});
		}
	};

	async function logout() {
		await post(`/auth/logout`);

		$session.user = null;
	}
</script>

<div>
	<a
		class="text-blueGray-500 block"
		href="#pablo"
		bind:this={btnDropdownRef}
		on:click={toggleDropdown}
	>
		<div class="items-center flex">
			<span
				class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
			>
				<img
					alt={$session.user && $session.user.first_name}
					class="w-full rounded-full align-middle border-none shadow-lg"
					src={$session.user && $session.user.profile_pic}
				/>
			</span>
		</div>
	</a>
	<div
		bind:this={popoverDropdownRef}
		class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
			? 'block'
			: 'hidden'}"
	>
		<a
			href="#pablo"
			on:click={(e) => e.preventDefault()}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
		>
			{$session.user && $session.user.username}
		</a>
		<a
			href="#pablo"
			on:click={(e) => e.preventDefault()}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
		>
			Another action
		</a>
		<a
			href="#pablo"
			on:click={(e) => e.preventDefault()}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
		>
			Something else here
		</a>
		<div class="h-0 my-2 border border-solid border-blueGray-100" />
		<p
			on:click={logout}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
		>
			Logout
		</p>
	</div>
</div>
