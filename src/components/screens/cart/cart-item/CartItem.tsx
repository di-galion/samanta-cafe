"use client"
import {FC} from "react";
import {ICart} from "@/store/cart/cart.types";
import {inspect} from "util";
import styles from "./styles.module.scss"
import Image from "next/image";
import AddQuantity from "@/components/ui/add-quantity/AddQuantity";
import {RxCross1} from "react-icons/rx";
import {useActions} from "@/hooks/useActions";
import cn from "classnames";
import Link from "next/link";
import {screen} from "@testing-library/react";

const CartItem: FC<{product: ICart}> = ({product}) => {
    const {removeItem} = useActions()
    return (
        <div className={styles.row}  data-testid={"cart-item"}>
            <div className={styles.col_dish}>
                <Link
                    href={`product/${product.slug}`}
                    className={styles.block}
                >
                    <Image className={styles.image} width={120} height={100} src={product.images[0]} alt={'picture'}/>
                    <div className={styles.text_container}>
                        <div className={styles.text}>
                            {product.name}
                        </div>
                        <div className={styles.description}>
                            Lorem ipsum dolor sit.
                        </div>
                    </div>
                </Link>
            </div>
            <div className={cn(styles.col, styles.col_price)}>
                <div className={styles.text}>
                    {product.price} руб.
                </div>
            </div>
            <div className={cn(styles.col, styles.col_quantity)}>
                <div className={styles.text}>
                    <AddQuantity product={product} />
                </div>
            </div>
            <div className={cn(styles.col, styles.col_sum)}>
                <div className={styles.text}>
                    {product.quantity * +product.price} руб.
                </div>
            </div>
            <RxCross1
                onClick={() => removeItem(product)}
                className={styles.delete}
                color={"red"}
                size={20}
            />
        </div>
    )
}

export default CartItem