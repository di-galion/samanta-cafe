"use client"

import styles from "./styles.module.scss"
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import {useProfile} from "@/hooks/useProfile";
import {useRouter} from "next/navigation";
const DashboardPage = () => {
    const {profile} = useProfile()
    const {replace} = useRouter()
    if(!profile?.isAdmin) {
        replace("/")
        return <></>
    }

    return (
        <div className={styles.dashboard_container}>
                <div className={styles.header}>
                    <Button >
                        <Link href={"/dashboard/product"} >Product panel</Link>
                    </Button>
                    <Button >
                        <Link href={"/dashboard/orders"} >Orders panel</Link>
                    </Button>
                    <Button >
                        <Link href={"/dashboard/category"} >Category panel</Link>
                    </Button>
                </div>
        </div>
    )
}

export default DashboardPage