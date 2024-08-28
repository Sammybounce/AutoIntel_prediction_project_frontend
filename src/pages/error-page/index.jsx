import { useNavigate } from "react-router-dom";
import "./index.css";
import React, { useEffect } from "react";

export const ErrorPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add("error");
		return () => document.body.classList.remove("error");
	}, []);

	return (
		<div className="text-center">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4 mr-auto mt-5 text-md-left text-center">
						<a href="index.html" className="ml-md-5">
							<img
								alt="image-404"
								src="/assets/img/logo.svg"
								className="dark-element theme-logo"
							/>
							<img
								alt="image-404"
								src="/assets/img/logo2.svg"
								className="light-element theme-logo"
							/>
						</a>
					</div>
				</div>
			</div>
			<div className="container-fluid error-content">
				<div className="">
					<h1 className="error-number">404</h1>
					<p className="mini-text">Ooops!</p>
					<p className="error-text mb-5 mt-1">
						The page you requested was not found!
					</p>
					<img
						src="/assets/img/error.svg"
						alt="cork-admin-404"
						className="error-img"
					/>
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (window.history.length > 1) window.history.back();
							else navigate("/", { replace: true });
						}}
						className="btn btn-dark mt-5">
						Go Back
					</a>
				</div>
			</div>
		</div>
	);
};
