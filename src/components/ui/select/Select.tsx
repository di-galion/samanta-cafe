"use client"
import styles from "./styles.module.scss"
import {
    ChangeEvent,
    Children,
    cloneElement,
    FC,
    MouseEventHandler,
    PropsWithChildren, SetStateAction,
    useEffect,
    useState
} from "react";
import button from "@/components/ui/button/Button";
import cn from "classnames";
import {ISelect} from "@/components/ui/select/types";

const Select: FC<PropsWithChildren & ISelect> = (
    {
        children,
        onClick = () => {},
        disabled = false,
        testId,
        currentValue = children ? Children.toArray(children)[0]?.props?.children : ""
    }) => {
    const [selectedItem, setSelectedItem] = useState(currentValue)
    const [items, setItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(!children) return
        setItems(() => {
            return Children.map(children, child => {
                return cloneElement(child, {
                    className: styles.item,
                    "data-value": child?.props?.children
                })
            })
        })
    }, [])

    return (
        <div data-testod={testId} className={styles.select_wrapper}>
            <button
                data-testid={"select-button-test"}
                type={"button"}
                onClick={() => {
                    if (disabled) return
                    setIsOpen(!isOpen)
                }}
                className={styles.select}
            >
                {selectedItem}
            </button>
            <ul
                data-testid={"select-list-test"}
                onClick={(e: ChangeEvent<HTMLFormElement>) => {
                    const value = e.target.getAttribute("data-value")
                    if (value) {
                        setSelectedItem(value)
                        setIsOpen(!isOpen)
                        onClick(value)
                    }
                }}
                className={cn(styles.list_hidden, isOpen ? styles.list : '')}
            >
                { ...items }
            </ul>
            <div className={styles.overflow}></div>
        </div>
    )
}

export default Select