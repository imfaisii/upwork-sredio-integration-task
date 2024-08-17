import { Octokit } from "octokit";

export default async function useOctoKit() {
    const { accessToken } = await GitHubIntegration.findOne({});

    return new Octokit({
        auth: accessToken
    });
}