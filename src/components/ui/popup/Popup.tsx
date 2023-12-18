"use client"
import {ChangeEvent, Dispatch, FC, SetStateAction, useState} from "react";
import styles from "./styles.module.scss"
import {POPUP_ID} from "@/constants/popup.constants";
import {createPortal} from "react-dom";
import {BiCross} from "react-icons/bi";
import Button from "@/components/ui/button/Button";

export interface IPopup {
    header?: string
    content?: string
    setIsOpen: Dispatch<SetStateAction<boolean>>
    onClickAgreeHandler?: (e: ChangeEvent<HTMLFormElement>) => void
    onClickDisagreeHandler?: () => void
    form?: HTMLFormElement
}
const Popup: FC<IPopup> = (
    {
        header = "Attention",
        content = "",
        setIsOpen,
        onClickAgreeHandler = () => {},
        onClickDisagreeHandler = () => {},
    }
) => {
    const container: Element | DocumentFragment | null = document.getElementsByTagName("body")[0]

    if (!container) return <></>

    return createPortal(
        <div
            data-testid={"popup-test"}
            className={styles.over_popup}
            onClick={() => {
                onClickDisagreeHandler()
                setIsOpen(false)
            }}
        >
            <div className={styles.popup}>
                <BiCross
                    data-testid={"popup-cross-test"}
                    className={styles.cross}
                    size={20}
                    color={"black"}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(false)
                        onClickDisagreeHandler()
                    }}
                />
                <div className={styles.header}>
                    {header}
                </div>
                <div className={styles.body}>
                    {content}
                </div>
                <div className={styles.footer}>
                    <Button
                        testId={"button-disagree-test"}
                        onClick={(e) => {
                            e.stopPropagation()
                            onClickDisagreeHandler()
                            setIsOpen(false)
                        }}
                    >
                        No
                    </Button>
                    <Button
                        testId={"button-agree-test"}
                        type={"submit"}
                        onClick={(e) => {
                            e.stopPropagation()
                            onClickAgreeHandler()
                            setIsOpen(false)
                        }}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </div>,
        container
    )
}

export default Popup