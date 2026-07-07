export async function load({ fetch }) {
	const res = await fetch('/images.json');
	const images = await res.json();
	return {
		images
	};
}
