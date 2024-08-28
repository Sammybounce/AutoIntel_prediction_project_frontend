import "./css/index.css";
import "../../assets/css/auth.css";
import React, { useEffect, StrictMode } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { loadScript } from "../../assets/js/load-scripts.js";

export const DashboardPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		loadScript("/assets/js/scrollspyNav.js");
		loadScript("/assets/js/app.js");
		loadScript("/assets/js/dashboard/dash_1.js");

		window.scrollTo(0, 0);

		const nav = document.querySelector(".sidenav");

		if (location.pathname === "/" && nav) nav.style.display = "block";
	}, [location]);

	return (
		<div className="main-container" id="container">
			<div className="overlay"></div>
			<div className="search-overlay"></div>

			{/* <!--  BEGIN SIDEBAR  --> */}
			<div className="sidebar-wrapper sidebar-theme">
				<nav id="sidebar">
					<div className="navbar-nav theme-brand flex-row text-center">
						<div className="nav-logo">
							<div className="nav-item theme-logo">
								<Link to="/">
									<img
										src="/assets/img/logo.svg"
										className="navbar-logo"
										alt="logo"
									/>
								</Link>
							</div>
							<div className="nav-item theme-text">
								<Link to="/" className="nav-link">
									CAR
								</Link>
							</div>
						</div>
						<div className="nav-item sidebar-toggle">
							<div className="btn-toggle sidebarCollapse">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-chevrons-left">
									<polyline points="11 17 6 12 11 7"></polyline>
									<polyline points="18 17 13 12 18 7"></polyline>
								</svg>
							</div>
						</div>
					</div>
					<div className="shadow-bottom"></div>
					<ul className="list-unstyled menu-categories" id="accordionExample">
						<li className="menu menu-heading">
							<div className="heading">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-minus">
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
								<span>MENU</span>
							</div>
						</li>

						<li className="menu">
							<Link to="/" aria-expanded="false" className="dropdown-toggle">
								<div className="">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="feather feather-home">
										<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
										<polyline points="9 22 9 12 15 12 15 22"></polyline>
									</svg>
									<span>Predictions</span>
								</div>
							</Link>
						</li>

						<li className="menu">
							<Link
								to="/make-prediction"
								aria-expanded="false"
								className="dropdown-toggle">
								<div className="">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="feather feather-edit">
										<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
										<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
									</svg>
									<span>Make Prediction</span>
								</div>
							</Link>
						</li>

						<li className="menu menu-heading">
							<div className="heading">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-minus">
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
								<span>ACCOUNT</span>
							</div>
						</li>

						<li className="menu">
							<a
								href="#"
								onClick={(e) => {
									e.preventDefault();
									localStorage.removeItem("user");

									navigate("/sign-in");
								}}
								aria-expanded="false"
								className="dropdown-toggle">
								<div className="">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="feather feather-log-out">
										<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
										<polyline points="16 17 21 12 16 7"></polyline>
										<line x1="21" y1="12" x2="9" y2="12"></line>
									</svg>
									<span>Log Out</span>
								</div>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			{/* <!--  END SIDEBAR  --> */}

			<StrictMode>
				<Outlet />
			</StrictMode>
		</div>
	);
};
