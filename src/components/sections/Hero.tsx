import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { features } from "@/data/features";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Khối nhận diện: ảnh bên trái, tên và chức danh bên phải, canh giữa theo
// chiều dọc. Đoạn giới thiệu nằm dưới, giới hạn ở --measure (~70 ký tự/dòng).
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
          <div className="flex items-center gap-6 sm:gap-8">
            {features.portrait ? (
              // Khung là một vòng kẻ chỉ riêng, cách ảnh một khoảng đệm, nên
              // nó đọc ra thành cái khung chứ không phải viền dính vào ảnh.
              <div className="shrink-0 rounded-full border border-rule-ink p-2.5">
                <Image
                  src="/portrait.jpg"
                  alt={hero.portraitAlt}
                  width={576}
                  height={576}
                  sizes="(min-width: 640px) 12rem, 9rem"
                  priority
                  className="size-36 rounded-full object-cover sm:size-48"
                />
              </div>
            ) : null}

            <div className="min-w-0">
              <p className="label text-accent">{hero.role}</p>
              <h1 className="display-sm mt-3 text-ink">{name}</h1>
            </div>
          </div>

          <div className="mt-12 max-w-[var(--measure)]">
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
