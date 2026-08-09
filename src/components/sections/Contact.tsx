"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactCopy = Dictionary["contact"];
type FieldName = "name" | "email" | "message";
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "failed" | "fallback";

/**
 * Kiểm tra email ở mức "có đúng hình dạng một địa chỉ không".
 * Cố ý không dùng regex RFC 5322 đầy đủ — nó dài hàng trăm ký tự, vẫn không
 * đúng hết, và địa chỉ có tồn tại hay không thì chỉ máy chủ mail trả lời được.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { name: "", email: "", message: "" };

export function Contact({ copy }: { copy: ContactCopy }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!values.name.trim()) next.name = copy.errors.nameRequired;

    if (!values.email.trim()) next.email = copy.errors.emailRequired;
    else if (!EMAIL_PATTERN.test(values.email.trim()))
      next.email = copy.errors.emailInvalid;

    if (!values.message.trim()) next.message = copy.errors.messageRequired;
    else if (values.message.trim().length < 10)
      next.message = copy.errors.messageTooShort;

    return next;
  }

  /** Mở ứng dụng mail của người xem với nội dung đã điền sẵn. */
  function openMailClient() {
    const subject = encodeURIComponent(`Portfolio — ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setValues(EMPTY_FORM);
        setStatus("success");
        return;
      }

      // Khi máy chủ chưa cắm khoá gửi mail, nó nói thẳng ra như vậy — và ta
      // rơi về mở ứng dụng mail của người dùng, thay vì báo lỗi rồi để tin
      // nhắn của họ rơi vào hư không.
      const payload = await response.json().catch(() => null);
      if (payload?.reason === "not-configured") {
        setStatus("fallback");
        openMailClient();
        return;
      }

      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Xoá lỗi ngay khi người dùng bắt đầu sửa, thay vì bắt họ bấm gửi lại mới
    // biết đã sửa đúng chưa.
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  const statusMessage =
    status === "success"
      ? copy.status.success
      : status === "failed"
        ? copy.status.failed
        : status === "fallback"
          ? copy.status.mailtoFallback
          : "";

  const directLinks = [
    {
      href: `mailto:${profile.email}`,
      label: copy.emailLabel,
      value: profile.email,
      external: false,
    },
    {
      href: profile.githubUrl,
      label: copy.githubLabel,
      value: `github.com/${profile.githubUser}`,
      external: true,
    },
    {
      href: profile.linkedinUrl,
      label: copy.linkedinLabel,
      value: "linkedin.com/in/huy-nqg",
      external: true,
    },
  ];

  return (
    <Section id="contact" index="04" label={copy.title}>
      <Container>
        <div className="max-w-[46rem] pt-12">
          <p className="display-sm text-ink">{copy.statement}</p>
          <p className="mt-6 max-w-[var(--measure)] text-base leading-[1.7] text-ink-2">
            {copy.lead}
          </p>
        </div>

        <div className="mt-14 grid gap-14 pb-20 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          {/* noValidate để trình duyệt không chen thông báo lỗi bằng ngôn ngữ
              của nó — thông báo phải cùng ngôn ngữ với trang. */}
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            <Field
              id="name"
              label={copy.form.name}
              requiredLabel={copy.form.required}
              error={errors.name}
            >
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                placeholder={copy.form.namePlaceholder}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass(Boolean(errors.name))}
              />
            </Field>

            <Field
              id="email"
              label={copy.form.email}
              requiredLabel={copy.form.required}
              error={errors.email}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                placeholder={copy.form.emailPlaceholder}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(Boolean(errors.email))}
              />
            </Field>

            <Field
              id="message"
              label={copy.form.message}
              requiredLabel={copy.form.required}
              error={errors.message}
            >
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                placeholder={copy.form.messagePlaceholder}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass(Boolean(errors.message))} resize-y`}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === "sending"}
                className="label border border-ink px-7 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? copy.form.sending : copy.form.submit} →
              </button>

              {/* aria-live="polite" khiến trình đọc màn hình đọc kết quả gửi
                  ngay khi nó xuất hiện, mà không cắt ngang việc đang làm. */}
              <p
                role="status"
                aria-live="polite"
                className={`max-w-sm text-sm leading-relaxed ${
                  status === "failed" ? "text-accent-deep" : "text-ink-2"
                }`}
              >
                {statusMessage}
              </p>
            </div>
          </form>

          <div>
            <p className="label text-accent">{copy.directTitle}</p>
            <ul className="mt-5 border-t border-rule-ink">
              {directLinks.map((link) => (
                <li key={link.label} className="border-b border-rule py-4">
                  <span className="label block text-ink-3">{link.label}</span>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="underline-grow mt-2 inline-block text-sm text-ink"
                  >
                    {link.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Ô nhập chỉ có một đường kẻ dưới, không khung hộp.
 * Khung hộp bo góc là thứ khiến biểu mẫu trông giống mọi biểu mẫu khác; một
 * đường kẻ thì hợp với trang đang phân vùng bằng kẻ chỉ.
 */
function inputClass(hasError: boolean) {
  return `w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-3/70 focus:outline-none transition-colors ${
    hasError ? "border-accent-deep" : "border-rule-ink focus:border-accent"
  }`;
}

function Field({
  id,
  label,
  requiredLabel,
  error,
  children,
}: {
  id: string;
  label: string;
  requiredLabel: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label flex items-baseline gap-3 text-ink">
        {label}
        <span className="text-ink-3 normal-case tracking-normal">
          {requiredLabel}
        </span>
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
