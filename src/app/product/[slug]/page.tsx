import {Metadata, NextPage, ResolvingMetadata} from "next";
import ProductPage from "@/components/screens/product/ProductPage";
import {ProductService} from "@/services/product/product.service";
import {IProduct} from "@/types/product.types";
import {IProps} from "@/types/meta.types";
import {SEO_TITLE_FOR_FAIVOR} from "@/data";
import {descriptions} from "jest-config";

export async function generateMetadata(
    { params, searchParams }: IProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {slug} = params
    // fetch data
    const {data: product} = await ProductService.getBySlug(slug)

    return {
        title: `${product.title}`,
        description: product.description
    }
}

const Page = async ({ params }: { params: { slug: string } }) => {
    return (
        <ProductPage params={params} />
    )
}

export default Page