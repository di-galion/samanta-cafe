import styles from "./styles.module.scss";
import {FC, PropsWithChildren} from "react";

const FilterWrapper: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.filter_wrapper}>
            {children}
        </div>
    )
}

export default FilterWrapper