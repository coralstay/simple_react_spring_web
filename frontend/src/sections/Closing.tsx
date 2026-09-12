import type { CSSProperties } from "react";
import type { CaseStudyClosing } from "../content/types";

export interface ClosingProps {
  /** Override the default closing reflection + contact CTA copy. */
  closing?: CaseStudyClosing;
}

const DEFAULT_CLOSING: CaseStudyClosing = {
  reflection:
    "건축 현장에서 익힌 눈, 실내건축 현장에서 다진 손끝의 감각, 그리고 지금 이 숙소를 운영하며 쌓은 안목까지 — 세 경험이 이어져 지금의 공간을 만듭니다.",
  contactCta: "예약/문의하기",
};

const sectionStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "clamp(3rem, 10vw, 7rem) clamp(1.25rem, 6vw, 4rem)",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#1a1a1a",
};

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "clamp(1.75rem, 5vw, 2.5rem)",
  maxWidth: "40rem",
  textAlign: "center",
};

const reflectionStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.125rem, 2.5vw + 0.5rem, 1.75rem)",
  lineHeight: 1.7,
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "#ffffff",
  wordBreak: "keep-all",
};

const ctaStyle: CSSProperties = {
  display: "inline-block",
  padding: "clamp(0.9375rem, 2vw, 1.125rem) clamp(2rem, 5vw, 2.75rem)",
  fontSize: "clamp(1rem, 2vw, 1.125rem)",
  fontWeight: 700,
  color: "#1a1a1a",
  backgroundColor: "#ffffff",
  borderRadius: "999px",
  border: "none",
  textDecoration: "none",
  cursor: "pointer",
};

function Closing({ closing = DEFAULT_CLOSING }: ClosingProps = {}) {
  return (
    <section style={sectionStyle} aria-label="Closing">
      <div style={contentStyle}>
        <p style={reflectionStyle}>{closing.reflection}</p>
        <a style={ctaStyle} href="#contact">
          {closing.contactCta}
        </a>
      </div>
    </section>
  );
}

export default Closing;
