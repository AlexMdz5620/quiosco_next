import ProductSearchForm from '@/components/product/ProductSearchForm';
import ProductTable from '@/components/product/ProductTable';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';

async function searchProducts(searchTerm: string) {
    const product = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: { category: true }
    });

    return product;
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const products = await searchProducts(searchParams.search);

    return (
        <>
            <Heading>Resultado de búsqueda: {searchParams.search}</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm />
            </div>
            {products.length
                ? (
                    <ProductTable
                        products={products}
                    />
                )
                : <p className='text-center text-lg'>No hay resultados</p>
            }
        </>
    )
}
