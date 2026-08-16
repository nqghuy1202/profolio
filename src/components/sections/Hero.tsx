import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Bố cục lệch: tên chiếm trọn bề ngang, đoạn giới thiệu thụt vào cột phải và
// giới hạn ở --measure (~70 ký tự/dòng) cho dễ đọc.
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
          {/* Bốn ô: hai hàng đôi ở khổ tablet, một hàng ngang ở khổ rộng.
              Đường kẻ dọc chỉ vẽ khi ô KHÔNG đứng đầu hàng, nếu không sẽ có
              một nét thừa dính vào lề trái. */}
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
            {hero.meta.map((item, index) => (
              <div
                key={item.label}
                className={`py-6 sm:px-8 sm:even:pr-0 lg:even:pr-8 lg:last:pr-0 ${
                  index > 0 ? "border-t border-rule sm:border-t-0" : ""
                } ${
                  index % 2 === 1 ? "sm:border-l sm:border-rule" : "sm:pl-0"
                } ${
                  index % 2 === 0 && index > 0
                    ? "sm:border-t sm:border-rule lg:border-t-0 lg:border-l lg:pl-8"
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
