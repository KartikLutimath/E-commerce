
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className="product-card group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
        <div 
          className={`absolute inset-0 bg-gray-100 ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
        <img
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        <div className="product-details flex flex-col space-y-1">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-base font-medium text-white">{product.name}</h3>
              <p className="text-sm text-white/90">${product.price.toFixed(2)}</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
