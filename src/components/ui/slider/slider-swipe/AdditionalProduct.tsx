import {FC} from "react";
import {IProduct} from "@/types/product.types";
import Image from 'next/image'
import styles from "./styles.module.scss"
import CartButton from "@/components/ui/product/cart-button/CartButton";

const AdditionalProduct: FC<{product: IProduct} & {testId: string}> = ({product, testId}) => {
    if (!product) return
    // console.log("ADDDDDDD:", product)
    return (
        <div data-testid={testId} className={styles.additional}>
            <Image
                width={300}
                height={300}
                className={styles.image}
                src={product?.images[0]}
                alt={"product"}
            />
            <h4 className={styles.heading}>{product.name}</h4>
            <div className={styles.footer}>
                <div className={styles.price}>{product.price} руб.</div>
                <CartButton product={product} />
            </div>
        </div>
    )
}

export default AdditionalProduct