export function loadScript(src, callback) {
	if (document.getElementById(src)) {
		if (callback) callback();
		return;
	}

	const script = document.createElement("script");
	script.id = src;
	script.src = src;
	script.async = true;

	script.onload = () => {
		if (callback) callback();
	};

	script.onerror = () => {
		console.error(`Script load error for ${src}`);
		loadScript(src);
	};

	document.body.appendChild(script);
}
