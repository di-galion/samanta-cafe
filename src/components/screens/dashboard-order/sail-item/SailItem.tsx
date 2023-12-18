"use client"

import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {RxCross1} from "react-icons/rx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SailService} from "@/services/sail/sail.service";
import {BiEditAlt} from "react-icons/bi";
import {GiConfirmed} from "react-icons/gi";
import Button from "@/components/ui/button/Button";
import {ISail} from "@/types/sail.types";
import cn from "classnames";
import {DELETE_SAIL, GET_ALL_ORDERS, UPDATE_SAIL} from "@/constants/query-keys.constants";
import {useUpdateSailMutation} from "@/components/screens/dashboard-order/sail-item/useUpdateSailMutation.hook";
import {useDeleteSailMutation} from "@/components/screens/dashboard-order/sail-item/useDeleteSailMutation.hook";          


const SailItem: FC<{sail: ISail}> = ({sail}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState({})
    // To prevent use Effect during initial render
    const isMounted = useRef(false);

    const mutateUpdate = useUpdateSailMutation(sail, editItem)
    const mutateDelete = useDeleteSailMutation(sail)

    useEffect(() => {
        if(isMounted.current) mutateUpdate()
         else isMounted.current = true
    }, [editItem])


    const onSubmit = () => {
        const form = new FormData(document.getElementById(`form-sail ${sail.id}`))
        if (form.get(sail.name) === null) return
        setEditItem({
            name: form.get(sail.name),
            price: +form.get(sail.price),
            quantity: +form.get(sail.quantity)
        })
    }

    return (
        <div className={styles.sail}>
            {/*<Image />*/}
            <form
                data-testid={"sail-item-test"}
                id={`form-sail ${sail.id}`}
                className={styles.info_section}
            >
                <div className={styles.options_wrapper}>
                    {!isEditing ?
                        <BiEditAlt
                            data-testid={"button-edit-test"}
                            size={23}
                            onClick={() => setIsEditing(!isEditing)}
                        /> :
                        <button
                            data-testid={"button-confirm-test"}
                            type="submit"
                            onClick={() => {
                                setIsEditing(false)
                                onSubmit()
                            }}
                        >
                            <GiConfirmed size={23} />
                        </button>
                    }
                    <RxCross1
                        data-testid={"button-delete-test"}
                        size={20}
                        className={styles.delete}
                        onClick={() => mutateDelete()}
                    />
                </div>

                <div className={styles.input_wrapper}>
                    {[
                        {name: sail.name, label: "Name"},
                        {name: sail.price, label: "Price"},
                        {name: sail.quantity, label: "Quantity"}].map((item) => {
                        return <SailInput key={item.label} name={item.name} label={item.label} isEditing={isEditing}/>
                    })}
                </div>
            </form>
        </div>
    )
}

export default SailItem

export interface ISailInput {
    name: string | number,
    label: string | number,
    isEditing: boolean
}
const SailInput: FC<ISailInput>= ({ name, label, isEditing}) => {
    return (
        <>
            <label htmlFor={String(name)}>{label}:</label>
            <input
                className={cn(styles.input, isEditing ? styles.active_input : "")}
                disabled={!isEditing} name={name.toString()} defaultValue={name}
            />
        </>
    )
}