"use client"

import Heading from "@/components/ui/heading/Heading";
import ProductCatalog from "@/components/screens/dashboard-product/product-catalog/ProductCatalog";
import {useRouter} from "next/navigation";
import {useProfile} from "@/hooks/useProfile";

const DashboardProductPage = () => {
    const {profile} = useProfile()
    const {replace} = useRouter()
    if(!profile?.isAdmin) {
        replace("/")
        return <></>
    }
    return (
        <>
            <Heading>Products</Heading>
            <ProductCatalog />
        </>
    )
}

export default DashboardProductPage