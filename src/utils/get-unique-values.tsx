import {IProduct} from "@/types/product.types";
import {ICategory} from "@/types/category.types";

export const getUniqueValues = (prev: IProduct | ICategory, now: Partial<IProduct> | Partial<ICategory>) => {
    const result = {}

    // console.log("OBJECTS", prev, now)

    for (let propName in prev) {
        let isEqual = false
        // console.log("PROP_NAME", propName)

        const prevValue = prev[propName]
        const nowValue = now[propName]

        // console.log("VALUES", prevValue, nowValue)

        if (Array.isArray(prevValue) && Array.isArray(nowValue)) {

            for (let i = 0; i < prevValue.length; i++) {
                if (prevValue[i] === nowValue[i]) isEqual = true
            }
        }
        else if (nowValue === prevValue || !nowValue) isEqual = true
        // console.log("IS_EQUAL", isEqual)
        if (!isEqual) result[propName] = nowValue
    }

    return result
}