import {
	json,
	redirect,
	Link,
	useLoaderData,
	useActionData,
	useParams,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	Form,
} from "react-router-dom";

import Button from "../components/Button";
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

function validate(value: FormDataEntryValue | null): value is string {
	return typeof value === "string" && value !== "";
}

type FormErrors = {
	firstName?: string;
	lastName?: string;
	email?: string;
};

async function action({ request, params }: ActionFunctionArgs) {
	const userId = params.userId;

	const formData = await request.formData();

	const first = formData.get("firstName");
	const last = formData.get("lastName");
	const email = formData.get("email");

	const errors: FormErrors = {};

	//? In the future, consider runtime validation libraries such as Zod
	if (!validate(first)) {
		errors.firstName = "First Name is required";
	}
	if (!validate(last)) {
		errors.lastName = "Last Name is required";
	}
	if (!validate(email)) {
		errors.email = "Invalid Email";
	}

	const hasErrors = Object.values(errors).some(Boolean);
	if (hasErrors) {
		return json(errors);
	}

	const rawUsers = window.localStorage.getItem("savedUsers") ?? "[]";
	const users = JSON.parse(rawUsers) as UserWithId[];

	window.localStorage.setItem(
		"savedUsers",
		JSON.stringify(
			users.map((user) => {
				if (user.id !== userId) {
					return user;
				}

				//? overwrite data for the user we need to edit
				return {
					...user,
					name: {
						...user.name,
						first,
						last,
					},
					email,
				};
			}),
		),
	);

	return redirect("/users");
}

function UserInfoEditRoute() {
	const data = useLoaderData() as UserWithId;
	const errors = useActionData() as FormErrors | undefined;
	const params = useParams();

	return (
		<div className="flex h-full flex-col gap-8 rounded-md bg-white p-8">
			<h2 className="text-3xl font-bold">
				<Link to={`/users/${params.userId}`}>&larr; Edit User Info</Link>
			</h2>

			{data ? (
				<Form
					id="edit-user"
					method="POST"
					className="flex flex-wrap items-center gap-4 rounded-md border border-black p-4"
				>
					<img className="h-16 w-16 rounded-full" src={data.imageUrl} />
					<div className="flex min-w-[200px] flex-col gap-2">
						<div className="flex flex-wrap gap-4">
							<label className="flex grow flex-col gap-1 text-xs">
								First Name
								<input
									type="text"
									name="firstName"
									className="border border-black px-2 py-1 text-base"
									defaultValue={data.name.first}
									placeholder="First Name"
								/>
								{errors?.firstName ? (
									<span className="text-xs text-red-600">
										{errors.firstName}
									</span>
								) : null}
							</label>
							<label className="flex grow flex-col gap-1 text-xs">
								Last Name
								<input
									type="text"
									name="lastName"
									className="border border-black px-2 py-1 text-base"
									defaultValue={data.name.last}
									placeholder="Last Name"
								/>
								{errors?.lastName ? (
									<span className="text-xs text-red-600">
										{errors.lastName}
									</span>
								) : null}
							</label>
						</div>
						<label className="flex flex-col gap-1 text-xs">
							Email Address
							<input
								type="email"
								name="email"
								className="border border-black px-2 py-1 text-base"
								defaultValue={data.email}
								placeholder="Email Address"
							/>
							{errors?.email ? (
								<span className="text-xs text-red-600">{errors.email}</span>
							) : null}
						</label>
					</div>
				</Form>
			) : (
				<UserCardSkeleton />
			)}

			<div className="flex justify-center gap-2">
				<Button type="submit" form="edit-user">
					Submit
				</Button>
				<Link
					to={`/users/${params.userId}`}
					className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-center text-white disabled:bg-blue-400"
				>
					Cancel
				</Link>
			</div>
		</div>
	);
}

UserInfoEditRoute.loader = loader;
UserInfoEditRoute.action = action;

export default UserInfoEditRoute;
