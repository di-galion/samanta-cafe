"use client"
import styles from "./styles.module.scss";
import cn from "classnames";
import {FC, useState} from "react";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import {ISlider} from "@/components/ui/slider/types";

const SliderBg : FC<ISlider>= (
    {
        data
    }
) => {
    const [currentItem, setCurrentItem] = useState(0)

    const leftArrowClickHandler = () => {
        setCurrentItem(currentItem === 0 ? 0 : currentItem - 1)
    }

    const rightArrowClickHandler = () => {
        setCurrentItem(data.length === currentItem + 1 ? currentItem : currentItem + 1)
    }

    return (
        <div className={styles.slider}>
            <BiSolidLeftArrow
                size={40}
                className={styles.left}
                onClick={() => leftArrowClickHandler()}
            />
            <BiSolidRightArrow
                size={40}
                className={styles.right}
                onClick={() => rightArrowClickHandler()}
            />
            <div
                className={styles.slider__content}
            >
                <div
                    className={styles.item}
                    style={{
                        "backgroundImage": `url(${data[currentItem]})`,
                        width: "100%",
                        "transition": "all ease-in-out 150ms 0s"
                    }}
                >
                </div>
            </div>
        </div>
    )
}

export default SliderBg