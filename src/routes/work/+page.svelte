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

<section class="hero-slide">
	<div class="slide-bg" style="background-image: url('/DSC_0182.jpg')"></div>
	<div class="slide-overlay"></div>
	<div class="slide-content">
		<h1 class="slide-title">
			My Work
		</h1>
		<p class="slide-eyebrow">A glimpse</p>
	</div>
</section>

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
	.hero-slide {
		position: relative;
		width: 100%;
		height: 80vh;
		min-height: 400px;
		text-align: center;
		overflow: hidden;
	}
	.slide-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
	}
	.slide-overlay {
		position: absolute;
		inset: 0;
		background: rgba(10, 9, 8, 0.48);
		z-index: 1;
	}
	.slide-content {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.slide-title {
		font-family: var(--font-serif);
		font-weight: 200;
		font-size: clamp(52px, 9vw, 118px);
		line-height: 1;
		letter-spacing: -0.01em;
		color: #fff;
	}
	.slide-eyebrow {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 400;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.55);
		margin-bottom: -30px;
	}

	.slide-title :global(em) {
		font-style: italic;
		font-weight: 200;
		color: rgba(255, 220, 170, 0.9);
	}

	.work-container {
		padding: var(--header-h) 40px 40px;
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
