import type { CSSProperties } from "react";
import type { LessonCarriedForward } from "../../content/types";

export interface LessonsCarriedForwardProps {
  lessons: LessonCarriedForward[];
}

const containerStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
};

const headingStyle: CSSProperties = {
  margin: "0 0 clamp(1rem, 3vw, 1.5rem)",
  fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
  fontWeight: 700,
  color: "#1a1a1a",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
  gap: "clamp(1rem, 3vw, 1.75rem)",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
  padding: "1.25rem",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.0625rem",
  fontWeight: 600,
  color: "#1a1a1a",
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "#4a4a4a",
  wordBreak: "keep-all",
};

function LessonsCarriedForward({ lessons }: LessonsCarriedForwardProps) {
  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>지금 운영에 남은 것들</h3>
      <div style={gridStyle}>
        {lessons.map((lesson) => (
          <article key={lesson.title} style={cardStyle}>
            <h4 style={titleStyle}>{lesson.title}</h4>
            <p style={descriptionStyle}>{lesson.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default LessonsCarriedForward;
