import mongoose from 'mongoose';

const githubRepositoriesSchema = new mongoose.Schema({
    githubId: { type: String, required: true },
    repositoryId: { type: String, required: true, unique: true },
    htmlUrl: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    organization: Object,
    included: Boolean
}, { timestamps: true });

const GithubRepositories = mongoose.model('GithubRepostories', githubRepositoriesSchema);

export default GithubRepositories;