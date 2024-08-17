import useOctoKit from '../composables/useOctoKit.js';
import GitHubIntegration from "../models/githubintegration.model.js"

export default function () {
    const headers = {
        'X-GitHub-Api-Version': '2022-11-28'
    }

    const fetchAuthenticatedUserRepos = async () => {
        try {
            const { githubId } = await GitHubIntegration.findOne({});
            const { data: organizations } = await fetchOrganizations();

            console.log({ organizations, githubId });
        } catch (e) { throw e }
    }

    const fetchOrganizations = async () => {
        try {
            const octokit = await useOctoKit();

            return await octokit.request('GET /user/orgs', { headers })
        } catch (error) {
            throw error
        }
    }

    return {
        fetchAuthenticatedUserRepos,
        fetchOrganizations
    }
}