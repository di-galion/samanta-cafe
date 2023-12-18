"use client"

import styles from "@/components/ui/header/styles.module.scss";
import {useAuth} from "@/hooks/useAuth";
import {BsFillArrowRightSquareFill} from "react-icons/bs";
import Link from "next/link";
import {useActions} from "@/hooks/useActions";
import {useProfile} from "@/hooks/useProfile";

const EnterButton = () => {
    const {profile} = useProfile()
    const {logout} = useActions()

    return (
        <Link
            href={profile?.email ? "/" :'/auth'}
            onClick={() => {
                if (profile?.email) {
                    logout()
                    window.location.reload()
                }
            }}
            className={styles.entrance}
        >
            <BsFillArrowRightSquareFill size={40} />
            <span className={styles.entrance__text}>
                {profile?.email ? "Выйти" : "Войти"}
            </span>
        </Link>
    )
}

export default EnterButton