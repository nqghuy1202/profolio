import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

/**
 * Nhận tin nhắn từ form liên hệ.
 *
 * Hoạt động ở hai chế độ, tuỳ vào việc đã có RESEND_API_KEY hay chưa:
 *
 *   - CÓ khoá  → gửi email thật qua Resend.
 *   - CHƯA có  → trả về 501 kèm reason "not-configured", và phía trình duyệt
 *                tự mở ứng dụng mail của người dùng với nội dung điền sẵn.
 *
 * Nhờ vậy form dùng được ngay từ lúc deploy mà không cần cấu hình gì, và bật
 * lên gửi mail thật chỉ bằng cách thêm một biến môi trường — không phải sửa
 * dòng code nào.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-json" }, { status: 400 });
  }

  // Kiểm tra lại toàn bộ ở phía máy chủ. Việc form đã kiểm tra rồi không có
  // nghĩa lý gì ở đây — bất kỳ ai cũng gọi thẳng vào endpoint này được.
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    name.length === 0 ||
    name.length > 100 ||
    !EMAIL_PATTERN.test(email) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, reason: "invalid" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromAddress) {
    return NextResponse.json(
      { ok: false, reason: "not-configured" },
      { status: 501 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: profile.email,
        // reply_to trỏ về người gửi, nên bấm "Trả lời" trong hộp thư là trả
        // lời đúng họ, chứ không phải trả lời chính địa chỉ gửi đi.
        reply_to: email,
        subject: `Portfolio — ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, reason: "provider-error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "provider-error" },
      { status: 502 },
    );
  }
}
