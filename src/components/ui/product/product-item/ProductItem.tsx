import styles from "./styles.module.scss"
import {FC, PropsWithChildren} from "react";
import Image from "next/image";
import {IProduct} from "@/types/product.types";
import Button from "@/components/ui/button/Button";
import {BsCart} from "react-icons/bs";
import Link from "next/link";
import CartButton from "@/components/ui/product/cart-button/CartButton";
import RatioInput from "@/components/ui/product/ratio-input/RatioInput";

const ProductItem: FC<{product: IProduct}> = ({product}) => {

    return (
        <div className={styles.product}>
                <Link   href={{pathname: `/product/${product.slug}`}}>
                    <div className={styles.image}>
                        <Image src={product.images[0]} width={300} height={300} alt={"picture"} />
                    </div>
                </Link>
                <div className={styles.product__container}>
                    <h3 className={styles.heading}>{product.name}</h3>
                    <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa eaque eius ex haru Commodi explicabo incidunt maxime!</div>
                    <div className={styles.ratio_container}>
                        <RatioInput >
                            <div>Пшеничная</div>
                            <div>Ржаная</div>
                        </RatioInput>
                        <RatioInput >
                            <div>Пышное тесто</div>
                            <div>Тонкое тесто</div>
                        </RatioInput>
                        <RatioInput width={"sm"}>
                            <div>25 см</div>
                            <div>30 см</div>
                            <div>35 см</div>
                        </RatioInput>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.price}>{product.price} руб.</div>
                       <CartButton product={product} />
                    </div>
                </div>
        </div>
    )
}

export default ProductItem