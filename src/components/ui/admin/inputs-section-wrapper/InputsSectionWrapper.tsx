import styles from "./styles.module.scss"
import cn from "classnames";
import {FC, PropsWithChildren, useEffect, useState} from "react";

export interface IInputsSectionWrapper {
    isEditing: boolean,
    arrayOfValue: string[],
    arrayOfHead: string[],
}

const InputsSectionWrapper: FC<PropsWithChildren<IInputsSectionWrapper>> = (
    {
        children,
        isEditing,
        arrayOfValue,
        arrayOfHead,
    }
) => {

    return (
        <div className={styles.inputs_section}>
            {arrayOfHead.map((head, index) => {
                return (
                    <div className={styles.row} key={index}>
                        <p>{head}</p>
                        <input
                            data-testid={`input-${arrayOfValue[index]}-section-test`}
                            id={head}
                            name={head}
                            className={cn(styles.input, isEditing ? styles.active_input : '')}
                            disabled={!isEditing}
                            defaultValue={arrayOfValue[index]}
                        />
                    </div>
                )
            })}
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default InputsSectionWrapper