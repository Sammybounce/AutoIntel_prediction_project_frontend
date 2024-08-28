import { createBrowserRouter, Outlet } from "react-router-dom";
import { ErrorPage } from "../pages/error-page";
import { SignInPage } from "../pages/sign-in";
import { SignUpPage } from "../pages/sign-up";
import { DashboardPage } from "../pages/dashboard";
import { PredictionsPage } from "../pages/dashboard/predictions";
import { CreatePredictionsPage } from "../pages/dashboard/create-predictions";
import { PredictionsDetailsPage } from "../pages/dashboard/predictions-details";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardPage />,
		children: [
			{
				path: "/",
				element: <PredictionsPage />,
			},
			{
				path: "/predictions/:id",
				element: <PredictionsDetailsPage />,
			},
			{
				path: "/make-prediction",
				element: <CreatePredictionsPage />,
			},
		],
	},
	{
		path: "/sign-in",
		element: <SignInPage />,
	},
	{
		path: "/sign-up",
		element: <SignUpPage />,
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);
