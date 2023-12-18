"use client"
import styles from "./styles.module.scss"
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import Link from "next/link";
import {convertToMenuItems} from "@/components/ui/menu/convert-to-menu-items";
import cn from "classnames"
import Menu from "@/components/ui/menu/Menu";
import {Dispatch, FC, SetStateAction} from "react";

const Sidebar: FC<{setIsOpen: Dispatch<SetStateAction<boolean>>}> = ({setIsOpen} ) => {

    return (
        <div
            data-testid={"sidebar-test"}
            onClick={() => setIsOpen(false)}
            className={cn(styles.layout, styles.active)}
        >
            <aside  className={cn(styles.menu)}>
                <Menu />
            </aside>
        </div>
    )
}

export default Sidebar