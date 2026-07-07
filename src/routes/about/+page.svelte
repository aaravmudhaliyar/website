<svelte:head>
  <title>About — Aarav Photography</title>
</svelte:head>

<section class="about-section">
  <div class="about-inner">
    <div class="about-text">
      <p class="section-eyebrow">About</p>
      <h2 class="about-title">The Eye<br />Behind the Lens</h2>
      <p class="about-body">
        I am Aarav — a photographer drawn to the quiet spaces between moments. My work explores the interplay of light and shadow, the transient beauty of natural landscapes, and the unguarded honesty found in a human face.
      </p>
      <p class="about-body">
        Based between the mountains and the sea, I travel widely in pursuit of that singular frame where time seems to hold its breath. Every image is a conversation between what is seen and what is felt.
      </p>
    </div>
    <div class="about-image-wrap">
      <img
        src="/DSC_6367.jpg"
        alt="Serene winter forest representative of Aarav's photographic style"
        class="about-img"
      />
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 110px 40px;
    padding-top: calc(var(--header-h) + 110px);
    background: var(--color-bg);
  }

  .about-inner {
    max-width: var(--max-w);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .section-eyebrow {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 10px;
  }

  .about-title {
    font-family: var(--font-serif);
    font-weight: 200;
    font-size: clamp(36px, 4.5vw, 56px);
    letter-spacing: -0.01em;
    line-height: 1.1;
    color: var(--color-fg);
    margin: 12px 0 28px;
  }

  .about-body {
    font-family: var(--font-serif);
    font-weight: 300;
    font-size: 17px;
    line-height: 1.8;
    color: #4a4844;
    margin-bottom: 18px;
  }

  .about-image-wrap {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 2px;
  }

  .about-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
