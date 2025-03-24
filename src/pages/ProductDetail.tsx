
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, isLoading } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const product = productId ? getProductById(productId) : undefined;

  useEffect(() => {
    // Redirect if product is not found and not loading
    if (!isLoading && !product) {
      navigate("/products", { replace: true });
    }
  }, [product, isLoading, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const changeImage = (index: number) => {
    if (index !== activeImageIndex) {
      setIsTransitioning(true);
      setActiveImageIndex(index);
      // Reset the transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
              <div className="h-6 bg-gray-100 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null; // This should redirect due to the useEffect
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    activeImageIndex === index 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0'
                  } ${isTransitioning ? 'scale-105' : 'scale-100'}`}
                />
              ))}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative flex-none w-20 aspect-square rounded-md overflow-hidden ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-black ring-offset-2' 
                        : 'opacity-60'
                    }`}
                    onClick={() => changeImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              <p className="text-2xl">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="space-y-4">
              {/* Quantity Selector */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                size="lg" 
                className="w-full lg:w-auto rounded-full px-8"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Product Details */}
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Category:</strong> {product.category}</li>
                  {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                  <li><strong>Tags:</strong> {product.tags.join(', ')}</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <p className="text-muted-foreground">
                  Free shipping on all orders over $50. Standard delivery 3-5 business days.
                  Express delivery available at checkout.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
