import { useLoaderData, json } from "react-router-dom";
import UserCard from "../components/UserCard";
import Button from "../components/Button";

async function loader() {
	const { name, email, picture, login } = fakeResult;

	return json({ id: login.uuid, name, email, picture });
}

function UsersIndexRoute() {
	const data = useLoaderData() as FakeUser;

	return (
		<div className="flex h-full flex-col gap-8 rounded-md bg-white p-8">
			<h2 className="text-3xl font-bold">New User</h2>

			<UserCard user={data} />

			<div className="flex justify-center gap-2">
				<Button>Refresh</Button>
				<Button>Save</Button>
			</div>
		</div>
	);
}

export default UsersIndexRoute;

UsersIndexRoute.loader = loader;

// TODO: Replace with actual RandomUser API data
const fakeResult = {
	gender: "female",
	name: { title: "Ms", first: "Lilli", last: "Stave" },
	location: {
		street: { number: 4595, name: "Disengrenda" },
		city: "Øksfjord",
		state: "Vestfold",
		country: "Norway",
		postcode: "6530",
		coordinates: { latitude: "45.9696", longitude: "62.2380" },
		timezone: { offset: "-9:00", description: "Alaska" },
	},
	email: "lilli.stave@example.com",
	login: {
		uuid: "8cc172ff-6ca9-4569-a05a-7aaa771fe15b",
		username: "purpleladybug690",
		password: "duncan",
		salt: "WMJvzLid",
		md5: "66c8d3a6b3b17bb94aecc763fb41ddfc",
		sha1: "1a6fe6b9b0edaa2de39b51c647b6f1c8a68d35ee",
		sha256: "a036963004158b5f7ceef60b69fa8728df2489996a5dcc8a8e221765ed9e82d5",
	},
	dob: { date: "1981-08-20T17:14:02.555Z", age: 42 },
	registered: { date: "2016-01-29T15:17:47.350Z", age: 8 },
	phone: "51990378",
	cell: "45951782",
	id: { name: "FN", value: "20088108648" },
	picture: {
		large: "https://randomuser.me/api/portraits/women/46.jpg",
		medium: "https://randomuser.me/api/portraits/med/women/46.jpg",
		thumbnail: "https://randomuser.me/api/portraits/thumb/women/46.jpg",
	},
	nat: "NO",
};

type FakeUser = { id: string } & Pick<
	typeof fakeResult,
	"name" | "email" | "picture"
>;