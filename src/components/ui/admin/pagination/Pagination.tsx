import styles from "./styles.module.scss";
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from "react-icons/bs";
import {FC} from "react";

export interface IPagination {
    page: number,
    onClickLeft: () => void,
    onClickRight: () => void
 }

const Pagination: FC<IPagination> = (
    {
        page,
        onClickLeft,
        onClickRight
    }
) => {
    return (
        <div className={styles.pagination}>
            <BsFillArrowLeftSquareFill
                size={30}
                onClick={() => onClickLeft()}
            />
            {page}
            <BsFillArrowRightSquareFill
                size={30}
                onClick={() => onClickRight()}
            />
        </div>
    )
}

export default Pagination