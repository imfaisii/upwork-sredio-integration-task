import GitHubIntegration from "../models/githubintegration.model.js"

export default function githubIntegration() {
    const storeIntegration = async (data) => {
        try {
            const { id, username, displayName } = data;

            return await GitHubIntegration.findOneAndUpdate(
                { githubId: id },
                {
                    username,
                    accessToken,
                    displayName,
                    profileUrl: profile.profileUrl,
                },
                { new: true, upsert: true }
            );
        } catch (e) { throw e }
    }

    const getAllIntegrations = async () => {
        try {
            return await GitHubIntegration.find({})
        } catch (e) { throw e }
    }

    const deleteAllIntegrations = async () => {
        try {
            return await GitHubIntegration.deleteMany({})
        } catch (e) { throw e }
    }

    return {
        storeIntegration,
        getAllIntegrations,
        deleteAllIntegrations
    }
}