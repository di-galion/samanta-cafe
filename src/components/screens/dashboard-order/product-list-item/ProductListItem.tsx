import styles from "./styles.module.scss"
import {FC} from "react";
import {IProduct} from "@/types/product.types";
import Image from "next/image";
import {ISailCreate} from "@/types/sail.types";

const ProductListItem: FC<{product: IProduct, setNewSailOnClick: (sail: any) => void, orderId: number}> = (
    {
        product,
        setNewSailOnClick,
        orderId
    }) => {
    return (
        <li
            data-testid={"product-list-item-test"}
            onClick={() => setNewSailOnClick(
                {
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    productId: product.id,
                    orderId: orderId
                })}
            className={styles.product_item}
        >
            <Image
                src={product.images[0]}
                height={50}
                width={50}
                alt={"picture"}
            />
            <div className={styles.info_container}>
                <div className={styles.text}>
                    {product.name}
                </div>
                <div className={styles.description}>
                    {product.description}
                </div>
            </div>
        </li>
    )
}

export default ProductListItem