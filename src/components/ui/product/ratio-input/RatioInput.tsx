"use client"
import styles from "./styles.module.scss";
import {
    AllHTMLAttributes,
    Children,
    cloneElement,
    FC,
    PropsWithChildren,
    StyleHTMLAttributes,
    useEffect,
    useState
} from "react";
import {IRatio} from "@/components/ui/product/ratio-input/types";
import cn from "classnames";

const RatioInput: FC<PropsWithChildren<IRatio>> = (
    {
        currentInput = 1,
        children,
        variant = 'main' ,
        width = "lg",
        onClick = (value: string): void => {},
        testId="ratio-input-test"
    }) => {

    const [transform, setTransform] = useState(currentInput === 1 ? 0 : (currentInput-1) * 100)
    const [ratioElements, setRatioElements] = useState<any>([])
    const numberOfInputs = Children.count(children)

    useEffect(() => {
        setRatioElements(() => {
            return Children.map(children, (child, index) => {
                return cloneElement(child, {
                    className: styles.text,
                    "data-input-id": index + 1,
                    "data-value": child?.props?.children
                })
            })
        })
    }, [])

    return (
        <div
            data-testid={testId}
            className={cn(styles.size, styles[variant], styles[width])}
            onClick={(e) => {
                const id = e.target.getAttribute("data-input-id")
                const value = e.target.getAttribute("data-value")
                ////
                // console.log("TARGET",e.target.classList)
                // e.target.classList.add(styles.no_checked);
                // ratioElements.forEach((el) => {
                //     console.log(el.props.className)
                //     // el.classList.remove(styles.no_checked)
                // })
                ///
                if (!id) return
                setTransform(id === 1 ? 0 : (id - 1) * 100)
                onClick(value)

            }}
        >
            {ratioElements}
            <div
                style={{
                    transform: `translate(${transform}%)`,
                    width: `${100/numberOfInputs}%`
                 }}
                className={styles.overlay}>

            </div>
        </div>
    )
}

export default RatioInput