"use client"
import styles from "./styles.module.scss"
import {useQuery} from "@tanstack/react-query";
import {OrderService} from "@/services/order/order.service";
import {ProductService} from "@/services/product/product.service";
import ProductListItem from "@/components/screens/dashboard-order/product-list-item/ProductListItem";
import {IProduct} from "@/types/product.types";
import {FC} from "react";
import {ISailCreate} from "@/types/sail.types";
import Loader from "@/components/ui/loader/Loader";
import {GET_ALL_PRODUCTS} from "@/constants/query-keys.constants";
import {useGetProducts} from "@/components/screens/dashboard-order/product-list/useGetProducts.hook";

export interface IProductList {
    setNewSailOnClick: (sail: ISailCreate) => void
    orderId: number
}
const ProductList: FC<IProductList> = ({setNewSailOnClick, orderId}) => {

    const {data, isLoading} = useGetProducts()

    return (
        <div className={styles.product_list_overlay}>
            <ul className={styles.product_list}>
                {!isLoading && data ?
                        data.map((product: IProduct)=> {
                            return (
                                <ProductListItem
                                    key={product.id}
                                    setNewSailOnClick={setNewSailOnClick}
                                    product={product}
                                    orderId={orderId}
                                />
                            )
                        }) :
                    <Loader />
                }
            </ul>
        </div>
    )
}

export default ProductList