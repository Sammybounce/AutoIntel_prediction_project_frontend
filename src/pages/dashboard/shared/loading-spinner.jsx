import React from "react";

export const LoadingSpinner = () => {
	return (
		<div className="w-100 h-100 d-flex justify-content-center">
			<div className="spinner-border spinner-border-reverse align-self-center text-primary">
				Loading...
			</div>
		</div>
	);
};
