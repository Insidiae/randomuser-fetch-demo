import React from "react";
import {
	Form,
	useFetcher,
	redirect,
	type ActionFunctionArgs,
} from "react-router-dom";

import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import Button from "../components/Button";
import { UserWithId } from "../utils/types";

async function action({ request }: ActionFunctionArgs) {
	const rawUsers = window.localStorage.getItem("savedUsers") ?? "[]";
	const existingUsers = JSON.parse(rawUsers);

	const formData = await request.formData();

	const id = formData.get("id");
	const first = formData.get("firstName");
	const last = formData.get("lastName");
	const email = formData.get("email");
	const imageUrl = formData.get("imageUrl");

	const newUser = { id, name: { first, last }, email, imageUrl };

	window.localStorage.setItem(
		"savedUsers",
		JSON.stringify([...existingUsers, newUser]),
	);

	return redirect(`/users/${id}`);
}

function UsersIndexRoute() {
	const fetcher = useFetcher<UserWithId>({ key: "get-user" });

	const isLoading = fetcher.state === "loading";

	React.useEffect(() => {
		if (fetcher.state === "idle" && !fetcher.data) {
			fetcher.load("/api/getUser");
		}
	}, [fetcher]);

	return (
		<div className="flex h-full flex-col gap-8 rounded-md bg-white p-8">
			<h2 className="text-3xl font-bold">New User</h2>

			{!isLoading && fetcher.data ? (
				<>
					<UserCard user={fetcher.data} />
					<Form id="new-user" method="POST" className="hidden">
						<input type="hidden" name="id" value={fetcher.data.id} />
						<input
							type="hidden"
							name="firstName"
							value={fetcher.data.name.first}
						/>
						<input
							type="hidden"
							name="lastName"
							value={fetcher.data.name.last}
						/>
						<input type="hidden" name="email" value={fetcher.data.email} />
						<input
							type="hidden"
							name="imageUrl"
							value={fetcher.data.imageUrl}
						/>
					</Form>
				</>
			) : (
				<UserCardSkeleton />
			)}

			<div className="flex justify-center gap-2">
				<Button
					type="button"
					onClick={() => fetcher.load("/api/getUser")}
					disabled={isLoading}
				>
					Refresh
				</Button>
				<Button
					variant="success"
					type="submit"
					form="new-user"
					disabled={isLoading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

UsersIndexRoute.action = action;

export default UsersIndexRoute;
