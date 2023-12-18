import styles from "./styles.module.scss";
import {ChangeEvent, FC, PropsWithChildren} from "react";


const EditFormWrapper: FC<PropsWithChildren> = (
    {
        children
    }
) => {
    return (
        <li className={styles.item}>
                {children}
        </li>
    )
}

export default EditFormWrapper