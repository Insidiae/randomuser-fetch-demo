import { useLoaderData, json, Outlet, Link } from "react-router-dom";

import UserCard from "../components/UserCard";
import type { UserWithId } from "../utils/types";

async function loader() {
	const rawUsers = window.localStorage.getItem("savedUsers") ?? "[]";
	const users = JSON.parse(rawUsers);

	return json(users);
}

function UsersRoute() {
	const data = useLoaderData() as UserWithId[];

	const hasSavedUsers = data && data.length > 0;

	return (
		<main className="flex min-h-screen w-screen flex-col-reverse gap-8 lg:flex-row">
			<section className="flex flex-[1] flex-col gap-8 overflow-y-auto p-8 lg:max-h-screen lg:basis-[200px]">
				<h1 className="text-3xl font-bold">Random Users</h1>

				{hasSavedUsers ? (
					data.map((user) => (
						<Link to={`/users/${user.id}`}>
							<UserCard user={user} />
						</Link>
					))
				) : (
					<p className="text-lg italic text-slate-600">
						Saved users will appear here!
					</p>
				)}
			</section>
			<section className="flex-[3] bg-slate-300 p-8">
				<Outlet />
			</section>
		</main>
	);
}

UsersRoute.loader = loader;

export default UsersRoute;
