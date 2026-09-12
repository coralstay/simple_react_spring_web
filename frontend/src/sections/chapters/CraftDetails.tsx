import type { CSSProperties } from "react";
import type { CraftDetail } from "../../content/types";

export interface CraftDetailsProps {
  details: CraftDetail[];
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

const imageStripStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(4.5rem, 1fr))",
  gap: "0.25rem",
  padding: "0.25rem",
};

const imageStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  borderRadius: "0.375rem",
};

const bodyStyle: CSSProperties = {
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
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

function CraftDetails({ details }: CraftDetailsProps) {
  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>시공 디테일</h3>
      <div style={gridStyle}>
        {details.map((detail) => (
          <article key={detail.title} style={cardStyle}>
            <div style={imageStripStyle}>
              {detail.images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${detail.title} 시공 사진 ${index + 1}`}
                  style={imageStyle}
                  loading="lazy"
                />
              ))}
            </div>
            <div style={bodyStyle}>
              <h4 style={titleStyle}>{detail.title}</h4>
              <p style={descriptionStyle}>{detail.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CraftDetails;
