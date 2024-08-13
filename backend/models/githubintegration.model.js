import mongoose from 'mongoose';

const githubIntegrationSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: String,
    accessToken: String,
    displayName: String,
    profileUrl: String,
}, { timestamps: true });

const GitHubIntegration = mongoose.model('GitHubIntegration', githubIntegrationSchema);

export default GitHubIntegration;