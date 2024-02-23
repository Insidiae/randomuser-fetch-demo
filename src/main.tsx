import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";

import UsersRoute from "./routes/users";
import UsersIndexRoute from "./routes/users._index";
import UserInfoRoute from "./routes/users.$userId";
import UserInfoEditRoute from "./routes/users.$userId.edit";
import { loader as getUserLoader } from "./routes/api/getUser";
import { GeneralErrorBoundary } from "./components/ErrorBoundary";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		loader: () => redirect("/users"),
	},
	{
		path: "/users",
		element: <UsersRoute />,
		loader: UsersRoute.loader,
		errorElement: (
			<div className="h-screen w-screen">
				<GeneralErrorBoundary />
			</div>
		),
		children: [
			{
				index: true,
				element: <UsersIndexRoute />,
				action: UsersIndexRoute.action,
				errorElement: <GeneralErrorBoundary />,
			},
			{
				path: ":userId",
				element: <UserInfoRoute />,
				loader: UserInfoRoute.loader,
				action: UserInfoRoute.action,
				errorElement: (
					<GeneralErrorBoundary
						statusHandlers={{
							404: ({ params }) => (
								<p>No user with the id "{params.userId}" exists</p>
							),
						}}
					/>
				),
			},
			{
				path: ":userId/edit",
				element: <UserInfoEditRoute />,
				loader: UserInfoEditRoute.loader,
				action: UserInfoEditRoute.action,
				errorElement: (
					<GeneralErrorBoundary
						statusHandlers={{
							404: ({ params }) => (
								<p>No user with the id "{params.userId}" exists</p>
							),
						}}
					/>
				),
			},
		],
	},
	{
		path: "/api/getUser",
		loader: getUserLoader,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
