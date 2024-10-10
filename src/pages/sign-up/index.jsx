import "../../assets/css/auth.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/notification-hook";

export const SignUpPage = () => {
	const navigate = useNavigate();
	const { notify } = useNotification();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	const submit = () => {
		let valid = true;

		const err = [];
		setErrors([]);

		if (firstName === "") {
			err.push({
				field: "firstName",
				message: "First name is required",
			});
			valid = false;
		}

		if (lastName === "") {
			err.push({
				field: "lastName",
				message: "Last name is required",
			});
			valid = false;
		}

		if (email === "") {
			const re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			err.push(
				{
					field: "email",
					message: "Email is required",
				},
				!re.test(String(email).toLowerCase()) && {
					field: "email",
					message: "Email is not valid",
				}
			);
			valid = false;
		}

		if (password === "") {
			err.push({
				field: "password",
				message: "Password is required",
			});
			valid = false;
		}

		if (valid) {
			setLoading(true);

			fetch("http://localhost:1000/auth/sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
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

						navigate("/sign-in", { replace: true });
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
								Comprehensive Analytics into Predicting Car Prices and 
								Future Trends in the Automotive Industry using Machine Learning, 
								Deep Learning and Hybrid Models.
								</h2>
								{/* <p className="text-white px-2">
									It is easy to setup with great customer experience. Start your
									7-day free trial
								</p> */}
							</div>
						</div>
					</div>

					<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center ms-lg-auto me-lg-0 mx-auto">
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col-md-12 mb-3">
										<h2>Sign Up</h2>
										<p>Enter your email and password to register</p>
									</div>
									<div className="col-md-12">
										<div className="mb-3">
											<label className="form-label">First Name</label>
											<input
												type="text"
												className="form-control add-billing-address-input"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
											/>
										</div>

										{errors
											.filter((e) => e.field === "firstName")
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
									<div className="col-md-12">
										<div className="mb-3">
											<label className="form-label">Last Name</label>
											<input
												type="text"
												className="form-control add-billing-address-input"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</div>

										{errors
											.filter((e) => e.field === "lastName")
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
													"SIGN UP"
												)}
											</button>
										</div>
									</div>

									<div className="col-12">
										<div className="text-center">
											<p className="mb-0">
												Already have an account ?
												<Link to="/sign-in" className="text-warning">
													Sign in
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
