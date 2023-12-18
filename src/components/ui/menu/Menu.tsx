"use client"

import styles from "./styles.module.scss";
import {convertToMenuItems} from "@/components/ui/menu/convert-to-menu-items";
import Link from "next/link";
import {useGetCategories} from "@/hooks/queries/useGetCategories";
import cn from "classnames";
import {IMenuItem} from "@/components/ui/sidebar/types";
import {BsThreeDots} from "react-icons/bs";
import {FC, useEffect, useState} from "react";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {CategoryService} from "@/services/category/category.service";
import {router} from "next/client";
import {usePathname} from "next/navigation";
import {useProfile} from "@/hooks/useProfile";
import {DASHBOARD_URL} from "@/constants/url.constants";
import {FaC} from "react-icons/fa6";
import {ICategory} from "@/types/category.types";
import {NO_FILTER} from "@/constants/order-status.constants";
import {PER_PAGE} from "@/constants/page.contants";


export const MAX_CATEGORIES_ON_HEADER = 6
export const MAX_CATEGORIES_ON_SIDEBAR = 20


const Menu = ({
    fromSidebar = true,
              }) => {

    const {data, isLoading} = useGetCategories({})
    const {profile} = useProfile()
    const [isOpen, setIsOpen] = useState(false)

    // console.log("PROFILE",isLoading)
    return (
        <ul
            className={fromSidebar ? '' : styles.menu__list}
            style={{width: "100%"}}
        >
            {!isLoading && data && convertToMenuItems(data)
                .slice(0, !fromSidebar ? MAX_CATEGORIES_ON_HEADER : MAX_CATEGORIES_ON_SIDEBAR)
                .map(item => {
                return (
                    <CategoryItem  key={item.label} setIsOpen={setIsOpen} item={item} />
                )
            })}

            {
                profile?.isAdmin && !fromSidebar &&
                <DashboardButton setIsOpen={setIsOpen} />
            }

            {/*NOT from sidebar*/}
            {!fromSidebar &&
                <BsThreeDots
                    data-testid={"button-dots-test"}
                    className={styles.dots_icon}
                    size={28}
                    onClick={() => setIsOpen(!isOpen)}
                />
            }
            {!fromSidebar  && data?.length > MAX_CATEGORIES_ON_HEADER && isOpen && (
                <div className={styles.menu__submenu}>
                    {convertToMenuItems(data)
                        .slice(MAX_CATEGORIES_ON_HEADER, MAX_CATEGORIES_ON_SIDEBAR)
                        .map(item => {
                        return (
                            <CategoryItem  key={item.label} setIsOpen={setIsOpen} item={item} />
                        )
                    })}
                    {
                        profile?.isAdmin &&
                        <DashboardButton setIsOpen={setIsOpen} />
                    }
                </div>
            )}

        </ul>
    )
}

export default Menu

const DashboardButton: FC<{setIsOpen: (value: boolean) => void}> = ({setIsOpen}) => {
    return (
        <Link
            href={DASHBOARD_URL}
        >
            <li
                data-testid={"button-admin-test"}
                onClick={() => setIsOpen(false)}
            >
                    To dashboard
            </li>
        </Link>
    )
}

const CategoryItem: FC<{setIsOpen: (value: boolean) => void, item: IMenuItem}> = (
    {
        setIsOpen,
        item,
    }) => {
    const pathname = usePathname()
    return (
        <li
            data-testid={"category-item-test"}
            onClick={() => setIsOpen(false)}
            className={styles.menu__item
            }>
            <Link
                className={pathname === item.href ? styles.menu__link : ''}
                href={item.href}
            >
                {item.label}
            </Link>
        </li>
    )
}