import {Metadata, NextPage, ResolvingMetadata} from "next";
import CategoryPage from "@/components/screens/category/CategoryPage";
import {IProps} from "@/types/meta.types";
import {CategoryService} from "@/services/category/category.service";

export async function generateMetadata(
    { params, searchParams }: IProps,
): Promise<Metadata> {
    const {slug} = params

    const {data: category} = await CategoryService.getBySlug(slug)

    return {
        title: `${category.name}`,
        description: category.description
    }
}


const Page = ({ params }: { params: { slug: string } }) => {

    return (<CategoryPage slug={params.slug} />)
}

export default Page