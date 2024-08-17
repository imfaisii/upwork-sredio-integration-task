import GitHubIntegration from "../../models/githubintegration.model.js"

export default function mainService() {
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
        getAllIntegrations,
        deleteAllIntegrations
    }
}