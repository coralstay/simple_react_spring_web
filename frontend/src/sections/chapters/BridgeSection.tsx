import type { CSSProperties } from "react";
import type { BridgeSection as BridgeSectionContent } from "../../content/types";

export interface BridgeSectionProps {
  section: BridgeSectionContent;
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

const renovationCardStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
  gap: "clamp(1.5rem, 4vw, 3rem)",
  alignItems: "center",
  maxWidth: "72rem",
  margin: "0 auto",
  borderRadius: "1rem",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
  padding: "clamp(1.25rem, 3vw, 2.5rem)",
};

const comparisonGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))",
  gap: "0.75rem",
};

const imageFigureStyle: CSSProperties = {
  position: "relative",
  margin: 0,
};

const imageStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  borderRadius: "0.75rem",
  display: "block",
};

const imageLabelStyle: CSSProperties = {
  position: "absolute",
  top: "0.625rem",
  left: "0.625rem",
  padding: "0.25rem 0.625rem",
  borderRadius: "999px",
  backgroundColor: "rgba(26, 26, 26, 0.75)",
  color: "#ffffff",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
};

const detailsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const renovationTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
  fontWeight: 700,
  color: "#1a1a1a",
};

const renovationDescriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "#4a4a4a",
  wordBreak: "keep-all",
};

const statsRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  marginTop: "0.25rem",
};

const statItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.125rem",
  padding: "0.625rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#f5f5f4",
  minWidth: "6.5rem",
};

const statLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.75rem",
  color: "#6a6a6a",
};

const statValueStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  fontWeight: 600,
  color: "#1a1a1a",
};

function BridgeSection({ section }: BridgeSectionProps) {
  const { renovation } = section;

  return (
    <section aria-label={section.title} style={sectionStyle}>
      <header style={headerStyle}>
        <h2 style={titleStyle}>{section.title}</h2>
        <p style={narrativeStyle}>{section.narrative}</p>
      </header>
      <article style={renovationCardStyle}>
        <div style={comparisonGridStyle}>
          <figure style={imageFigureStyle}>
            <img
              src={renovation.beforeImageUrl}
              alt={`${renovation.title} 시공 전`}
              style={imageStyle}
              loading="lazy"
            />
            <span style={imageLabelStyle}>시공 전</span>
          </figure>
          <figure style={imageFigureStyle}>
            <img
              src={renovation.afterImageUrl}
              alt={`${renovation.title} 시공 후`}
              style={imageStyle}
              loading="lazy"
            />
            <span style={imageLabelStyle}>시공 후</span>
          </figure>
        </div>
        <div style={detailsStyle}>
          <h3 style={renovationTitleStyle}>{renovation.title}</h3>
          <p style={renovationDescriptionStyle}>{renovation.description}</p>
          <div style={statsRowStyle}>
            <div style={statItemStyle}>
              <p style={statLabelStyle}>비용</p>
              <p style={statValueStyle}>{renovation.cost}</p>
            </div>
            <div style={statItemStyle}>
              <p style={statLabelStyle}>기간</p>
              <p style={statValueStyle}>{renovation.period}</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default BridgeSection;
