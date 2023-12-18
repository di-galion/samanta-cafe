"use client"

import Heading from "@/components/ui/heading/Heading";
import OrdersCatalog from "@/components/screens/dashboard-order/orders-catalog/OrdersCatalog";
import {useProfile} from "@/hooks/useProfile";
import {useRouter} from "next/navigation";
import OnlyForAdminText from "@/components/ui/admin/only-for-admin-text/OnlyForAdminText";
import PageContainer from "@/components/ui/page-container/PageContainer";

const DashboardOrderPage = () => {
    const {profile} = useProfile()
    const {replace} = useRouter()
    if(!profile?.isAdmin) {
        replace("/")
        return <></>
    }
    return (
        <PageContainer>
            <Heading >Orders</Heading>
            <OrdersCatalog />
        </PageContainer>
    )
}

export default DashboardOrderPage