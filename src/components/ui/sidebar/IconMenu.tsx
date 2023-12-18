"use client"
import styles from "@/components/ui/header/styles.module.scss";
import {RxHamburgerMenu} from "react-icons/rx";
import {userSlice} from "@/store/user/user.slice";
import {useState} from "react";
import Sidebar from "@/components/ui/sidebar/Sidebar";



const IconMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={styles.menu}
            >
                <RxHamburgerMenu size={40}/>
            </div>
            {isOpen && <Sidebar setIsOpen={setIsOpen} />}
        </>
    )
}

export default IconMenu