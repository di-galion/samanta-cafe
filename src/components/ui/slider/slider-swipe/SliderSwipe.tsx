"use client"

import styles from "./styles.module.scss";
import cn from "classnames";
import {Children, cloneElement, createRef, FC, PropsWithChildren, useEffect, useRef, useState} from "react";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import AdditionalProduct from "@/components/ui/slider/slider-swipe/AdditionalProduct";
import {IProduct} from "@/types/product.types";
import {useQuery} from "@tanstack/react-query";
import {ProductService} from "@/services/product/product.service";
import {ISlider} from "@/components/ui/slider/types";
import {current} from "@reduxjs/toolkit";


const SCROLL_LENGTH = 50
const DEFAULT_ELEMENT_WIDTH = 200
const TOUCH_TRANSLATE = 30
const SliderSwipe: FC<PropsWithChildren<ISlider>> = (
    {
        data: products,
        children,
        transformValue = DEFAULT_ELEMENT_WIDTH
    }
) => {
    const [currentTranslate, setCurrentTranslate] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [countTouch, setCountTouch] = useState(0)
    const [itemLength, setItemLength] = useState(0)

    const childrenLength = Children.count(children)

    const ref = createRef()

    useEffect(() => {
        setItemLength(ref.current.getBoundingClientRect().width / +childrenLength)
    }, [ref])

    const leftArrowClickHandler = (transform: number) => {
        setCurrentTranslate((current) => {
            const newTranslate = current + transform
            return Math.min(newTranslate, 0)
        })
    }

    const rightArrowClickHandler = (transform: number) => {
        setCurrentTranslate((current) => {
            const newTranslate = current - transform
            return Math.max(newTranslate, itemLength * (-(childrenLength - 1)))
        })
    }

    const touchStartHandler = (e) => {setTouchStart(e.touches[0].pageX)}

    const touchMoveHandler = (e) => {
        if (touchStart === 0) return
        if (e.touches[0].pageX - touchStart < -SCROLL_LENGTH) {
            console.log("RIGHT")
            rightArrowClickHandler(TOUCH_TRANSLATE)
        }
        if (e.touches[0].pageX - touchStart > SCROLL_LENGTH) {
            console.log("LEFT")
            leftArrowClickHandler(TOUCH_TRANSLATE)
        }
    }

    const touchEndHandler = () => {setTouchStart(0)}


    if (!products ) return
    return (
        <div
            onTouchStart={(e) => touchStartHandler(e)}
            onTouchMove={(e) => touchMoveHandler(e)}
            onTouchEnd={(e) => touchEndHandler()}
            id={"swiper"}
            className={styles.slider} style={{width: "100%"}}
        >
            <BiSolidLeftArrow
                size={40}
                color={"black"}
                className={styles.left}
                onClick={() => leftArrowClickHandler(transformValue)}
            />
            <BiSolidRightArrow
                size={40}
                color={"black"}
                className={styles.right}
                onClick={() => rightArrowClickHandler(transformValue)}
            />
            <div
                ref={ref}
                className={styles.slider__content}
                style={{transform: `translateX(${currentTranslate}px)`}}
            >
                {children}
            </div>
        </div>
    )
}

export default SliderSwipe