import ProductCard from "./product-card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
