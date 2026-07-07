<script>
	/** @type {{ images?: Array<{ src: string, alt: string, title: string, category: string }>, open?: boolean, currentIndex?: number }} */
	let {
		images = [],
		open = $bindable(false),
		currentIndex = $bindable(0)
	} = $props();

	let visible = $state(false);
	let imgFaded = $state(false);

	function close() {
		open = false;
	}

	function prev() {
		imgFaded = true;
		setTimeout(() => {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
			imgFaded = false;
		}, 150);
	}

	function next() {
		imgFaded = true;
		setTimeout(() => {
			currentIndex = (currentIndex + 1) % images.length;
			imgFaded = false;
		}, 150);
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

	// Animate in/out with a slight delay for the CSS transition
	$effect(() => {
		if (open) {
			requestAnimationFrame(() => {
				visible = true;
			});
		} else {
			visible = false;
		}
	});

	// Lock body scroll when open
	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	// Keyboard listener
	$effect(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	let currentImage = $state(undefined);
	$effect(() => {
		currentImage = images[currentIndex];
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox-backdrop" class:visible></div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox" class:visible onclick={handleBackdropClick}>
		<button class="lightbox-close" onclick={close} aria-label="Close lightbox">
			&times;
		</button>

		{#if images.length > 1}
			<button class="lightbox-prev" onclick={prev} aria-label="Previous image">
				<i class="fas fa-chevron-left"></i>
			</button>
			<button class="lightbox-next" onclick={next} aria-label="Next image">
				<i class="fas fa-chevron-right"></i>
			</button>
		{/if}

		{#if currentImage}
			<div class="lightbox-img-wrap">
				<img
					class="lightbox-img"
					class:faded={imgFaded}
					src={currentImage.src}
					alt={currentImage.alt}
				/>
			</div>

			<div class="lightbox-meta">
				{#if currentImage.title}
					<span class="lightbox-title">{currentImage.title}</span>
				{/if}
				{#if currentImage.category}
					<span class="lightbox-cat">{currentImage.category}</span>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style>
	.lightbox-backdrop {
		position: fixed; inset: 0;
		background: rgba(10, 10, 10, 0.95); z-index: 200;
		backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
		opacity: 0; transition: opacity 0.4s ease;
	}
	.lightbox-backdrop.visible { opacity: 1; }
	.lightbox {
		position: fixed; inset: 0; z-index: 201;
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		padding: 20px; opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
	}
	.lightbox.visible { opacity: 1; pointer-events: all; }
	.lightbox-img-wrap {
		max-width: min(90vw, 1100px); max-height: 80vh;
		display: flex; align-items: center; justify-content: center;
	}
	.lightbox-img {
		max-width: 100%; max-height: 80vh; width: auto; height: auto;
		object-fit: contain; border-radius: 2px;
		box-shadow: 0 40px 100px rgba(0,0,0,0.6); transition: opacity 0.3s ease;
	}
	.lightbox-img.faded { opacity: 0; }
	.lightbox-close {
		position: absolute; top: 22px; right: 28px;
		font-size: 28px; color: rgba(255,255,255,0.6);
		line-height: 1; padding: 8px; transition: color 0.2s, transform 0.2s;
		background: none; border: none; cursor: pointer;
	}
	.lightbox-close:hover { color: #fff; transform: rotate(90deg); }
	.lightbox-prev, .lightbox-next {
		position: absolute; top: 50%; transform: translateY(-50%);
		font-size: 22px; color: rgba(255,255,255,0.5);
		padding: 16px 20px; transition: color 0.2s, transform 0.3s;
		background: none; border: none; cursor: pointer;
	}
	.lightbox-prev { left: 16px; }
	.lightbox-next { right: 16px; }
	.lightbox-prev:hover { color: #fff; transform: translateY(-50%) translateX(-4px); }
	.lightbox-next:hover { color: #fff; transform: translateY(-50%) translateX(4px); }
	.lightbox-meta {
		position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
		display: flex; flex-direction: column; align-items: center; gap: 5px;
	}
	.lightbox-title {
		font-family: var(--font-serif); font-weight: 300; font-size: 18px;
		color: rgba(255,255,255,0.85);
	}
	.lightbox-cat {
		font-family: var(--font-sans); font-size: 10px;
		letter-spacing: 0.2em; text-transform: uppercase;
		color: rgba(255,255,255,0.4);
	}
</style>
