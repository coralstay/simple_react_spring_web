import type { CSSProperties } from "react";
import type { MaterialHandled } from "../../content/types";

export interface MaterialsHandledProps {
  materials: MaterialHandled[];
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
  borderRadius: "0.75rem",
  overflow: "hidden",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#ffffff",
};

const imageStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
};

const bodyStyle: CSSProperties = {
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const nameStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.0625rem",
  fontWeight: 600,
  color: "#1a1a1a",
};

const learnedStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  color: "#4a4a4a",
  wordBreak: "keep-all",
};

function MaterialsHandled({ materials }: MaterialsHandledProps) {
  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>다룬 자재</h3>
      <div style={gridStyle}>
        {materials.map((material) => (
          <article key={material.name} style={cardStyle}>
            <img
              src={material.imageUrl}
              alt={material.name}
              style={imageStyle}
              loading="lazy"
            />
            <div style={bodyStyle}>
              <h4 style={nameStyle}>{material.name}</h4>
              <p style={learnedStyle}>{material.whatILearned}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MaterialsHandled;
