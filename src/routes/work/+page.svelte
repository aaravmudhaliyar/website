<script>
	import Lightbox from '$lib/components/Lightbox.svelte';
	let { data } = $props();

	let lightboxOpen = $state(false);
	let currentImageIndex = $state(0);

	function openLightbox(index) {
		currentImageIndex = index;
		lightboxOpen = true;
	}
</script>

<svelte:head>
	<title>Work — Aarav Photography</title>
</svelte:head>

<section class="work-container">
	<div class="masonry-grid">
		{#if data.images}
			{#each data.images as image, index}
				<div class="masonry-item">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<img 
						src={image.thumbSrc || image.src} 
						alt={image.alt} 
						loading="lazy" 
						onclick={() => openLightbox(index)}
						style="cursor: pointer;"
					/>
				</div>
			{/each}
		{:else}
			<p>Loading pictures...</p>
		{/if}
	</div>
</section>

{#if data.images}
	<Lightbox 
		images={data.images} 
		bind:open={lightboxOpen} 
		bind:currentIndex={currentImageIndex} 
	/>
{/if}

<style>
	.work-container {
		padding: calc(var(--header-h) + 40px) 40px 40px;
		max-width: var(--max-w);
		margin: 0 auto;
	}

	.masonry-grid {
		column-count: 1;
		column-gap: 16px;
	}

	.masonry-item {
		break-inside: avoid;
		margin-bottom: 16px;
	}

	.masonry-item img {
		width: 100%;
		height: auto; /* Ensures aspect ratio is maintained */
		display: block;
		border-radius: 2px;
		transition: filter 0.3s ease;
	}

	.masonry-item img:hover {
		filter: brightness(0.85);
	}

	@media (min-width: 600px) {
		.masonry-grid {
			column-count: 2;
		}
	}

	@media (min-width: 900px) {
		.masonry-grid {
			column-count: 3;
		}
	}
</style>
