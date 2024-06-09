const GITHUB_URL = "https://api.github.com";

export async function getGithubUser(username?: string) {
  const response = await fetch(`${GITHUB_URL}/users/${username}`, {
    method: "GET",
    headers: process.env.GITHUB_TOKEN
      ? {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }
      : {},
  });
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
}
