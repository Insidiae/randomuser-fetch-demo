import { Link } from "react-router-dom";
import Button from "../components/Button";
import UserCard from "../components/UserCard";

function UserInfoRoute() {
	return (
		<div className="flex h-full flex-col gap-8 rounded-md bg-white p-8">
			<h2 className="text-3xl font-bold">
				<Link to="/users">&larr; Viewing User Info</Link>
			</h2>

			<UserCard
				user={{
					name: {
						title: "",
						first: "User",
						last: "Info",
					},
					email: "testuser@example.com",
					picture: {
						large: "https://randomuser.me/api/portraits/women/46.jpg",
						medium: "https://randomuser.me/api/portraits/med/women/46.jpg",
						thumbnail: "https://randomuser.me/api/portraits/thumb/women/46.jpg",
					},
				}}
			/>

			<div className="flex justify-center gap-2">
				<Button>Edit</Button>
				<Button>Delete</Button>
			</div>
		</div>
	);
}

export default UserInfoRoute;
