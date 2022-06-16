<script>
	import { page, session } from '$app/stores';
	import TimeAgo from 'javascript-time-ago';
	import { useTooltip } from '@untemps/svelte-use-tooltip';
	import { convertDate } from '$lib/convertDate';
	import AddNote from '$lib/StudentData/AddNote.svelte';
	import en from 'javascript-time-ago/locale/en.json';

	TimeAgo.addDefaultLocale(en);

	export let notes;

	let addNoteShow = false;

	let editing = false;

	let editingData = {};

	const timeAgo = new TimeAgo('en-US');

	function priorityColor(priority) {
		switch (priority) {
			case 1:
				return 'border-gray-200';
			case 2:
				return 'border-amber-600';
			case 3:
				return 'border-red-400';
			case 4:
				return 'border-2 border-red-600';
			default:
				return 'border-gray-200';
		}
	}

	function onNoteClick(note) {
		editing = true;
		editingData = note;
	}
</script>

<div
	class="relative pt-12 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 transition-all ease-in-out duration-300"
>
	<div class="px-8">
		{#if notes.length > 0}
			<ol class="relative border-l border-gray-200 dark:border-gray-700 ">
				{#each notes as note}
					<li class="mb-10 ml-6">
						<div
							class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
						>
							<span
								use:useTooltip={{
									content: note.created_by.first_name + ' ' + note.created_by.last_name,
									position: 'left',
									animated: true
								}}
							>
								<img
									class="rounded-full shadow-lg cursor-pointer"
									src={note.created_by.profile_pic}
									alt={note.created_by.first_name + ' ' + note.created_by.last_name}
								/>
							</span>
						</div>
						<div
							class={`p-4 bg-white rounded-lg border ${priorityColor(
								note.priority
							)} shadow-sm dark:bg-gray-700 `}
						>
							<div class="justify-between items-center sm:flex">
								<time
									use:useTooltip={{
										content: convertDate(note.date_added),
										position: 'top',
										animated: true
									}}
									class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0"
									>{timeAgo.format(new Date(note.date_added))}</time
								>
								<div
									class="text-sm font-normal decoration-dotted text-stone-800 lex dark:text-gray-300"
									class:line-through={note.complete}
								>
									{note.title}
									<span
										class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300"
										>{note.category.name}</span
									>
									{#if note.internal}
										<span
											class="bg-blue-700 text-gray-200 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300"
											>Internal</span
										>
									{/if}
								</div>
							</div>
							{#if note.description}
								<div
									class="p-3 mt-3 text-xs italic font-normal text-gray-800 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300"
								>
									{note.description}
								</div>
							{/if}
						</div>
					</li>
				{/each}
			</ol>
		{:else}
			<div class="flex items-center justify-center">
				<div class="text-center text-gray-600 text-sm">No notes to display</div>
			</div>
		{/if}
	</div>
	{#if !addNoteShow}
		<button
			on:click={() => (addNoteShow = !addNoteShow)}
			type="button"
			class="self-end my-6 mr-8 text-white bg-blueGray-600 hover:bg-blueGray-500 focus:ring-4 font-medium text-xs uppercase px-4 py-2.5 text-center inline-flex items-center"
		>
			Add Note
			<svg
				class="ml-2 -mr-1 w-4 h-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
				/>
			</svg>
		</button>
	{:else}
		<AddNote bind:notes student_id={$page.params.id} bind:addNoteShow />
	{/if}
</div>

<style lang="postcss">
	:global(.tooltip-left) {
		@apply text-xs;
	}
	li:last-of-type {
		margin-bottom: 0;
	}
</style>
