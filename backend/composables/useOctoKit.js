import { Octokit } from "octokit";
import GitHubIntegration from "../models/githubintegration.model.js";

export default async function () {
    const { accessToken } = await GitHubIntegration.findOne({});

    return new Octokit({
        auth: accessToken
    });
}