"use client"

import {BsCart} from "react-icons/bs";
import styles from "../styles.module.scss"
import {useCart} from "@/hooks/useCart";
import Link from "next/link";

const IconCart = () => {
    const {items} = useCart()
    return (
        <Link href={"/cart"}>
            {items && (
                <div className={styles.cart}>
                    <div className={styles.cart_quantity}>{items.length}</div>
                    <BsCart  size={40}/>
                </div>
            )}
        </Link>
    )
}
export default IconCart