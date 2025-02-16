import ProductCard from "./product-card";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

// Mock fetching function
async function getProducts() {
  // Simulate network fetch with a small delay
  await new Promise((res) => setTimeout(res, 1000));

  // Return some mock data
  return [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 199,
      imageUrl: "/images/mock/headphones.jpg",
    },
    {
      id: 2,
      title: "Smartphone",
      price: 599,
      imageUrl: "/images/mock/smartphone.jpg",
    },
    {
      id: 3,
      title: "Book: Next.js in Action",
      price: 29,
      imageUrl: "/images/mock/book.jpg",
    },
    // ...more products
  ];
}

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      {/* Header Section with Sorting and View Options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            All Products
          </h2>
          <p className="text-muted-foreground mt-1">
            Showing {products.length} results
          </p>
        </div>

        <div className="flex items-center gap-4 self-stretch sm:self-auto">
          <Select defaultValue="featured">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Section */}
      <div className="flex justify-center mt-12">
        <Button variant="outline" className="flex items-center gap-2">
          Load More <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
