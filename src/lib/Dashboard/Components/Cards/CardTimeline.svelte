<script>
	import Timeline from '$lib/StudentData/Timeline/Timeline.svelte';

	export let student_progress;
	export let student_id;
</script>

<div
	class="relative pt-12 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 transition-all ease-in-out duration-300"
>
	<div class="px-8">
		<Timeline {student_id} {student_progress} />
	</div>
</div>
