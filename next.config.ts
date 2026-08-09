import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Mọi thứ nằm dưới /en hoặc /vi, nên "/" phải đẩy đi đâu đó.
        // permanent: false (307) chứ không phải 308: trình duyệt cache vĩnh
        // viễn một redirect 308, nên nếu sau này đổi ngôn ngữ mặc định thì
        // những người từng ghé qua sẽ kẹt ở /en mà không cách nào sửa.
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
