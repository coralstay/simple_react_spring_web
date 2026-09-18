import type { CSSProperties, ReactNode } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "../hooks/useInView";

export interface ScrollRevealProps {
  children: ReactNode;
  /** 등장 시 아래에서 위로 이동해오는 거리(px). 기본 24px. */
  distance?: number;
  /** 애니메이션 지속 시간(ms). 기본 600ms. */
  duration?: number;
  /** useInView에 그대로 전달되는 뷰포트 진입 감지 임계값. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * 자식 요소를 감싸 뷰포트에 처음 들어올 때 위로 살짝 이동하며 페이드인하는
 * 스크롤 인뷰 리빌 래퍼. 감지는 useInView(IntersectionObserver, once=true)가 맡고,
 * 애니메이션 자체는 @react-spring/web(useSpring)으로 처리한다.
 */
function ScrollReveal({
  children,
  distance = 24,
  duration = 600,
  threshold = 0.2,
  className,
  style,
}: ScrollRevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold });

  const springStyle = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translateY(0px)" : `translateY(${distance}px)`,
    config: { duration },
  });

  return (
    <animated.div ref={ref} style={{ ...springStyle, ...style }} className={className}>
      {children}
    </animated.div>
  );
}

export default ScrollReveal;
