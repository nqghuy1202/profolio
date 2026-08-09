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
} as const;
