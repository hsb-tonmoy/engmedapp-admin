<script>
	import NotificationDropdown from '$lib/Dashboard/Components/Dropdowns/NotificationDropdown.svelte';
	import UserDropdown from '$lib/Dashboard/Components/Dropdowns/UserDropdown.svelte';

	let collapseShow = 'hidden';

	function toggleCollapseShow(classes) {
		collapseShow = classes;
	}

	const dashboard = [
		{ title: 'Dashboard', link: '/dashboard', icon: 'fa-tv' },
		{ title: 'Accounts', link: '/dashboard/accounts', icon: 'fa-user' }
	];

	const students = [
		{ title: 'Student Data', link: '/dashboard/student-data', icon: 'fa-table' },
		{ title: 'Converted Students', link: '/dashboard/student-data?status=2', icon: 'fa-user-tie' }
	];

	const document_submission = [
		{
			title: 'Document Categories',
			link: '/dashboard/document-categories',
			icon: 'fa-square'
		}
	];

	const knowledgebase = [{ title: 'Videos', link: '/videos', icon: 'fa-video' }];
</script>

<nav
	class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
>
	<div
		class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
	>
		<!-- Toggler -->
		<button
			class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
			type="button"
			on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
		>
			<i class="fas fa-bars" />
		</button>
		<!-- Brand -->
		<a
			class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
			href="/dashboard"
		>
			app.mrashid - Admin
		</a>
		<!-- User -->
		<ul class="md:hidden items-center flex flex-wrap list-none">
			<li class="inline-block relative">
				<NotificationDropdown />
			</li>
			<li class="inline-block relative">
				<UserDropdown />
			</li>
		</ul>
		<!-- Collapse -->
		<div
			class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
		>
			<!-- Collapse header -->
			<div
				class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
			>
				<div class="flex flex-wrap">
					<div class="w-6/12">
						<a
							class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
							href="/dashboard"
						>
							app.mrashid - Admin
						</a>
					</div>
					<div class="w-6/12 flex justify-end">
						<button
							type="button"
							class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
							on:click={() => toggleCollapseShow('hidden')}
						>
							<i class="fas fa-times" />
						</button>
					</div>
				</div>
			</div>
			<!-- Form -->
			<form class="mt-6 mb-4 md:hidden">
				<div class="mb-3 pt-0">
					<input
						type="text"
						placeholder="Search"
						class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
					/>
				</div>
			</form>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
			<!-- Heading -->
			<h6
				class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Dashboard
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none">
				{#each dashboard as item}
					<li class="items-center">
						<a href={item.link} class="text-xs uppercase py-3 font-bold block">
							<i class={`fas ${item.icon} mr-2 text-sm `} />
							{item.title}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
			<!-- Heading -->
			<h6
				class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Student Data
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
				{#each students as item}
					<li class="items-center">
						<a href={item.link} class="text-xs uppercase py-3 font-bold block">
							<i class={`fas ${item.icon} mr-2 text-sm `} />
							{item.title}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
			<!-- Heading -->
			<h6
				class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Document Submission
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
				{#each document_submission as item}
					<li class="items-center">
						<a href={item.link} class="text-xs uppercase py-3 font-bold block">
							<i class={`fas ${item.icon} mr-2 text-sm `} />
							{item.title}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
			<!-- Heading -->
			<h6
				class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Knowledgebase
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
				{#each knowledgebase as item}
					<li class="items-center">
						<a href={item.link} class="text-xs uppercase py-3 font-bold block">
							<i class={`fas ${item.icon} mr-2 text-sm `} />
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
