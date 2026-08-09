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

/**
 * Đọc số liệu công khai từ GitHub REST API.
 *
 * Chạy trên server, không chạy trong trình duyệt. Ba lý do:
 * 1. GitHub giới hạn 60 request/giờ cho mỗi IP khi không có token. Gọi từ
 *    trình duyệt nghĩa là mỗi khách một hạn mức riêng, và người dùng ở cùng
 *    một công ty dùng chung IP sẽ đốt hết hạn mức của nhau.
 * 2. `next: { revalidate: 3600 }` cho Next giữ lại kết quả một giờ. Ai mở
 *    trang trong giờ đó cũng nhận cùng một bản đã dựng sẵn — không request
 *    thêm, không có khoảnh khắc trang trống chờ dữ liệu.
 * 3. Nếu sau này thêm token để nâng hạn mức, token nằm ở biến môi trường
 *    phía server chứ không lộ ra mã nguồn tải về máy khách.
 *
 * Trả về null khi gọi hỏng. Số liệu GitHub là phần trang trí, không đáng để
 * làm sập cả trang — phần gọi sẽ tự ẩn khối này đi.
 */
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
