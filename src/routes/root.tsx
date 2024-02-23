import { useLoaderData, json } from "react-router-dom";

async function loader() {
	const { name, email, picture, login } = fakeResult;

	return json({ id: login.uuid, name, email, picture });
}

function RootRoute() {
	const data = useLoaderData() as FakeUser;

	const fullName = `${data.name.first} ${data.name.last}`;

	return (
		<main className="mx-auto flex max-w-lg flex-col gap-8 p-8">
			<h1 className="text-3xl font-bold">Random Users</h1>

			<article className="flex items-center gap-4 rounded-md border border-black p-4">
				<img
					className="h-16 w-16 rounded-full"
					src={data.picture.medium}
					alt={`Profile photo of ${fullName}`}
				/>
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-bold">{fullName}</h2>
					<p>{data.email}</p>
				</div>
			</article>
		</main>
	);
}

RootRoute.loader = loader;

export default RootRoute;

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
