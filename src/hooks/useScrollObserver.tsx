
import { useEffect, useState } from "react";

export function useScrollObserver(threshold = 0.1) {
  const [observedElements, setObservedElements] = useState<Element[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    setObservedElements(Array.from(elements));

    return () => {
      observedElements.forEach((el) => observer.unobserve(el));
    };
  }, [threshold]);

  return { observedElements };
}
