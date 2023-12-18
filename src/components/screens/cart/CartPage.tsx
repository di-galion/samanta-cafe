"use client"
import styles from "./styles.module.scss"
import Heading from "@/components/ui/heading/Heading";
import {FC} from "react";
import {BsArrowLeftSquare} from "react-icons/bs";
import {useCart} from "@/hooks/useCart";
import CartItem from "@/components/screens/cart/cart-item/CartItem";
import cn from "classnames";
import Button from "@/components/ui/button/Button";
import {useRouter} from "next/navigation";


const CartPage: FC = () => {
    const {items, total} = useCart()
    const router = useRouter()
    return (
        <div className={styles.cart}>
            <Heading>Корзина</Heading>
            <div className={styles.exit_icon}>
                <BsArrowLeftSquare size={40} />
                <span className={styles.exit_text}>Вернуться в меню</span>
            </div>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.col_dish}>
                        Блюдо
                    </div>
                    <div className={cn(styles.col, styles.col_price)}>
                        Цена
                    </div>
                    <div className={styles.col}>
                        Количество
                    </div>
                    <div className={styles.col}>
                        Стоимость
                    </div>
                </div>
                {items && items.map((item) => {
                    return (
                        <CartItem key={item.id} product={item} />
                    )
                })}
            </div>
            <div className={styles.footer}>
                <div className={styles.total_sum}>
                    <div className={styles.text}>Сумма заказа:</div>
                    <div className={styles.text}>{total} руб.</div>
                </div>
                <div className={styles.total}>
                    <div className={styles.text}>Итого:</div>
                    <div className={styles.text} data-testid={"total"}>{total} руб.</div>
                </div>
                <p className={styles.delivery_information}>
                    При заказе от 600 руб. с учетом бонусов и скидок доставка бесплатная.
                    <br/>
                    При заказе менее 600 руб. стоимость доставки 130 руб.
                </p>
            </div>
            <div className={styles.button_container}>
                <Button
                    type={'button'}
                    testId={"button-submit-test"}
                    variant={"red"}
                    onClick={() => router.push('/order')}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default CartPage