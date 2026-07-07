<script>
	let {
		images = [],
		open = $bindable(false),
		currentIndex = $bindable(0)
	} = $props();

	let visible = $state(false);

	function close() {
		open = false;
	}

	function prev(e) {
		if (e) e.stopPropagation();
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function next(e) {
		if (e) e.stopPropagation();
		currentIndex = (currentIndex + 1) % images.length;
	}

	function handleKeydown(e) {
		if (!open) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
	}

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) {
			close();
		}
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			requestAnimationFrame(() => {
				visible = true;
			});
		} else {
			visible = false;
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox-backdrop" class:visible onclick={handleBackdropClick}>
		<button class="lightbox-close" onclick={close} aria-label="Close lightbox">
			<i class="fas fa-times"></i>
		</button>

		{#if images.length > 1}
			<button class="lightbox-nav lightbox-prev" onclick={prev} aria-label="Previous image">
				<i class="fas fa-chevron-left"></i>
			</button>
			<button class="lightbox-nav lightbox-next" onclick={next} aria-label="Next image">
				<i class="fas fa-chevron-right"></i>
			</button>
		{/if}

		<div class="lightbox-content">
			{#if images[currentIndex]}
				<img
					class="lightbox-img"
					src={images[currentIndex].src}
					alt={images[currentIndex].alt || 'Image preview'}
				/>
				
				{#if images[currentIndex].title || images[currentIndex].category}
					<div class="lightbox-meta">
						{#if images[currentIndex].title}
							<span class="lightbox-title">{images[currentIndex].title}</span>
						{/if}
						{#if images[currentIndex].category}
							<span class="lightbox-cat">{images[currentIndex].category}</span>
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	.lightbox-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.9);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}

	.lightbox-backdrop.visible {
		opacity: 1;
	}

	.lightbox-close {
		position: absolute;
		top: 24px;
		right: 32px;
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.7);
		font-size: 32px;
		cursor: pointer;
		transition: color 0.2s ease, transform 0.2s ease;
		z-index: 10000;
		padding: 8px;
	}

	.lightbox-close:hover {
		color: white;
		transform: rotate(90deg);
	}

	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		border: none;
		color: rgba(255, 255, 255, 0.7);
		font-size: 24px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-nav:hover {
		color: white;
		background: rgba(0, 0, 0, 0.8);
		transform: translateY(-50%) scale(1.1);
	}

	.lightbox-prev {
		left: 32px;
	}

	.lightbox-next {
		right: 32px;
	}

	.lightbox-content {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: 85vh;
		object-fit: contain;
		border-radius: 4px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
		user-select: none;
	}

	.lightbox-meta {
		margin-top: 16px;
		text-align: center;
		color: white;
	}

	.lightbox-title {
		display: block;
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 4px;
		font-family: var(--font-serif, serif);
	}

	.lightbox-cat {
		display: block;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.6);
		font-family: var(--font-sans, sans-serif);
	}

	@media (max-width: 768px) {
		.lightbox-nav {
			width: 44px;
			height: 44px;
			font-size: 18px;
		}
		.lightbox-prev {
			left: 12px;
		}
		.lightbox-next {
			right: 12px;
		}
		.lightbox-close {
			top: 16px;
			right: 16px;
			font-size: 24px;
		}
	}
</style>
