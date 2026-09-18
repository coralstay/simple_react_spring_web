import type { CSSProperties } from "react";
import type { InteriorChapter as InteriorChapterContent } from "../../content/types";
import MaterialsHandled from "./MaterialsHandled";
import CraftDetails from "./CraftDetails";
import LessonsCarriedForward from "./LessonsCarriedForward";

export interface InteriorChapterProps {
  chapter: InteriorChapterContent;
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

const subsectionStyle: CSSProperties = {
  maxWidth: "72rem",
  margin: "0 auto clamp(2.5rem, 6vw, 4rem)",
};

function InteriorChapter({ chapter }: InteriorChapterProps) {
  return (
    <section aria-label={chapter.title} style={sectionStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>{chapter.title}</h2>
        <p style={narrativeStyle}>{chapter.narrative}</p>
      </header>

      <div style={subsectionStyle}>
        <MaterialsHandled materials={chapter.materialsHandled} />
      </div>

      <div style={subsectionStyle}>
        <CraftDetails details={chapter.craftDetails} />
      </div>

      <div style={subsectionStyle}>
        <LessonsCarriedForward lessons={chapter.lessonsCarriedForward} />
      </div>
    </section>
  );
}

export default InteriorChapter;
