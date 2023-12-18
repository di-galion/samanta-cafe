import {FC, PropsWithChildren} from "react";
import styles from "./styles.module.scss"

const PageContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.page_container}>
            {children}
        </div>
    )
}

export default PageContainer