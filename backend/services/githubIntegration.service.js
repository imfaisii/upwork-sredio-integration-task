import GitHubIntegration from "../models/githubintegration.model.js"
import GithubRepositoriesService from "./githubRepositories.service.js";

export default function () {
    const store = async (data, accessToken) => {
        try {
            const { id, username, displayName } = data;

            return await GitHubIntegration.findOneAndUpdate(
                { githubId: id },
                {
                    username,
                    accessToken,
                    displayName,
                    profileUrl: data.profileUrl,
                },
                { new: true, upsert: true }
            );
        } catch (e) { throw e }
    }

    const index = async () => {
        try {
            return await GitHubIntegration.find({})
        } catch (e) { throw e }
    }

    const destroy = async (_id = null) => {
        try {
            const { destroy } = GithubRepositoriesService();

            return Promise.all([GitHubIntegration.deleteMany({}), destroy()]);
        } catch (e) { throw e }
    }

    return {
        index,
        store,
        destroy
    }
}