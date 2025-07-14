"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get('order_id')
    };

    const res = OrderIdSchema.safeParse(data);

    if (res.success) {
        try {
            await prisma.order.update({
                where: { id: res.data.orderId },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            });

            revalidatePath('admin/orders');
        } catch (error) {
            console.error(error);
        }
    }
}