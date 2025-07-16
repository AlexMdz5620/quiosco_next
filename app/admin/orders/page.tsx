'use client'

import useSWR from 'swr'
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from '@/src/types';
// import { prisma } from "@/src/lib/prisma";
// import { revalidatePath } from "next/cache";

// async function getPendingOrders() {

// }

export default /* async */ function OrderPage() {
  // const orders = await getPendingOrders();
  // const refreshOrders = async () => {
  //   'use server';
  //   revalidatePath('/admin/orders')
  // }
  const url = '/admin/orders/api';
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 600000,
    revalidateOnFocus: false
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data) return (
    <>
      <Heading>Administrar Ordenes</Heading>
      {/* 
      <form action={ refreshOrders }
      >
        <input
          type="submit"
          value='Actualizar Ordenes'
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        />
      </form>
       */}
      {data.length
        ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map(order => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )
        : <p className="text-center">No hay ordenes Pendientes</p>
      }
    </>
  )
}
