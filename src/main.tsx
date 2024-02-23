import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootRoute from "./routes/root";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootRoute />,
		loader: RootRoute.loader,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
