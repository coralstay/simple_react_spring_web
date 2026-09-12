import type { CSSProperties } from "react";
import type { ConstructionChapter as ConstructionChapterContent } from "../../content/types";

export interface ConstructionChapterProps {
  chapter: ConstructionChapterContent;
}

const sectionStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "clamp(2.5rem, 8vw, 6rem) clamp(1.25rem, 6vw, 4rem)",
};

const headerStyle: CSSProperties = {
  maxWidth: "48rem",
  margin: "0 auto clamp(2rem, 5vw, 3rem)",
  textAlign: "center",
};

const titleStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
  fontWeight: 700,
  color: "#1a1a1a",
};

const narrativeStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1rem, 2vw, 1.125rem)",
  lineHeight: 1.7,
  color: "#3a3a3a",
  wordBreak: "keep-all",
};

const lessonsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
  gap: "clamp(1rem, 3vw, 1.75rem)",
  maxWidth: "72rem",
  margin: "0 auto",
};

const lessonCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.75rem",
  overflow: "hidden",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
};

const lessonImageStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
};

const lessonBodyStyle: CSSProperties = {
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const lessonTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.0625rem",
  fontWeight: 600,
  color: "#1a1a1a",
};

const lessonDescriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "#4a4a4a",
  wordBreak: "keep-all",
};

function ConstructionChapter({ chapter }: ConstructionChapterProps) {
  return (
    <section aria-label={chapter.title} style={sectionStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>{chapter.title}</h2>
        <p style={narrativeStyle}>{chapter.narrative}</p>
      </header>
      <div style={lessonsGridStyle}>
        {chapter.onSiteLessons.map((lesson) => (
          <article key={lesson.title} style={lessonCardStyle}>
            <img
              src={lesson.imageUrl}
              alt={lesson.title}
              style={lessonImageStyle}
              loading="lazy"
            />
            <div style={lessonBodyStyle}>
              <h3 style={lessonTitleStyle}>{lesson.title}</h3>
              <p style={lessonDescriptionStyle}>{lesson.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ConstructionChapter;
