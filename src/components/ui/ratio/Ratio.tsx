import {FC} from "react";
import {IRatio} from "@/components/ui/ratio/ratio.interface";
import {inspect} from "util";
import styles from "./styles.module.scss"
import {EnumDeliveryTime} from "@/components/screens/order/types";

const Ratio :FC<IRatio>= (
    {
        // Name needed to make bounded ratios
        name,
        checked = false,
        content,
        testId= "",
        onClick = () => {},
    }) => {
    return (
        <label
            className={styles.ratio}
            onClick={() => onClick(content)}
            data-testid={testId}
        >
            <input data-testid={"ratio-input-test"} defaultChecked={checked} className={styles.real_ratio} type={'radio'} name={name} />
            <span className={styles.custom_ratio}></span>
            {content}
        </label>
    )
}

export default Ratio