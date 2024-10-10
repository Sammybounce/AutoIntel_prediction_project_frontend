import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./shared/footer";
import { LoadingSpinner } from "./shared/loading-spinner";
import { baseUrl, convertStringToCurrencyString, convertDate } from "../page";
import { useAuth } from "../../hooks/auth-hook";

export const PredictionsPage = () => {
	const { user } = useAuth();
	const [model, setModel] = React.useState("decision tree");
	const [loading, setLoading] = useState(true);

	const [predictions, setPredictions] = useState([]);

	useEffect(() => {
		setLoading(true);

		fetch(`${baseUrl}/predictions/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Auth-Token": user.token,
			},
			body: JSON.stringify({
				more: true,
				filter: true,
				pageNumber: 1,
				batchNumber: 20,
				sort: "DESC",
				orderBy: "prediction.createdAt",
				groups: [
					{
						filterGroupCondition: "AND",
						filterSearchCondition: "AND",
						filters: [
							{
								filterOption: "cn",
								field: "prediction.predictionModel",
								value: model,
								dataType: "string",
							},
							{
								filterOption: "eq",
								field: "prediction.deleted",
								value: "false",
								dataType: "bool",
							},
						],
					},
				],
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.type === "error") {
					notify("error", data.message);
				} else {
					setPredictions(data.data);
				}
				setLoading(false);
				document
					.querySelector(".navbar-logo")
					.setAttribute("src", "/assets/img/logo.svg");
			})
			.catch((err) => {
				console.log(err);

				notify("error", err.message);
				setLoading(false);
			});
	}, [model]);

	return (
		<>
			{/* <!--  BEGIN CONTENT AREA  --> */}
			<div id="content" className="main-content">
				<div className="container">
					<div className="container">
						{/* <!-- BREADCRUMB --> */}
						<div className="page-meta">
							<nav className="breadcrumb-style-one" aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item">
										<Link to="/">Dashboard</Link>
									</li>
									<li className="breadcrumb-item active" aria-current="page">
										{model == "decision tree"
											? "Decision Tree Model"
											: model == "random forest"
											? "Random Forest Model"
											: model == "multilayer perceptron"
											? "Multilayer Perceptron Model"
											: `(RFR &MLP) Hybrid Model`}
									</li>
								</ol>
							</nav>
						</div>
						{/* <!-- /BREADCRUMB --> */}

						<div id="navSection" data-bs-spy="affix" className="nav sidenav">
							<div className="sidenav-content">
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setModel("decision tree");
									}}
									className={`${
										model === "decision tree" ? "active" : ""
									} nav-link`}>
									Decision Tree Model
								</a>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setModel("random forest");
									}}
									className={`${
										model === "random forest" ? "active" : ""
									} nav-link`}>
									Random Forest Model
								</a>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setModel("multilayer");
									}}
									className={`${
										model === "multilayer-perceptron" ? "active" : ""
									} nav-link`}>
									Multilayer Perceptron Model
								</a>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setModel("hybrid");
									}}
									className={`${model.includes("hybrid") ? "active" : ""} nav-link`}>
									{`(RFR &MLP) Hybrid Model`}
								</a>
							</div>
						</div>

						<div className="row layout-top-spacing">
							<div className="d-flex d-xl-none flex-row">
								<span
									className={`badge badge-light-${
										model === "decision tree" ? "primary" : "dark"
									} mb-2 me-4`}
									onClick={(e) => {
										e.preventDefault();
										setModel("decision tree");
									}}>
									Decision Tree Model
								</span>
								<span
									className={`badge badge-light-${
										model === "random forest" ? "primary" : "dark"
									} mb-2 me-4`}
									onClick={(e) => {
										e.preventDefault();
										setModel("random forest");
									}}>
									Random Forest Model
								</span>
								<span
									className={`badge badge-light-${
										model.includes("multilayer") ? "primary" : "dark"
									} mb-2 me-4`}
									onClick={(e) => {
										e.preventDefault();
										setModel("multilayer perceptron");
									}}>
									Multilayer Perceptron Model
								</span>
								<span
									className={`mb-5 badge badge-light-${
										model.includes("hybrid") ? "primary" : "dark"
									} mb-2 me-4`}
									onClick={(e) => {
										e.preventDefault();
										setModel("hybrid");
									}}>
									{`(RFR &MLP) Hybrid Model`}
								</span>
							</div>

							<h1>Power Bi</h1>

							<iframe
								title="Personal Project - Car Analysis"
								width="100%"
								height="541.25"
								src="https://app.powerbi.com/reportEmbed?reportId=7addda74-70b1-4681-a09b-ad131454e14f&autoAuth=true&ctid=f5cdacf6-5828-4e11-be56-614b4fdab989"
								frameBorder="0"
								allowFullScreen={true}></iframe>

							<hr />

							<h1>Recent Predictions</h1>

							{loading ? (
								<LoadingSpinner />
							) : (
								<div className="row layout-top-spacing">
									<div className="col-lg-12 layout-spacing">
										<div className="statbox widget box box-shadow">
											<>
												<div className="widget-content widget-content-area border-top-none border-bottom-none">
													<div className="table-responsive">
														<table className="table">
															<thead>
																<tr>
																	<th scope="col">Prediction Model</th>
																	<th scope="col">Brand</th>
																	<th scope="col">Model</th>
																	<th scope="col">Year</th>
																	<th scope="col">Future Year</th>
																	<th scope="col">Predicted Price</th>
																	<th scope="col">Date</th>
																	<th scope="col"></th>
																</tr>
																<tr
																	aria-hidden="true"
																	className="mt-3 d-block table-row-hidden"></tr>
															</thead>
															<tbody>
																{predictions && predictions.length > 0 ? (
																	predictions.map((prediction) => (
																		<tr
																			key={Math.floor(
																				1000000000 + Math.random() * 9000000000
																			)}>
																			<td className="text-capitalize">
																				{prediction.predictionModel} model
																			</td>
																			<td>{prediction.brand}</td>
																			<td>{prediction.model}</td>
																			<td>{prediction.year}</td>
																			<td>{prediction.futureYear}</td>
																			<td>
																				{convertStringToCurrencyString(
																					prediction.predictedPrice
																				)}
																			</td>
																			<td>
																				{convertDate(prediction.createdAt)}
																			</td>
																			<td>
																				<Link
																					to={`/predictions/${prediction.id}`}
																					className="btn btn-primary">
																					Details
																				</Link>
																			</td>
																		</tr>
																	))
																) : (
																	<tr>
																		<td colSpan="7" className="text-center">
																			No data found
																		</td>
																	</tr>
																)}
															</tbody>
														</table>
													</div>
												</div>
											</>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<Footer />
			</div>
			{/* <!--  END CONTENT AREA  --> */}
		</>
	);
};
