import ProductCard from "@/components/product/ProductCard";
import Heading from "@/components/ui/Heading";
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
      <Heading>Elige y personaliza tu pedido</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
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
