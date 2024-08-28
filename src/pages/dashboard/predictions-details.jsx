import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNotification } from "../../hooks/notification-hook";
import { Footer } from "./shared/footer";
import { LoadingSpinner } from "./shared/loading-spinner";
import { baseUrl, convertStringToCurrencyString, convertDate } from "../page";
import { useAuth } from "../../hooks/auth-hook";

export const PredictionsDetailsPage = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const { notify } = useNotification();

	const [predictions, setPredictions] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${baseUrl}/predictions/details/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-Auth-Token": user.token,
			},
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
	}, []);

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
										Prediction Details
									</li>
								</ol>
							</nav>
						</div>
						{/* <!-- /BREADCRUMB --> */}

						{loading ? (
							<LoadingSpinner />
						) : (
							<div className="row layout-top-spacing">
								<p>
									Model:{" "}
									<span className={`badge badge-light-primary`}>
										{predictions && predictions.length > 0
											? predictions[0].predictionModel
											: "N/A"}
									</span>
								</p>

								<div className="col-lg-12 layout-spacing">
									<div className="col-12">
										<div className="mb-4 mt-4">
											<a
												href={`${baseUrl}/predictions/file/download/${id}`}
												download={`prediction-${id}.csv`}
												className="btn btn-secondary">
												{/* <div className="spinner-border text-white me-2 align-self-center loader-sm "></div> */}
												Download CSV
											</a>
										</div>
									</div>

									<div className="statbox widget box box-shadow">
										<>
											<div className="widget-content widget-content-area border-top-none border-bottom-none">
												<div className="table-responsive">
													<table className="table">
														<thead>
															<tr>
																<th scope="col">Brand</th>
																<th scope="col">Model</th>
																<th scope="col">Year</th>
																<th scope="col">Future Year</th>
																<th scope="col">Predicted Price</th>
																<th scope="col">Date</th>
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
																		<td>{prediction.brand}</td>
																		<td>{prediction.model}</td>
																		<td>{prediction.year}</td>
																		<td>{prediction.futureYear}</td>
																		<td>
																			{convertStringToCurrencyString(
																				prediction.predictedPrice
																			)}
																		</td>
																		<td>{convertDate(prediction.createdAt)}</td>
																	</tr>
																))
															) : (
																<tr>
																	<td colSpan="6" className="text-center">
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

				<Footer />
			</div>
			{/* <!--  END CONTENT AREA  --> */}
		</>
	);
};
