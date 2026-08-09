"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";

type ContactCopy = Dictionary["contact"];
type FieldName = "name" | "email" | "message";
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "failed" | "fallback";

/**
 * Kiểm tra email ở mức "có đúng hình dạng một địa chỉ không".
 * Cố ý không dùng regex RFC 5322 đầy đủ — nó dài hàng trăm ký tự, vẫn không
 * đúng hết, và địa chỉ hợp lệ hay không thì chỉ có máy chủ mail trả lời được.
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

  /** Mở ứng dụng mail với nội dung đã điền sẵn. */
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
      // rơi về mở ứng dụng mail của người dùng, thay vì báo lỗi và để tin
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
    // Xoá lỗi ngay khi người dùng bắt đầu sửa, thay vì bắt họ bấm gửi lại
    // mới biết đã sửa đúng chưa.
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
      Icon: MailIcon,
    },
    {
      href: profile.githubUrl,
      label: copy.githubLabel,
      value: `github.com/${profile.githubUser}`,
      Icon: GitHubIcon,
    },
    {
      href: profile.linkedinUrl,
      label: copy.linkedinLabel,
      value: "linkedin.com/in/huy-nqg",
      Icon: LinkedInIcon,
    },
  ];

  return (
    <Section id="contact" title={copy.title} lead={copy.lead}>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        {/* noValidate để trình duyệt không chen thông báo lỗi bằng ngôn ngữ
            của nó — thông báo phải cùng ngôn ngữ với trang. */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
              rows={5}
              value={values.message}
              placeholder={copy.form.messagePlaceholder}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${inputClass(Boolean(errors.message))} resize-y`}
            />
          </Field>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? copy.form.sending : copy.form.submit}
          </button>

          {/* aria-live="polite" khiến trình đọc màn hình đọc kết quả gửi ngay
              khi nó xuất hiện, mà không cắt ngang việc người dùng đang làm. */}
          <p
            role="status"
            aria-live="polite"
            className={`min-h-5 text-sm ${
              status === "failed" ? "text-danger" : "text-accent"
            }`}
          >
            {statusMessage}
          </p>
        </form>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
            {copy.directTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {directLinks.map(({ href, label, value, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-accent"
                >
                  <span className="text-lg text-ink-faint">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-ink">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-md border bg-canvas-subtle px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none ${
    hasError ? "border-danger" : "border-line-strong"
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
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 text-sm text-ink"
      >
        {label}
        <span className="font-mono text-[11px] text-ink-faint">
          {requiredLabel}
        </span>
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
