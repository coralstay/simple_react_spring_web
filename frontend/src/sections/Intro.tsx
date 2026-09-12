import type { CSSProperties } from "react";

export interface IntroProps {
  /** Override the default background-to-present connecting sentence. */
  sentence?: string;
}

const DEFAULT_SENTENCE =
  "여러 현장에서 몸으로 배운 뒤, 지금은 그 감각으로 숙소를 운영합니다";

const sectionStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "clamp(2.5rem, 8vw, 6rem) clamp(1.25rem, 6vw, 4rem)",
  display: "flex",
  justifyContent: "center",
};

const sentenceStyle: CSSProperties = {
  maxWidth: "40rem",
  margin: 0,
  textAlign: "center",
  fontSize: "clamp(1.125rem, 2.5vw + 0.5rem, 1.75rem)",
  lineHeight: 1.6,
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: "#1a1a1a",
  wordBreak: "keep-all",
};

function Intro({ sentence = DEFAULT_SENTENCE }: IntroProps = {}) {
  return (
    <section aria-label="Intro" style={sectionStyle}>
      <p style={sentenceStyle}>{sentence}</p>
    </section>
  );
}

export default Intro;
