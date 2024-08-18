export interface GithubIntegration {
  username: string;
  githubId: string;
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}

export interface RepositoryStat {
  user: string;
  repository: string;
  id: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
}

export interface Statistics {
  repository_stats: { [key: string]: RepositoryStat[] };
}
