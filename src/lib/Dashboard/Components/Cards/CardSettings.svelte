<script>
	import { page, session } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import SendStudentEmail from '$lib/StudentData/SendStudentEmail.svelte';

	export let data;

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import {
		DESTINATION,
		DEGREE,
		EP_CHOICES,
		STATUS_CHOICES,
		PRIORITY_RATINGS,
		MAJORS,
		CURRICULUM,
		LEVEL
	} from '$lib/StudentData/options';

	const { form, state, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			id: data.id,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			destination: data.destination,
			degree: data.degree,
			phone: data.phone,
			social_media: data.social_media,
			major: data.major,
			education: data.education,
			english_proficiency: data.english_proficiency,
			english_proficiency_score: data.english_proficiency_score,
			message: data.message,
			dr_rashids_notes: data.dr_rashids_notes,
			status: data.status,
			rating: data.rating,
			created: data.created
		},
		// validationSchema: yup.object().shape({
		// 	email: yup
		// 		.string()
		// 		.email('Please enter a valid e-mail address')
		// 		.required('Email address is required')
		// 		.trim(),
		// 	password: yup.string().required('Password is required')
		// }),
		onSubmit: (values) => {
			handleStudentDataSubmit(JSON.stringify(values));
		}
	});

	async function handleStudentDataSubmit(body) {
		const response = await fetch(`/dashboard/student-data/${$page.params.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		if (response.ok) {
			toast.push(`${$form.first_name} ${$form.last_name}'s data successfully updated`, {
				duration: 3000,

				theme: {
					'--toastBackground': '#48BB78',
					'--toastBarBackground': '#2F855A'
				}
			});
		} else {
			console.log(response);
			toast.push('Something went wrong! Please re-check the data', {
				duration: 5000,

				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
		}
	}

	function addEducationData() {
		$form.education = $form.education.concat([
			{
				curriculum: '',
				level: '',
				gpa: '',
				year: ''
			}
		]);
	}

	function deleteEducationData() {
		$form.education = $form.education.slice(0, -1);
	}
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
	<div class="rounded-t bg-white mb-0 px-6 py-6">
		<div class="text-center flex justify-between">
			<h6 class="text-blueGray-700 text-xl font-bold">{data.first_name} {data.last_name}</h6>
			<div class="flex w-auto lg:w-96 gap-x-4">
				<select
					id="grid-status"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					bind:value={$form.status}
					on:change={handleChange}
				>
					{#each STATUS_CHOICES as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
				<select
					id="grid-rating"
					class="fas border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					bind:value={$form.rating}
					on:change={handleChange}
				>
					{#each PRIORITY_RATINGS as option}
						<option value={option.value}>{@html option.label}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
		<form on:submit|preventDefault={handleSubmit}>
			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-id">
							ID
						</label>
						<input
							id="grid-id"
							disabled
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.id}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email address
						</label>
						<input
							id="grid-email"
							type="email"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.email}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-first-name"
						>
							First Name
						</label>
						<input
							id="grid-first-name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.first_name}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-last-name"
						>
							Last Name
						</label>
						<input
							id="grid-last-name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.last_name}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-phone"
						>
							Contact No.
						</label>
						<input
							id="grid-phone"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.phone}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-social"
						>
							Social Media
						</label>
						<input
							id="grid-social"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.social_media}
							on:change={handleChange}
						/>
					</div>
				</div>
			</div>

			<hr class="mt-6 border-b-1 border-blueGray-300" />

			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
				Study Abroad Information
			</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-destination"
						>
							Destination
						</label>
						<select
							id="grid-destination"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.destination}
							on:change={handleChange}
						>
							{#each DESTINATION as option}
								<option value={option.label}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-degree"
						>
							Degree
						</label>
						<select
							id="grid-degree"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.degree}
							on:change={handleChange}
						>
							{#each DEGREE as option}
								<option value={option.label}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-major"
						>
							Major
						</label>
						<select
							id="grid-major"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.major}
							on:change={handleChange}
						>
							{#each MAJORS as option}
								<option value={option.label}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-ep">
							English Proficiency
						</label>
						<select
							id="grid-ep"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.english_proficiency}
							on:change={handleChange}
						>
							{#each EP_CHOICES as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>
				{#if data.english_proficiency === 'ielts' || data.english_proficiency === 'toefl' || data.english_proficiency === 'duolingo'}
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-ep-score"
							>
								English Proficiency Score
							</label>
							<input
								id="grid-ep-score"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={$form.english_proficiency_score}
								on:change={handleChange}
							/>
						</div>
					</div>
				{/if}
			</div>
			<hr class="mt-6 border-b-1 border-blueGray-300" />

			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Education Information</h6>
			<div class="flex flex-wrap">
				{#each $form.education as _, i}
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-curriculum"
							>
								Curriculum
							</label>
							<select
								id="grid-curriculum"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={$form.education[i].curriculum}
								on:change={handleChange}
							>
								{#each CURRICULUM as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-level"
							>
								Level
							</label>
							<select
								id="grid-level"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={$form.education[i].level}
								on:change={handleChange}
							>
								{#each LEVEL as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-gpa"
							>
								GPA
							</label>
							<input
								id="grid-gpa"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={$form.education[i].gpa}
								on:change={handleChange}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-year"
							>
								Year
							</label>
							<input
								id="grid-year"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={$form.education[i].year}
								on:change={handleChange}
							/>
						</div>
					</div>
				{/each}

				<div class="w-full flex gap-x-2 lg:w-3/12 px-4">
					<button
						type="button"
						on:click={addEducationData}
						class="px-4 py-2 bg-blueGray-600 text-xs font-bold text-gray-100 uppercase">Add</button
					>
					<button
						type="button"
						on:click={deleteEducationData}
						class="px-4 py-2 bg-red-400 text-xs font-bold text-gray-100 uppercase">Remove</button
					>
				</div>
			</div>

			<hr class="mt-6 border-b-1 border-blueGray-300" />

			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Other</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-12/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-query"
						>
							Student Query
						</label>
						<textarea
							id="grid-query"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							rows="8"
							bind:value={$form.message}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-12/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-notes"
						>
							Dr. Rashid's Notes
						</label>
						<textarea
							id="grid-notes"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							rows="8"
							bind:value={$form.dr_rashids_notes}
							on:change={handleChange}
						/>
					</div>
					<div class="flex justify-between">
						<button
							class="bg-green-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
						>
							Update Data
						</button>
						{#if $session.user && $session.user.account_type === 6}
							<SendStudentEmail
								id={$page.params.id}
								first_name={$form.first_name}
								last_name={$form.last_name}
							/>
						{/if}
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
