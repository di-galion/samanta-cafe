import styles from "./styles.module.scss"
import {FC, PropsWithChildren} from "react";
import cn from "classnames";

const Heading: FC<PropsWithChildren<{stylesExtention?: {}}>> = ({children, stylesExtention}) => {
    return (
        <h1 style={...stylesExtention} className={styles.heading}>{children}</h1>
    )
}

export default Heading