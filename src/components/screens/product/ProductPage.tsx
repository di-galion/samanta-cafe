import {FC} from "react";
import {ProductService} from "@/services/product/product.service";
import styles from "./styles.module.scss"
import Image from "next/image";
import RatioInput from "@/components/ui/product/ratio-input/RatioInput";
import Link from "next/link";
import SliderSwipe from "@/components/ui/slider/slider-swipe/SliderSwipe";
import AdditionalProduct from "@/components/ui/slider/slider-swipe/AdditionalProduct";


const ProductPage: FC<{params: { slug: string }}> =  async ({ params  }) => {

    console.log("PARAMS", params)
    const {data, config} = await ProductService.getBySlug(params.slug)

    // GET SIMILAR
    const {data: products} =  await ProductService.getAll({})

    return (
        <div className={styles.product_page}>
            <div className={styles.container}>
                <Link
                    href={{pathname: `/product/${params.slug}`}}
                    className={styles.image_block}
                >
                    <Image width={500} height={500} src={data.images[0]} alt={"picture"} />
                </Link>
                <div className={styles.information}>
                    <h1 className={styles.heading}>{data.name}</h1>
                    <div className={styles.description}>{data.description}</div>
                    <div className={styles.ratio_container}>
                        <RatioInput >
                            <div>
                                Пышное тесто
                            </div>
                            <div>
                                Тонкое тесто
                            </div>
                        </RatioInput>

                        <RatioInput >
                            <div>
                                25см
                            </div>
                            <div>
                                30см
                            </div>
                            <div>
                                35см
                            </div>
                        </RatioInput>
                    </div>
                </div>
            </div>
            <div className={styles.additional}>
                <h3 className={styles.text}>Дополгнения:</h3>
                    <SliderSwipe
                        transformValue={200}
                        itemStylesExtention={{width: "200px"}}
                        data={products}
                    >
                        {!!products && products.map((product) => {
                            return (
                                <AdditionalProduct testId={"product-item-test"} key={product.id} product={product} />
                            )
                        })}
                    </SliderSwipe>

            </div>
        </div>
    )
}

export default ProductPage