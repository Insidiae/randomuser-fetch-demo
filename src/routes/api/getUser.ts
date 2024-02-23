import { json } from "react-router-dom";
import { RandomUserResponse } from "../..//utils/types";

export async function loader() {
	//? Uncomment this to simulate an API error
	// throw new Error("API Error");
	const res = await fetch("https://randomuser.me/api");
	const data = (await res.json()) as RandomUserResponse;

	const { login, name, email, picture } = data.results[0];

	return json({ id: login.uuid, name, email, imageUrl: picture.medium });
}
