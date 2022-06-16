<script>
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	import { convertDate } from '$lib/convertDate';

	export let color = 'light';

	export let server_url = '/dashboard/student-data.json';

	let grid;

	function statusLight(cell) {
		let color;
		let text;

		if (cell === 0) {
			color = 'text-gray-500';
			text = 'Default';
		} else if (cell === 1) {
			color = 'text-yellow-500';
			text = 'Package sent';
		} else if (cell === 2) {
			color = 'text-green-500';
			text = 'Converted';
		} else if (cell === 3) {
			color = 'text-orange-500';
			text = 'Follow-up';
		} else if (cell === 4) {
			color = 'text-red-500';
			text = 'Muted';
		}

		return `<i class="fas fa-circle ${color} mr-2"></i> ${text}`;
	}

	function english_proficiency_output(cell) {
		if (cell === 'ielts') {
			return 'IELTS';
		} else if (cell === 'toefl') {
			return 'TOEFL';
		} else if (cell === 'duolingo') {
			return 'Duolingo';
		} else if (cell === 'no-test') {
			return 'Wish to get enrolled without any test';
		} else if (cell === 'moi') {
			return 'Wish to get enrolled with Medium Of Instruction';
		} else if (cell === 'plan-to') {
			return 'Wish to take IELTS';
		}
	}

	const columns = [
		{
			id: 'id',
			name: 'ID',
			formatter: (cell) =>
				html(`<a href="/dashboard/student-data/${cell}" class="text-blue-500">${cell}</a>`)
		},
		{
			id: 'email',
			name: 'Email'
		},
		{
			id: 'first_name',
			name: 'First Name'
		},
		{
			id: 'last_name',
			name: 'Last Name'
		},
		{
			id: 'destination',
			name: 'Destination'
		},
		{
			id: 'degree',
			name: 'Degree'
		},
		{
			id: 'major',
			name: 'Major'
		},
		{
			id: 'english_proficiency',
			name: 'English Proficiency',
			formatter: (cell) => `${english_proficiency_output(cell)}`
		},
		{
			id: 'status',
			name: 'Status',
			formatter: (cell) => html(`${statusLight(cell)}`)
		},
		{
			id: 'rating',
			name: 'Rating'
		},
		{
			id: 'created',
			name: 'Created At'
		}
	];

	const className = {
		container: 'studentdata-container',
		table: 'studentdata-table',
		thead: 'studentdata-thead',
		tr: 'studentdata-tr',
		th: 'studentdata-th',
		td: 'studentdata-td',
		pagination: 'studentdata-pagination',
		paginationSummary: 'studentdata-pagination-summary',
		paginationButton: 'studentdata-pagination-button',
		paginationButtonNext: 'studentdata-pagination-button-next',
		paginationButtonCurrent: 'studentdata-pagination-button-current',
		paginationButtonPrev: 'studentdata-pagination-button-previous',
		search: 'studentdata-search'
	};
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light'
		? 'bg-white'
		: 'bg-red-800 text-white'}"
>
	<div class="rounded-t mb-0 px-4 py-5 border-0">
		<div class="flex flex-wrap items-center">
			<div class="relative w-full px-4 max-w-full flex-grow flex-1">
				<h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
					Student Data
				</h3>
			</div>
		</div>
	</div>
	<div class="block w-full overflow-x-auto">
		<!-- Projects table -->

		<Grid
			{className}
			bind:instance={grid}
			sort={{
				multiColumn: false,
				server: {
					url: (prev, columns) => {
						if (!columns.length) return prev;

						const col = columns[0];
						const dir = col.direction === 1 ? '' : '-';
						let colName = [
							'id',
							'email',
							'first_name',
							'last_name',
							'destination',
							'degree',
							'major',
							'english_proficiency',
							'status',
							'rating',
							'created'
						][col.index];

						return `${prev}${prev.includes('?') ? '&' : '?'}ordering=${dir}${colName}`;
					}
				}
			}}
			pagination={{
				enabled: true,
				limit: 50,
				server: {
					url: (prev, page, limit) =>
						`${prev}${prev.includes('?') ? '&' : '?'}limit=${limit}&offset=${page * limit}`
				}
			}}
			search={{
				server: {
					url: (prev, keyword) => `${prev}${prev.includes('?') ? '&' : '?'}search=${keyword}`
				}
			}}
			server={{
				url: server_url,
				then: (data) =>
					data.results.map((student) => {
						return [
							student.id,
							student.email,
							student.first_name,
							student.last_name,
							student.destination,
							student.degree,
							student.major,
							student.english_proficiency,
							student.status,
							student.rating,
							convertDate(student.created)
						];
					}),
				total: (data) => data.count
			}}
			{columns}
		/>
	</div>
</div>

<style lang="postcss" global>
	:global(.studentdata-table) {
		@apply items-center w-full bg-transparent border-collapse;
	}

	:global(.studentdata-th) {
		@apply px-6 pt-4 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100;
	}
	:global(.studentdata-td) {
		@apply border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4;
	}

	:global(.studentdata-pagination) {
		@apply flex justify-end items-center;
	}

	:global(.studentdata-pagination-summary) {
		@apply text-xs;
	}

	:global(.studentdata-pagination-button) {
		@apply px-4 py-2 text-sm font-medium text-blueGray-700 hover:text-blueGray-800 hover:bg-blueGray-100 focus:outline-none;
	}

	:global(.studentdata-pagination-button-next) {
		@apply ml-2;
	}

	:global(.studentdata-pagination-button-current) {
		@apply bg-blueGray-100;
	}

	:global(.studentdata-pagination-button-previous) {
		@apply ml-2;
	}

	:global(.studentdata-search) {
		@apply flex absolute ml-4 top-0 right-0 mt-3 mr-4;
	}
	:global(.gridjs-search-input) {
		@apply border-0 py-3 pr-6 lg:pr-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full;
	}
</style>
