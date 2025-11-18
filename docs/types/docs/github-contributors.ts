export interface GitHubContributorsProps {
  /**
   * GitHub repository in format 'owner/repo' (e.g., 'vercel/next.js')
   */
  repo: string;
  /**
   * Maximum number of contributors to display
   * @default 12
   */
  limit?: number;
  /**
   * Additional CSS classes for styling
   */
  className?: string;
  /**
   * Optional GitHub personal access token to increase rate limits
   */
  token?: string;
}
