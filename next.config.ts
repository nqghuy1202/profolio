import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Cho phép app/global-not-found.tsx. Cần cờ này vì thẻ <html> của site nằm
    // trong app/[locale]/layout.tsx: địa chỉ không khớp route nào thì không
    // layout nào chạy, nên phải có một trang 404 tự dựng cả tài liệu. Không
    // bật thì Next trả về trang 404 mặc định, chữ đen nền trắng, không font.
    globalNotFound: true,
  },

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
