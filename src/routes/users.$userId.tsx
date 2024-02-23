import {
	json,
	redirect,
	Link,
	useLoaderData,
	useParams,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	Form,
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

	if (!user) {
		throw new Response("User not found", { status: 404 });
	}

	return json(user);
}

async function action({ params }: ActionFunctionArgs) {
	const userId = params.userId;

	const rawUsers = window.localStorage.getItem("savedUsers") ?? "[]";
	const users = JSON.parse(rawUsers) as UserWithId[];

	window.localStorage.setItem(
		"savedUsers",
		JSON.stringify(users.filter((u) => u.id !== userId)),
	);

	return redirect("/users");
}

function UserInfoRoute() {
	const data = useLoaderData() as UserWithId;
	const params = useParams();

	return (
		<div className="flex h-full flex-col gap-8 rounded-md bg-white p-8">
			<h2 className="text-3xl font-bold">
				<Link to="/users">&larr; Viewing User Info</Link>
			</h2>

			{data ? <UserCard user={data} /> : <UserCardSkeleton />}

			<div className="flex justify-center gap-2">
				<Link
					to={`/users/${params.userId}/edit`}
					className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-center text-white disabled:bg-blue-400"
				>
					Edit
				</Link>
				<Form method="POST">
					<Button variant="danger" type="submit">
						Delete
					</Button>
				</Form>
			</div>
		</div>
	);
}

UserInfoRoute.loader = loader;
UserInfoRoute.action = action;

export default UserInfoRoute;
