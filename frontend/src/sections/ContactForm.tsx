import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

type InquiryType = "RESERVATION" | "GENERAL" | "OTHER";

interface InquiryPayload {
  name: string;
  contact: string;
  message: string;
  type: InquiryType;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: InquiryPayload = {
  name: "",
  contact: "",
  message: "",
  type: "GENERAL",
};

const sectionStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "clamp(3rem, 10vw, 6rem) clamp(1.25rem, 6vw, 4rem)",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f5f5f3",
};

const formStyle: CSSProperties = {
  width: "100%",
  maxWidth: "32rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const fieldStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
};

const labelStyle: CSSProperties = {
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: "#1a1a1a",
};

const inputStyle: CSSProperties = {
  padding: "0.75rem 0.9375rem",
  fontSize: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid #d0d0cc",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const textareaStyle: CSSProperties = {
  ...inputStyle,
  minHeight: "8rem",
  resize: "vertical",
};

const submitStyle: CSSProperties = {
  marginTop: "0.5rem",
  padding: "0.9375rem",
  fontSize: "1.0625rem",
  fontWeight: 700,
  color: "#ffffff",
  backgroundColor: "#1a1a1a",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
};

const messageStyle = (variant: "success" | "error"): CSSProperties => ({
  margin: 0,
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: variant === "success" ? "#1a7a3c" : "#b3261e",
});

function ContactForm() {
  const [form, setForm] = useState<InquiryPayload>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`문의 제출 실패: ${response.status}`);
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" style={sectionStyle} aria-label="문의하기">
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="contact-name">
            이름
          </label>
          <input
            id="contact-name"
            style={inputStyle}
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="contact-contact">
            연락처
          </label>
          <input
            id="contact-contact"
            style={inputStyle}
            type="text"
            required
            placeholder="전화번호 또는 이메일"
            value={form.contact}
            onChange={(event) => setForm({ ...form, contact: event.target.value })}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="contact-type">
            문의 유형
          </label>
          <select
            id="contact-type"
            style={inputStyle}
            value={form.type}
            onChange={(event) =>
              setForm({ ...form, type: event.target.value as InquiryType })
            }
          >
            <option value="RESERVATION">예약 문의</option>
            <option value="GENERAL">일반 문의</option>
            <option value="OTHER">기타</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="contact-message">
            문의 내용
          </label>
          <textarea
            id="contact-message"
            style={textareaStyle}
            required
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
          />
        </div>

        <button type="submit" style={submitStyle} disabled={status === "submitting"}>
          {status === "submitting" ? "제출 중..." : "문의 제출"}
        </button>

        {status === "success" && (
          <p role="status" style={messageStyle("success")}>
            문의가 정상적으로 접수되었습니다.
          </p>
        )}
        {status === "error" && (
          <p role="alert" style={messageStyle("error")}>
            문의 제출에 실패했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}
      </form>
    </section>
  );
}

export default ContactForm;
