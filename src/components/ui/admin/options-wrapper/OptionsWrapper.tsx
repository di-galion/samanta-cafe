import styles from "./styles.module.scss"
import Select from "@/components/ui/select/Select";
import {EnumOrderStatus} from "@/components/screens/dashboard-order/orders-catalog-item/types/types";
import {BiEditAlt} from "react-icons/bi";
import {GiConfirmed} from "react-icons/gi";
import {FC, PropsWithChildren} from "react";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

export interface IOptionsWrapper {
    setIsEditing: (state: boolean) => void,
    onConfirmClick: (state: boolean) => void,
    isEditing: boolean,
}

const OptionsWrapper: FC<PropsWithChildren<IOptionsWrapper>> = (
    {
        setIsEditing,
        onConfirmClick,
        children,
        isEditing,
    }) => {
    return (
        <div className={styles.options_wrapper}>
            <div className={styles.select}>
                {children}
            </div>
            {!isEditing ?
                <BiEditAlt
                    data-testid={"button-edit-options-test"}
                    size={30}
                    onClick={() => setIsEditing(true)}
                /> :
                <button
                    data-testid={"button-confirm-options-test"}
                    type={"button"}
                    onClick={() => {
                        onConfirmClick(true)
                    }}
                >
                    <GiConfirmed size={30} />
                </button>
            }
        </div>
    )
}

export default OptionsWrapper