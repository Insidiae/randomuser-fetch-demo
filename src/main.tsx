import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";

import UsersRoute from "./routes/users";
import UsersIndexRoute from "./routes/users._index";

import "./index.css";
import UserInfoRoute from "./routes/users.$userId";

const router = createBrowserRouter([
	{
		path: "/",
		loader: () => redirect("/users"),
	},
	{
		path: "/users",
		element: <UsersRoute />,
		loader: UsersRoute.loader,
		children: [
			{
				index: true,
				element: <UsersIndexRoute />,
				loader: UsersIndexRoute.loader,
			},
			{
				path: ":userId",
				element: <UserInfoRoute />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
