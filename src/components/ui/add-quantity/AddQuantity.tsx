"use client"
import styles from "./styles.module.scss"
import {ICart} from "@/store/cart/cart.types";
import {FC} from "react";
import {BsArrowLeftSquareFill, BsArrowRightSquareFill} from "react-icons/bs";
import {useActions} from "@/hooks/useActions";

const AddQuantity: FC<{product: ICart}> = ({product}) => {
    const {riseQuantity, decreaseQuantity, removeAll} = useActions()
    const isLess970px = window.innerWidth <= 970
    const widthOfIcons =  window.innerWidth <= 970 ? 23 : 30
    return (
        <div className={styles.quantity}>
            <BsArrowLeftSquareFill
                size={widthOfIcons}
                color={"white"}
                className={styles.arrow}
                onClick={() => decreaseQuantity(product)}
            />
            <div className={styles.text}>{product.quantity}</div>
            <BsArrowRightSquareFill
                size={widthOfIcons}
                color={"white"}
                className={styles.arrow}
                onClick={() => riseQuantity(product)}
            />
        </div>
    )
}

export default AddQuantity