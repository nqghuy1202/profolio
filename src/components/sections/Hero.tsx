import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * Bố cục lệch có chủ ý: tên chiếm trọn bề ngang, còn đoạn giới thiệu thụt vào
 * cột phải và bị giới hạn ở --measure (~70 ký tự một dòng). Chữ căn đều hai
 * mép từ mép này sang mép kia thì không ai đọc nổi; một cột hẹp lệch sang một
 * bên vừa dễ đọc vừa tạo khoảng trắng — thứ làm nên chất tạp chí.
 */
export function Hero({
  hero,
  locale,
}: {
  hero: Dictionary["hero"];
  locale: Locale;
}) {
  const name = locale === "vi" ? profile.fullNameVi : profile.fullName;

  return (
    <section className="border-b border-rule-ink">
      <Container>
        <div className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <p className="label text-accent">{hero.role}</p>

          <h1 className="display mt-6 text-ink">{name}</h1>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Cột trái để trống trên màn hình rộng — khoảng trắng ở đây là
                nội dung, không phải chỗ chưa điền. */}
            <div aria-hidden="true" className="hidden lg:block" />

            <div className="max-w-[var(--measure)]">
              <p className="text-lg leading-[1.65] text-ink-2 sm:text-xl">
                {hero.intro}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                {/* Nút viền vuông, hover thì đảo màu — đúng cách nút
                    "XEM THÊM" của HL Company hoạt động. */}
                <a
                  href="#work"
                  className="label border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  {hero.ctaWork} →
                </a>
                <a
                  href="#contact"
                  className="label underline-grow text-ink-2 hover:text-ink"
                >
                  {hero.ctaContact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Dải siêu dữ liệu — kẻ chỉ chạy hết bề ngang, chia ô bằng đường dọc */}
      <div className="border-t border-rule">
        <Container>
          <dl className="grid sm:grid-cols-3">
            {hero.meta.map((item, index) => (
              <div
                key={item.label}
                className={`py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0 ${
                  index > 0
                    ? "border-t border-rule sm:border-t-0 sm:border-l"
                    : ""
                }`}
              >
                <dt className="label text-ink-3">{item.label}</dt>
                <dd className="mt-2.5 text-sm text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
