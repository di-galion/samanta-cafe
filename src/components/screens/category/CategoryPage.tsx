import {register} from "@/store/user/user.actions";
import Catalog from "@/components/ui/product/catalog/Catalog";
import {FC} from "react";
import {CategoryService} from "@/services/category/category.service";

const CategoryPage: FC<{slug: string}> = async ({slug}) => {
    const {data} = await CategoryService.getBySlug(slug)
    return <Catalog heading={slug} data={data.products} />
}

export default CategoryPage