import env from "env-var";

const GITHUB_URL = "https://api.github.com";

const token = env.get("GITHUB_TOKEN");

export async function getGithubUser(username?: string) {
	const response = await fetch(`${GITHUB_URL}/users/${username}`, {
		method: "GET",
		headers: token
			? {
					Authorization: `token ${token.asString()}`,
				}
			: {},
	});
	if (response.ok) {
		return response.json();
	}

	throw new Error(response.statusText);
}
