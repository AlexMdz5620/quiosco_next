"use client";

import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const res = SearchSchema.safeParse(data);
        if (!res.success) {
            res.error.issues.forEach(issue => {
                toast.error(issue.message);
            });
            return;
        }
        redirect(`/admin/products/search?search=${res.data.search}`);
    }
    return (
        <form
            action={handleSearchForm}
            className="flex items-center"
        >
            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full bg-white"
                name="search"
                id=""
            />
            <input
                type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                value="Buscar" />
        </form>
    )
}
