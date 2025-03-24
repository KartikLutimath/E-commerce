
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ products, columns = 3 }: ProductGridProps) => {
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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    setObservedElements(Array.from(elements));

    return () => {
      observedElements.forEach((el) => observer.unobserve(el));
    };
  }, [products]);

  let gridClass = "grid gap-6 md:gap-8";
  if (columns === 2) {
    gridClass += " grid-cols-1 sm:grid-cols-2";
  } else if (columns === 3) {
    gridClass += " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  } else {
    gridClass += " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }

  return (
    <div className={gridClass}>
      {products.map((product, index) => (
        <div key={product.id} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
