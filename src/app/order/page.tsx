import OrderPage from "@/components/screens/order/OrderPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Order',
    description: "Some description"
}
const Page = () => {
    return (
        <OrderPage />
    )
}

export default Page