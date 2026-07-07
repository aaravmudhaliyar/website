<script>
	let scrolled = $state(false);

	$effect(() => {
		function onScroll() {
			scrolled = window.scrollY > 20;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<header class="site-header" class:scrolled>
	<div class="header-inner">
		<nav class="nav-left">
			<a href="/work" class="nav-link">Work</a>
			<a href="/about" class="nav-link">About</a>
		</nav>

		<a href="/" class="site-logo">Aarav</a>

		<nav class="nav-right">
			<a
				href="https://instagram.com/apm_clicks"
				class="social-link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
			>
				<i class="fab fa-instagram"></i>
			</a>
			<a
				href="https://linkedin.com/in/apm_clicks"
				class="social-link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
			>
				<i class="fab fa-linkedin-in"></i>
			</a>
			<a
				href="mailto:aaravmudhaliyar@gmail.com"
				class="social-link"
				aria-label="Email"
			>
				<i class="far fa-envelope"></i>
			</a>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: fixed; top: 0; left: 0; right: 0; z-index: 100;
		height: var(--header-h);
		background: rgba(250, 249, 247, 0.88);
		backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid transparent;
		transition: border-color 0.3s ease, background 0.3s ease;
	}
	.site-header.scrolled {
		border-bottom-color: var(--color-border);
		background: rgba(250, 249, 247, 0.97);
	}
	.header-inner {
		max-width: var(--max-w); margin: 0 auto; padding: 0 40px;
		height: 100%; display: flex; align-items: center; justify-content: space-between;
	}
	.nav-left, .nav-right { display: flex; align-items: center; gap: 36px; }
	.nav-right .social-link {
		display: flex; align-items: center; justify-content: center;
		font-size: 15px; color: var(--color-muted);
		transition: color 0.25s ease, transform 0.2s ease; line-height: 1;
	}
	.nav-right .social-link:hover { color: var(--color-fg); transform: translateY(-1px); }
	.nav-link {
		font-family: var(--font-sans); font-weight: 400; font-size: 12px;
		letter-spacing: 0.12em; text-transform: uppercase;
		color: var(--color-muted); transition: color 0.25s ease; position: relative;
	}
	.nav-link::after {
		content: ''; position: absolute; left: 0; bottom: -2px;
		width: 0; height: 1px; background: var(--color-fg);
		transition: width 0.3s var(--ease-out);
	}
	.nav-link:hover { color: var(--color-fg); }
	.nav-link:hover::after { width: 100%; }
	.site-logo {
		font-family: var(--font-serif); font-weight: 200; font-size: 22px;
		letter-spacing: 0.18em; text-transform: uppercase;
		color: var(--color-fg); transition: opacity 0.25s ease;
	}
	.site-logo:hover { opacity: 0.7; }
	@media (max-width: 900px) {
		.header-inner { padding: 0 24px; }
		.nav-left, .nav-right { gap: 20px; }
	}
	@media (max-width: 600px) {
		.nav-left .nav-link:not(:first-child),
		.nav-right .nav-link:not(:last-child) { display: none; }
	}
</style>
