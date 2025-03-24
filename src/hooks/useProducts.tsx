
import { useState, useEffect } from "react";
import { Product } from "@/types";

// Mock data for products
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Watch",
    description: "A sleek, minimalist watch with a leather strap. Perfect for any occasion.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80"
    ],
    category: "accessories",
    tags: ["watch", "leather", "minimalist"]
  },
  {
    id: "2",
    name: "Modern Desk Lamp",
    description: "A stylish desk lamp with adjustable brightness. Made from high-quality materials.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    category: "home",
    tags: ["lamp", "desk", "modern"]
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise-cancellation technology.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    category: "electronics",
    tags: ["headphones", "wireless", "audio"]
  },
  {
    id: "4",
    name: "Ceramic Mug Set",
    description: "Set of 4 handcrafted ceramic mugs. Each with unique minimalist design.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586365116351-a2094a69d648?auto=format&fit=crop&w=800&q=80"
    ],
    category: "home",
    tags: ["mug", "ceramic", "kitchen"]
  },
  {
    id: "5",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?auto=format&fit=crop&w=800&q=80"
    ],
    category: "accessories",
    tags: ["wallet", "leather", "handcrafted"]
  },
  {
    id: "6",
    name: "Smart Speaker",
    description: "Voice-controlled smart speaker with premium sound quality.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80"
    ],
    category: "electronics",
    tags: ["speaker", "smart", "audio"]
  },
  {
    id: "7",
    name: "Wool Throw Blanket",
    description: "Soft and cozy wool blanket. Perfect for chilly evenings.",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1580301872138-83e0189f932a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594061677657-9a8f890839df?auto=format&fit=crop&w=800&q=80"
    ],
    category: "home",
    tags: ["blanket", "wool", "cozy"]
  },
  {
    id: "8",
    name: "Minimalist Backpack",
    description: "Sleek and durable backpack with laptop compartment and water-resistant material.",
    price: 109.99,
    images: [
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583623025817-d8c2e2cc1f88?auto=format&fit=crop&w=800&q=80"
    ],
    category: "accessories",
    tags: ["backpack", "travel", "minimalist"]
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Set products from mock data
        setProducts(MOCK_PRODUCTS);
        
        // Set featured products (random selection for demo)
        const shuffled = [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter((product) => product.category === category);
  };

  return {
    products,
    featuredProducts,
    isLoading,
    error,
    getProductById,
    getProductsByCategory,
  };
};
