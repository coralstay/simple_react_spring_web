import { useEffect, useRef, useState } from "react";

export interface UseInViewOptions extends IntersectionObserverInit {
  /** true(기본값)면 한 번 뷰포트에 들어온 뒤 다시 나가도 isInView를 false로 되돌리지 않는다. */
  once?: boolean;
}

export interface UseInViewResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  isInView: boolean;
}

/**
 * 스크롤 인뷰 리빌 애니메이션에 쓰는 IntersectionObserver 기반 훅.
 * jsdom처럼 IntersectionObserver가 없는 환경에서는 즉시 isInView=true로 폴백한다.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
): UseInViewResult<T> {
  const { once = true, root = null, rootMargin, threshold } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return { ref, isInView };
}
