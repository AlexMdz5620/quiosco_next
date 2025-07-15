import EditProductForm from "@/components/product/EditProductForm";
import ProductForm from "@/components/product/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProdyctById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id }
  });
  if (!product) notFound();
  return product;
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {
  const product = await getProdyctById(+params.id);

  return (
    <>
      <Heading>Editar Producto</Heading>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}
