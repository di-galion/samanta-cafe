import {ICategory} from "@/types/category.types";
import {IMenuItem} from "@/components/ui/sidebar/types";

export const convertToMenuItems = (data: ICategory[]): IMenuItem[] => {
    return data.map(item => ({
        href: `/category/${item.slug}`,
        label: item.name,
    }))
}