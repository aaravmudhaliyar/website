<script>
	const slides = [
		{
			bg: '/DSC_0170.jpg',
			eyebrow: '',
			title: 'My Work',
			sub: 'Landscapes, portraits, streets & beyond',
			cta: { text: 'View Gallery', href: '/work' }
		},
		{
			bg: '/DSC_0175.jpg',
			eyebrow: 'The Photographer',
			titleHtml: 'Aarav<br><em>Mudhaliyar</em>',
			sub: 'Light. Silence. Story.',
			cta: { text: 'About Me', href: '/about' }
		},
		{
			bg: '/DSC_0182.jpg',
			eyebrow: '',
			titleHtml: "Let's<br><em>Connect</em>",
			sub: 'Available for editorial, wedding & commercial work',
			cta: { text: 'Get in Touch', href: 'mailto:aaravmudhaliyar@gmail.com' }
		}
	];

	let current = $state(1);
	let progress = $state(0);

	function goTo(index) {
		current = ((index % slides.length) + slides.length) % slides.length;
	}

	function next() {
		goTo(current + 1);
	}

	function prev() {
		goTo(current - 1);
	}

	function handleKeydown(e) {
		if (e.key === 'ArrowLeft') {
			prev();
		} else if (e.key === 'ArrowRight') {
			next();
		}
	}
</script>

<svelte:head>
	<title>Aarav Photography</title>
	<meta
		name="description"
		content="Aarav Photography — A fine art photography portfolio capturing landscapes, portraits, street scenes, and beyond."
	/>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<section
	class="hero-slider"
	aria-label="Photo slideshow"
>
	{#each slides as slide, i}
		<div class="hero-slide" class:active={current === i}>
			<div class="slide-bg" style="background-image: url({slide.bg})"></div>
			<div class="slide-overlay"></div>
			<div class="slide-content">
				<p class="slide-eyebrow">{slide.eyebrow}</p>
				<h1 class="slide-title">
					{#if slide.titleHtml}
						{@html slide.titleHtml}
					{:else}
						{slide.title}
					{/if}
				</h1>
				<a class="slide-cta" href={slide.cta.href}>{slide.cta.text}</a>
			</div>
		</div>
	{/each}

	<button class="slider-arrow prev" aria-label="Previous slide" onclick={prev}>
		<i class="fa-solid fa-chevron-left"></i>
	</button>
	<button class="slider-arrow next" aria-label="Next slide" onclick={next}>
		<i class="fa-solid fa-chevron-right"></i>
	</button>

	<div class="slider-dots">
		{#each slides as _, i}
			<button
				class="slider-dot"
				class:active={current === i}
				aria-label="Go to slide {i + 1}"
				onclick={() => goTo(i)}
			></button>
		{/each}
	</div>
</section>

<style>
	.hero-slider {
		position: relative;
		width: 100%;
		height: 100svh;
		min-height: 560px;
		overflow: hidden;
		background: #0d0c0b;
	}
	.hero-slide {
		position: absolute;
		text-align: center;
		inset: 0;
		opacity: 0;
		pointer-events: none;
		transition: opacity 1s ease;
		z-index: 1;
	}
	.hero-slide.active {
		opacity: 1;
		pointer-events: all;
		z-index: 2;
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
		padding: calc(var(--header-h) + 40px) 8vw 120px;
	}
	.slide-eyebrow {
		font-family: var(--font-sans);
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.55);
		margin-bottom: 20px;
	}
	.slide-title {
		font-family: var(--font-serif);
		font-weight: 200;
		font-size: clamp(52px, 9vw, 118px);
		line-height: 1;
		letter-spacing: -0.01em;
		color: #fff;
		margin-bottom: 22px;
	}
	.slide-title :global(em) {
		font-style: normal;
		font-weight: 200;
		color: rgba(255, 220, 170, 0.9);
	}
	.slide-cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		align-self: center;
		font-family: var(--font-sans);
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #fff;
		padding: 13px 28px;
		border: 1px solid rgba(255, 255, 255, 0.45);
		border-radius: 2px;
		text-decoration: none;
		transition:
			opacity 0.7s ease 0.72s,
			transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.72s,
			background 0.28s ease,
			border-color 0.28s ease,
			letter-spacing 0.28s ease;
	}
	.slide-cta::after {
		content: '→';
		font-size: 14px;
		transition: transform 0.25s ease;
	}
	.slide-cta:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.8);
		letter-spacing: 0.26em;
	}
	.slide-cta:hover::after {
		transform: translateX(4px);
	}
	.slider-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.55);
		font-size: 16px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		transition:
			color 0.25s,
			border-color 0.25s,
			background 0.25s,
			transform 0.25s;
	}
	.slider-arrow.prev {
		left: 28px;
	}
	.slider-arrow.next {
		right: 28px;
	}
	.slider-arrow:hover {
		color: #fff;
		border-color: rgba(255, 255, 255, 0.7);
		background: rgba(0, 0, 0, 0.38);
	}
	.slider-arrow.prev:hover {
		transform: translateY(-50%) translateX(-2px);
	}
	.slider-arrow.next:hover {
		transform: translateY(-50%) translateX(2px);
	}
	.slider-dots {
		position: absolute;
		bottom: 52px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.slider-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.35);
		border: none;
		cursor: pointer;
		transition:
			background 0.3s,
			width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.slider-dot.active {
		background: #fff;
		width: 24px;
		border-radius: 4px;
	}
</style>
