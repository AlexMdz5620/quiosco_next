import ProductCard from "@/components/product/ProductCard";
import { prisma } from "@/src/lib/prisma";

async function getProductos(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  });
  return products;
}
type CategoryProps = {
  category: string
}

export default async function OrderPage({ params }: { params: Promise<CategoryProps> }) {
  const { category } = await params;
  const products = await getProductos(category);

  return (
    <>
      <h1 className="text-2xl my-10">Elige y personaliza tu pedido</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </>
  )
}
