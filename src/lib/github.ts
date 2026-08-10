import { profile } from "@/data/profile";

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  stars: number;
  lastPushedAt: string | null;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

// Chạy trên server chứ không trong trình duyệt: GitHub giới hạn 60 request/giờ
// mỗi IP khi không có token, revalidate 3600 cho phép cả giờ dùng chung một
// bản đã dựng sẵn, và token (nếu có) không lộ ra bundle tải về máy khách.
// Trả null khi hỏng — số liệu này là trang trí, phần gọi sẽ tự ẩn khối đi.
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${profile.githubUser}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`,
        { headers, next: { revalidate: 3600 } },
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) return null;

    const user: GitHubUser = await userResponse.json();
    const repos: GitHubRepo[] = await reposResponse.json();

    // Chỉ tính repo tự viết. Sao trên một repo fork về là sao của người khác.
    const ownRepos = repos.filter((repo) => !repo.fork);

    const stars = ownRepos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0,
    );

    const lastPushedAt =
      ownRepos
        .map((repo) => repo.pushed_at)
        .sort()
        .at(-1) ?? null;

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      stars,
      lastPushedAt,
    };
  } catch {
    return null;
  }
}
