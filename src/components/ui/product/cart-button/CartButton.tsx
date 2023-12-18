"use client"
import {FC} from "react";
import styles from "./styles.module.scss"
import Button from "@/components/ui/button/Button";
import {BsCart} from "react-icons/bs";
import {useActions} from "@/hooks/useActions";
import {IProduct} from "@/types/product.types";
import cn from "classnames";
interface IButton {
    variant?: "main" | "sm"
}
const CartButton: FC<{product: IProduct} & IButton> = ({product, variant = "main"}) => {
    const {addItem} = useActions()
    return (
        <button
            type={"button"}
            className={cn(styles.button,
                {
                    "mt-[1rem] px-4 py-2 bg-red text-white bg-white": variant === "main",
                    "py-1 px-2 text-red bg-gray": variant === "sm",
                })}
            onClick={() => addItem(product)}
        >
            <BsCart color={"white"} size={25}/>
        </button>
    )
}

export default CartButton