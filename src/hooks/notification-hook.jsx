import { useEffect } from "react";

export const useNotification = () => {
	useEffect(() => {
		var toastButton = document.getElementById("toast-btn");

		var toastElement = document.getElementsByClassName("toast")[0];

		var toast;

		if (
			document.getElementById("toast-btn") &&
			document.getElementsByClassName("toast")[0]
		) {
			tost = new bootstrap.Toast(toastElement);
			toastButton.onclick = function () {
				toast.show();
			};
		}

		return () => {
			document.getElementById("toast-btn") &&
				document.getElementsByClassName("toast")[0] &&
				toast.dispose();
		};
	}, [
		document.getElementById("toast-btn"),
		document.getElementsByClassName("toast"),
	]);

	const notify = (type, message) => {
		Snackbar.show({
			text: message,
			actionTextColor: "#fff",
			backgroundColor:
				type == "success"
					? "#00ab55"
					: type == "warning"
					? "#e2a03f"
					: type == "info"
					? "#4361ee"
					: "#e7515a",
			pos: "top-right",
		});
	};

	return { notify };
};
