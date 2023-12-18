import Heading from "@/components/ui/heading/Heading";
import CategoryCatalog from "@/components/screens/dashboard-category/category-catalog/CategoryCatalog";
import {useProfile} from "@/hooks/useProfile";
import {useRouter} from "next/navigation";

const DashboardCategory = () => {
    const {profile} = useProfile()
    const {replace} = useRouter()
    if(!profile?.isAdmin) {
        replace("/")
        return <></>
    }
    return (
        <>
            <Heading >Category</Heading>
            <CategoryCatalog />
        </>
    )
}

export default DashboardCategory