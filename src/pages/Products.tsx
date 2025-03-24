
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/types";
import { X } from "lucide-react";

const Products = () => {
  const { products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get query parameters
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sort") || "featured";

  useEffect(() => {
    if (!isLoading) {
      // Apply category filter
      let filtered = [...products];
      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      // Apply sorting
      switch (sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Default sorting (featured) - we'll use the original order
          break;
      }

      setFilteredProducts(filtered);
    }
  }, [products, isLoading, category, sortBy]);

  // Get unique categories for filter
  const categories = isLoading 
    ? [] 
    : Array.from(new Set(products.map((product) => product.category)));

  // Update search params
  const updateFilters = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Toggle filter sidebar on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium mb-2">Products</h1>
          <p className="text-muted-foreground">
            {category 
              ? `Browse our ${category} collection`
              : "Browse our collection of premium products"}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Mobile filter controls */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Button variant="outline" onClick={toggleFilter}>
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
            <Select value={sortBy} onValueChange={(value) => updateFilters("sort", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sidebar filter - mobile version */}
          <div 
            className={`fixed inset-0 bg-white z-40 p-6 overflow-auto transition-transform duration-300 transform lg:hidden ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Filters</h2>
              <Button variant="ghost" size="icon" onClick={toggleFilter}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {(category) && (
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm">Active filters:</span>
                {category && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-xs rounded-full flex items-center gap-1"
                    onClick={() => updateFilters("category", "")}
                  >
                    {category}
                    <X className="h-3 w-3" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-muted-foreground ml-2"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant="ghost"
                        className={`justify-start h-8 px-2 ${
                          category === cat ? "bg-secondary" : ""
                        }`}
                        onClick={() => {
                          updateFilters("category", cat);
                          toggleFilter();
                        }}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <Button className="w-full" onClick={toggleFilter}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Sidebar filter - desktop version */}
          <div className="hidden lg:block space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Filter By</h3>
              {(category) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="text-sm">Active filters:</span>
                  {category && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="text-xs rounded-full flex items-center gap-1"
                      onClick={() => updateFilters("category", "")}
                    >
                      {category}
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-muted-foreground ml-2"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </div>
              )}
              
              <Accordion type="single" collapsible className="w-full" defaultValue="category">
                <AccordionItem value="category">
                  <AccordionTrigger>Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat}
                          variant="ghost"
                          className={`justify-start h-8 px-2 ${
                            category === cat ? "bg-secondary" : ""
                          }`}
                          onClick={() => updateFilters("category", cat)}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-4">Sort By</h3>
              <Select value={sortBy} onValueChange={(value) => updateFilters("sort", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="relative aspect-[4/5] rounded-xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} columns={3} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
