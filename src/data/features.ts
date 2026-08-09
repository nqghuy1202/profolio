/**
 * Công tắc bật/tắt tính năng.
 */

export const features = {
  /**
   * Khối GitHub stats và link dẫn tới trang profile GitHub.
   *
   * ⚠️ ĐANG TẮT CÓ CHỦ Ý — bật lên sau khi dọn xong các repo cũ.
   *
   * Lý do: khối này kéo người xem thẳng vào trang profile. Chừng nào trên đó
   * còn `chat-server` (từng công khai kèm mật khẩu thật trong .env),
   * `greensys` (code công ty cũ), `heartdisease_adaboost` (bản lỗi) và
   * `website_fashion` (đồ án năm hai), thì mỗi lượt xem portfolio lại là một
   * lượt dẫn người ta tới đúng những thứ không nên nhìn.
   *
   * Bật thành true khi bốn repo đó đã chuyển private và mật khẩu Oracle đã
   * được xoay. Lúc đó profile chỉ còn `heart_risk_estimator` đứng một mình.
   */
  githubStats: false,

  /**
   * Ảnh chân dung ở mục Giới thiệu.
   *
   * ⚠️ ĐANG TẮT — chưa có ảnh. Bật lên khi đã đặt file vào
   * `public/portrait.jpg`.
   *
   * Yêu cầu về ảnh: tỉ lệ dọc 4:5 (vd. 800×1000), nền đơn sắc, áo sơ mi trơn,
   * ánh sáng đều, nhìn thẳng ống kính. Trang sẽ tự chuyển ảnh sang trắng đen
   * để khớp bảng màu — nên đừng chọn ảnh mà màu sắc là điểm mạnh duy nhất.
   *
   * 🚫 KHÔNG dùng ảnh thẻ cấp 3 trong repo `website_fashion` — còn nguyên
   * đồng phục và bảng tên trường, đặt cạnh dòng "hai năm kinh nghiệm" sẽ phản
   * tác dụng.
   */
  portrait: false,
} as const;
