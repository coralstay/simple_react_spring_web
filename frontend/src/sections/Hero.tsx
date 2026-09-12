import type { CSSProperties } from "react";
import type { CaseStudyHero } from "../content/types";

export interface HeroProps {
  hero: CaseStudyHero;
  onContactClick?: () => void;
}

const sectionStyle: CSSProperties = {
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  color: "#ffffff",
  overflow: "hidden",
};

const backgroundStyle = (imageUrl: string): CSSProperties => ({
  position: "absolute",
  inset: 0,
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.1) 100%)",
};

const contentStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  padding: "clamp(1.5rem, 5vw, 4rem)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(0.75rem, 2vw, 1.5rem)",
};

const headlineStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
  lineHeight: 1.2,
  fontWeight: 700,
};

const subheadlineStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1rem, 2.2vw, 1.375rem)",
  lineHeight: 1.5,
  maxWidth: "48rem",
  color: "rgba(255, 255, 255, 0.9)",
};

const statsRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "clamp(0.5rem, 1.5vw, 1rem)",
  margin: "0.5rem 0",
};

const statBadgeStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  padding: "0.75rem 1.25rem",
  borderRadius: "0.75rem",
  background: "rgba(255, 255, 255, 0.12)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  minWidth: "7rem",
};

const statValueStyle: CSSProperties = {
  fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
  fontWeight: 700,
};

const statLabelStyle: CSSProperties = {
  fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
  color: "rgba(255, 255, 255, 0.8)",
};

const ctaRowStyle: CSSProperties = {
  marginTop: "0.5rem",
};

const ctaStyle: CSSProperties = {
  display: "inline-block",
  padding: "0.875rem 1.75rem",
  fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
  fontWeight: 600,
  color: "#111111",
  backgroundColor: "#ffffff",
  borderRadius: "999px",
  border: "none",
  textDecoration: "none",
  cursor: "pointer",
};

function Hero({ hero, onContactClick }: HeroProps) {
  const ctaProps = onContactClick
    ? {
        as: "button" as const,
        onClick: onContactClick,
      }
    : {
        as: "a" as const,
        href: "#contact",
      };

  return (
    <section style={sectionStyle} aria-label="Hero">
      <div style={backgroundStyle(hero.heroImageUrl)} role="img" aria-label={hero.headline} />
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <h1 style={headlineStyle}>{hero.headline}</h1>
        <p style={subheadlineStyle}>{hero.subheadline}</p>
        {hero.summaryStats.length > 0 && (
          <div style={statsRowStyle}>
            {hero.summaryStats.map((stat) => (
              <div key={stat.label} style={statBadgeStyle}>
                <span style={statValueStyle}>{stat.value}</span>
                <span style={statLabelStyle}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        <div style={ctaRowStyle}>
          {ctaProps.as === "button" ? (
            <button type="button" style={ctaStyle} onClick={ctaProps.onClick}>
              예약 문의하기
            </button>
          ) : (
            <a style={ctaStyle} href={ctaProps.href}>
              예약 문의하기
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
