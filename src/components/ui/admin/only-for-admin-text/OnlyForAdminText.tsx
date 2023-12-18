import styles from "./styles.module.scss"
import Heading from "@/components/ui/heading/Heading";
import {useRouter} from "next/navigation";

const DELAY = 4000
const OnlyForAdminText = () => {
    const router = useRouter()
    setTimeout(() => {
        router.replace("/")
    }, DELAY)
    return (
        <div
            data-testid={"only-admin-test"}
            className={styles.only_for_admin}
        >
            <Heading >Only for admin page</Heading>
        </div>
    )
}

export default OnlyForAdminText