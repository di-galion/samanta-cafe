import {ProductService} from "@/services/product/product.service";
import ProductItem from "@/components/ui/product/product-item/ProductItem";
import {IProduct} from "@/types/product.types";
import {inspect} from "util";
import styles from "./styles.module.scss"
import Heading from "@/components/ui/heading/Heading";
import {FC} from "react";

const Catalog: FC<{heading: string, data: any}> = async ({heading, data}) => {

    return (
        <div className={styles.container}>
            <Heading>{heading}</Heading>
            <div className={styles.catalog}>
                {data && data.map((product: IProduct) => {
                        return <ProductItem key={product.name} product={product}/>
                })}
            </div>
        </div>
    )
}

export default Catalog