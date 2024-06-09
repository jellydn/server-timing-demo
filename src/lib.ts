import env from "env-var";

const GITHUB_URL = "https://api.github.com";

export async function getGithubUser(username?: string) {
	const response = await fetch(`${GITHUB_URL}/users/${username}`, {
		method: "GET",
		headers: env.get("GITHUB_TOKEN")
			? {
					Authorization: `token ${env.get("GITHUB_TOKEN").asString()}`,
				}
			: {},
	});
	if (response.ok) {
		return response.json();
	}

	throw new Error(response.statusText);
}
