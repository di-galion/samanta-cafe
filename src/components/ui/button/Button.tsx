import styles from "./styles.module.scss"
import {ButtonHTMLAttributes, FC, PropsWithChildren} from "react";
import cn from "classnames";

interface IButton {
    variant?: "main" | "toggle" | "red"
    testId?: string
}
const Button: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & IButton>> = (
    {
        children,
        testId,
        type,
        onClick,
        variant = "main"
    }) => {
    return (

            <button
                data-testid={testId}
                type={type}
                onClick={onClick}
                className={styles[variant] }
            >
                {children}
            </button>

    )
}

export default Button 