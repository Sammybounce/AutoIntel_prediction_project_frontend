import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadScript } from "../../assets/js/load-scripts";
import { useNotification } from "../../hooks/notification-hook";
import { Footer } from "./shared/footer";
import { baseUrl } from "../page";
import { useAuth } from "../../hooks/auth-hook";

export const CreatePredictionsPage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { notify } = useNotification();

	const [model, setModel] = useState("");
	const [startYear, setStartYear] = useState("2025");
	const [endYear, setEndYear] = useState("2035");
	const [file, setFile] = useState(null);

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const src = "/assets/plugins/src/vanillaSelectBox/vanillaSelectBox.js";
		loadScript(src, () => {
			new vanillaSelectBox("#selectProgrammingLanguage", {
				keepInlineStyles: true,
				maxHeight: 200,
				minWidth: 260,
				search: false,
				placeHolder: "Choose...",
			});
		});
	}, []);

	const submit = () => {
		let valid = true;

		const err = [];
		setErrors([]);

		if (model.replace(/\s/g, "") === "") {
			err.push({
				field: "model",
				message: "Model is required",
			});
			valid = false;
		}

		if (startYear.replace(/\s/g, "") === "") {
			err.push({
				field: "startYear",
				message: "Start year is required",
			});
			valid = false;
		}

		if (endYear.replace(/\s/g, "") === "") {
			err.push({
				field: "endYear",
				message: "End year is required",
			});
			valid = false;
		}

		const yearRegex = /^\d{4}$/;
		if (!yearRegex.test(startYear)) {
			err.push({
				field: "startYear",
				message: "Start year must be a 4 digit number",
			});
			valid = false;
		}

		if (!yearRegex.test(endYear)) {
			err.push({
				field: "endYear",
				message: "End year must be a 4 digit number",
			});
			valid = false;
		}

		if (file === null) {
			err.push({
				field: "file",
				message: "File is required",
			});
			valid = false;
		}

		if (!valid) {
			setErrors(err);
		} else {
			setLoading(true);

			const formData = new FormData();
			formData.append("model", model);
			formData.append("startYear", startYear);
			formData.append("endYear", endYear);
			formData.append("file", file);

			fetch(`${baseUrl}/predictions/create`, {
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
					"X-Auth-Token": user.token,
				},
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.type === "error") {
						notify("error", data.message);
						setLoading(false);
					} else {
						notify("success", data.message);

						navigate(`/predictions/${data.data}`);
					}
				})
				.catch((err) => {
					console.log(err);

					notify("error", err.message);
					setLoading(false);
				});
		}
	};

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
										Make Prediction
									</li>
								</ol>
							</nav>
						</div>
						{/* <!-- /BREADCRUMB --> */}

						<div className="row layout-top-spacing">
							<h1>Create Predictions Page</h1>

							<p>Fill the form below to create predictions</p>

							<div className="col-lg-12 layout-spacing">
								<div className="statbox widget box box-shadow">
									<>
										<div className="widget-header border-bottom-none">
											<div className="row">
												<div className="col-xl-12 col-md-12 col-sm-12 col-12">
													<h4>Select Model for prediction</h4>
												</div>
											</div>
										</div>
										<div className="widget-content widget-content-area border-bottom-none">
											<select
												id="selectProgrammingLanguage"
												onChange={(e) => setModel(e.target.value)}>
												<option
													value="decision-tree-model"
													defaultValue={model === "decision-tree-model"}>
													Decision Tree Model
												</option>
												<option
													value="random-forest-model"
													defaultValue={model === "random-forest-model"}>
													Random Forest Model
												</option>
												<option
													value="multilayer-perceptron-model"
													defaultValue={
														model === "multilayer-perceptron-model"
													}>
													Multilayer Perceptron Model
												</option>
												<option
													value="hybrid-model"
													defaultValue={model === "hybrid-model"}>
													{`(RFR &MLP) Hybrid Model`}
												</option>
											</select>

											{errors
												.filter((e) => e.field === "model")
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
									</>

									<>
										<div className="widget-header border-top-none">
											<div className="row">
												<div className="col-xl-12 col-md-12 col-sm-12 col-12">
													<h4>Start Year</h4>
												</div>
											</div>
										</div>
										<div className="widget-content widget-content-area border-top-none">
											<div className="row">
												<div className="col-md-6">
													<div className="mb-3">
														<input
															type="number"
															className="form-control"
															value={startYear}
															onChange={(e) => setStartYear(e.target.value)}
														/>
													</div>

													{errors
														.filter((e) => e.field === "startYear")
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
											</div>
										</div>
									</>

									<>
										<div className="widget-header border-top-none">
											<div className="row">
												<div className="col-xl-12 col-md-12 col-sm-12 col-12">
													<h4>End Year</h4>
												</div>
											</div>
										</div>
										<div className="widget-content widget-content-area border-top-none">
											<div className="row">
												<div className="col-md-6">
													<div className="mb-3">
														<input
															type="number"
															className="form-control"
															value={endYear}
															onChange={(e) => setEndYear(e.target.value)}
														/>
													</div>

													{errors
														.filter((e) => e.field === "endYear")
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
											</div>
										</div>
									</>

									<>
										<div className="widget-header border-top-none border-bottom-none">
											<div className="row">
												<div className="col-xl-12 col-md-12 col-sm-12 col-12">
													<h4>Dataset CSV Structure</h4>
												</div>
											</div>
										</div>
										<div className="widget-content widget-content-area border-top-none border-bottom-none">
											<div className="table-responsive">
												<table className="table">
													<thead>
														<tr>
															<th scope="col">brand</th>
															<th scope="col">model</th>
															<th scope="col">year</th>
															<th scope="col">price</th>
															<th scope="col">transmission</th>
															<th scope="col">mileage</th>
															<th scope="col">tax</th>
															<th scope="col">mpg</th>
															<th scope="col">fuelType</th>
															<th scope="col">engineSize</th>
														</tr>
														<tr
															aria-hidden="true"
															className="mt-3 d-block table-row-hidden"></tr>
													</thead>
													<tbody>
														<tr>
															<td>Mercedes-Benz</td>
															<td>C Class</td>
															<td>2020</td>
															<td>30495.0</td>
															<td>Automatic</td>
															<td>1200.0</td>
															<td>145.6</td>
															<td>63.757999999999896</td>
															<td>Diesel</td>
															<td>2.0</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</>

									<>
										<div className="widget-header border-top-none">
											<div className="row">
												<div className="col-xl-12 col-md-12 col-sm-12 col-12">
													<h4>Select DataSet CSV</h4>
												</div>
											</div>
										</div>
										<div className="widget-content widget-content-area border-top-none">
											<div className="row">
												<div className="col-md-6">
													{/* <div className="multiple-file-upload"> */}
													<input
														onChange={(e) =>
															e.target.files.length > 0
																? setFile(e.target.files[0])
																: null
														}
														type="file"
														accept=".csv"
														// className="filepond file-upload-multiple"
														className="form-control  form-control-file"
														name="filepond"
														data-allow-reorder="true"
														data-max-file-size="30MB"
														data-max-files="1"
													/>

													{errors
														.filter((e) => e.field === "file")
														.map((e) => (
															<div
																key={Math.floor(
																	1000000000 + Math.random() * 9000000000
																)}
																className="invalid-feedback d-block mb-2">
																{e.message}
															</div>
														))}
													{/* </div> */}
												</div>
											</div>
										</div>
									</>
								</div>

								<div className="col-12">
									<div className="mb-4 mt-4">
										<button className="btn btn-secondary" onClick={submit}>
											{loading ? (
												<div className="spinner-border text-white me-2 align-self-center loader-sm "></div>
											) : (
												"PROCEED"
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
			{/* <!--  END CONTENT AREA  --> */}
		</>
	);
};
