import { Product } from "@/generated/prisma";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
    quantity: number;
    subtotal: number;
}