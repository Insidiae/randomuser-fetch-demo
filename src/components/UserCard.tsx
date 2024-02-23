export type UserInfo = {
	name: {
		title: string;
		first: string;
		last: string;
	};
	email: string;
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
};

function UserCard({ user }: { user: UserInfo }) {
	const fullName = `${user.name.first} ${user.name.last}`;
	return (
		<article className="flex items-center gap-4 rounded-md border border-black p-4">
			<img
				className="h-16 w-16 rounded-full"
				src={user.picture.medium}
				alt={`Profile photo of ${fullName}`}
			/>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-bold">{fullName}</h2>
				<p>{user.email}</p>
			</div>
		</article>
	);
}

export default UserCard;
