import { useEffect, useState } from "react";

function getScrollProgress(): number {
  if (typeof document === "undefined") return 0;

  const { scrollHeight, clientHeight } = document.documentElement;
  const scrollableHeight = scrollHeight - clientHeight;
  if (scrollableHeight <= 0) return 0;

  const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
  return Math.min(1, Math.max(0, scrollTop / scrollableHeight));
}

/**
 * 문서 전체를 기준으로 한 스크롤 진행률(0~1)을 반환하는 훅.
 * 스크롤 가능한 영역이 없으면(콘텐츠가 뷰포트보다 짧으면) 0을 반환한다.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(getScrollProgress);

  useEffect(() => {
    const handleUpdate = () => setProgress(getScrollProgress());

    handleUpdate();
    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, []);

  return progress;
}
