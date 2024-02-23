import {
	json,
	Link,
	useLoaderData,
	type LoaderFunctionArgs,
} from "react-router-dom";

import Button from "../components/Button";
import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import { UserWithId } from "../utils/types";

async function loader({ params }: LoaderFunctionArgs) {
	const userId = params.userId;

	const rawUsers = window.localStorage.getItem("savedUsers") ?? "[]";
	const users = JSON.parse(rawUsers) as UserWithId[];
	const user = users.find((u) => u.id === userId);

	return json(user);
}

function UserInfoRoute() {
	const data = useLoaderData() as UserWithId;

	return (
		<div className="flex h-full flex-col gap-8 rounded-md bg-white p-8">
			<h2 className="text-3xl font-bold">
				<Link to="/users">&larr; Viewing User Info</Link>
			</h2>

			{data ? <UserCard user={data} /> : <UserCardSkeleton />}

			<div className="flex justify-center gap-2">
				<Button>Edit</Button>
				<Button>Delete</Button>
			</div>
		</div>
	);
}

UserInfoRoute.loader = loader;

export default UserInfoRoute;
