import "../../assets/css/auth.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../hooks/notification-hook";

export const SignInPage = () => {
	const [searchParams] = useSearchParams();
	const [returnUrl, setReturnUrl] = useState("");

	const { notify } = useNotification();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		setReturnUrl(searchParams.get("returnUrl") || "/");
	}, [searchParams]);

	const submit = () => {
		let valid = true;

		const err = [];
		setErrors([]);

		if (password === "") {
			err.push({
				field: "password",
				message: "Password is required",
			});
			valid = false;
		}

		if (valid) {
			setLoading(true);

			fetch("http://localhost:1000/auth/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.type === "error") {
						notify("error", data.message);
						setLoading(false);
					} else {
						notify("success", data.message);

						localStorage.setItem("user", JSON.stringify(data.data));
						navigate(returnUrl, { replace: true });
					}
				})
				.catch((err) => {
					console.log(err);

					notify("error", err.message);
					setLoading(false);
				});
		} else {
			setErrors(err);
		}
	};

	return (
		<div className="auth-container d-flex">
			<div className="container mx-auto align-self-center">
				<div className="row">
					<div className="col-6 d-lg-flex d-none h-100 my-auto top-0 start-0 text-center justify-content-center flex-column">
						<div className="auth-cover-bg-image"></div>
						<div className="auth-overlay"></div>

						<div className="auth-cover">
							<div className="position-relative">
								<img src="/assets/img/auth-cover.svg" alt="auth-img" />

								<h2 className="mt-5 text-white font-weight-bolder px-2">
									Predictive Analysis on Future Trends and Car Prices in the UK
									Automotive Industry using Machine Learning, Deep Learning and
									Hybrid Models
								</h2>
								{/* <p className="text-white px-2">
								
								</p> */}
							</div>
						</div>
					</div>

					<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center ms-lg-auto me-lg-0 mx-auto">
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col-md-12 mb-3">
										<h2>Sign In</h2>
										<p>Enter your email and password to register</p>
									</div>
									<div className="col-md-12">
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input
												type="email"
												className="form-control"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>

										{errors
											.filter((e) => e.field === "email")
											.map((e) => (
												<div
													key={Math.floor(
														1000000000 + Math.random() * 9000000000
													)}
													className="invalid-feedback d-block mb-2">
													{e.message}
												</div>
											))}
									</div>
									<div className="col-12">
										<div className="mb-3">
											<label className="form-label">Password</label>
											<input
												type="password"
												className="form-control"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>

										{errors
											.filter((e) => e.field === "password")
											.map((e) => (
												<div
													key={Math.floor(
														1000000000 + Math.random() * 9000000000
													)}
													className="invalid-feedback d-block mb-2">
													{e.message}
												</div>
											))}
									</div>

									<div className="col-12">
										<div className="mb-4">
											<button
												className="btn btn-secondary w-100"
												onClick={submit}>
												{loading ? (
													<div className="spinner-border text-white me-2 align-self-center loader-sm "></div>
												) : (
													"SIGN IN"
												)}
											</button>
										</div>
									</div>

									<div className="col-12">
										<div className="text-center">
											<p className="mb-0">
												Don't have an account ?
												<Link to="/sign-up" className="text-warning">
													Sign up
												</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
