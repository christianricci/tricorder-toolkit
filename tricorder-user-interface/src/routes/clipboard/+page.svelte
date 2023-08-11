<script lang="ts">
	// export const prerender = true
	// export const ssr = false
	// // The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	// // Most of your app wide CSS should be put in this file
	// import '../app.postcss';	
	import { copyText } from 'svelte-copy';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const clipsApi = 'http://localhost:3000/clips';
	const clipsClearApi = 'http://localhost:3000/clips/clear';
	const copyToast: ToastSettings = {
		message: 'Content copied to clipboard.',
		timeout: 750
	};
	const clearToast: ToastSettings = {
		message: 'Clipboard Clear.',
		timeout: 750
	};
	const refreshToast: ToastSettings = {
		message: 'Clipboard Updated.',
		timeout: 750
	};
	const loadingToast: ToastSettings = {
		message: 'Loading...',
		timeout: 750
	};	
	let i = 0;
	let loadingText = "";
	let clipsPromise = fetchClips(false);

	function handleLoading(isLoading: boolean) {
		loadingText = isLoading ? "loading...." : "";
		return "";
	};

	function handleCopy(items: any, value: number) {
		copyText(items[value].NAME);
		toastStore.trigger(copyToast);
	}

	async function fetchClips(showToast: boolean) {
		if(showToast) {
			toastStore.trigger(refreshToast);
		}
		const res = await fetch(clipsApi);
		const data = await res.json();

		if (res.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

	async function cleanClips() {
		toastStore.trigger(clearToast);
		const res = await fetch(clipsClearApi);
		const data = await res.json();

		if (res.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}	

	function handleKeydown(event:any, items:any, i:number) {
		// up = 38
		// down = 40
		// right = 39
		// left = 37
		if (event.keyCode == 37) {
			clipsPromise = fetchClips(true);
		} if (event.keyCode == 13) {
			handleCopy(items, i);
		} else {
			return;
		}
	}	
</script>

<svelte:head>
	<title>Clipboard History</title>
	<meta name="description" content="Clipboard" />
</svelte:head>

<Toast />
<h1 class="h1-1">Clipboard History {loadingText}</h1>
<div class="div-cnt-1">
	<div class="div-select-1">
		<p>
			{#await clipsPromise}
				{handleLoading(true)}
				<select class="select" size=20>
				</select>
			{:then items}
				{handleLoading(false)}
				<select
					class="select"
					bind:value={i}
					size=20
					on:keydown={(value) => {
						handleKeydown(event, items, i);
					}}
					on:click={(value) => {
						handleCopy(items, i);
					}}
					autofocus
				>
					{#each items as item, i}
						<option value={i}>{item.NAME}</option>
					{/each}
				</select>
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</p>
	</div>
	<div class="div-btn-1">
		<button
			id="btn1"
			type="button"
			class="btn variant-filled"
			on:click={() => (clipsPromise = fetchClips(true))}
		>
			Refresh
		</button>
		<button
			id="btn2"
			type="button"
			class="btn variant-filled"
			on:click={() => (clipsPromise = cleanClips())}
		>
			Clear
		</button>	
	</div>
</div>

<style>
	.h1-1 {
		position: relative;
		margin-left: 5%;
		margin-right: 5%;
		margin-top: 1%;		
	}
	.div-cnt-1 {
		position: relative;
		margin-left: 5%;
		margin-right: 5%;
		margin-top: 1%;
	}
	.div-btn-1 {
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		margin-left: 1%;
		margin-right: 5%;
		margin-top: 1%;
	}	
</style>
