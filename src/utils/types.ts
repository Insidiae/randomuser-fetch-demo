export type RandomUserResponse = {
	results: [
		{
			name: {
				first: string;
				last: string;
			};
			email: string;
			picture: {
				medium: string;
			};
			login: {
				uuid: string;
			};
		},
	];
};

export type UserInfo = Omit<
	RandomUserResponse["results"][number],
	"login" | "picture"
> & {
	imageUrl: string;
};

export type UserWithId = UserInfo & { id: string };
