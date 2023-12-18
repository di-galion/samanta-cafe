import {Metadata, NextPage} from "next";
import CartPage from "@/components/screens/cart/CartPage";

export const metadata: Metadata = {
    title: "Cart page",
    description: "Some description"
}
const Page: NextPage = () => {
    return <CartPage />
}

export default CartPage