import styles from "./styles.module.scss";
import Image from "next/image";
import {MdCloudUpload} from "react-icons/md";
import {Dispatch, FC, SetStateAction, useRef, useState} from "react";

export interface IFileLoader {
    image: string | undefined,
    setImage: Dispatch<SetStateAction<string>>,
    disabled: boolean
}
const FileLoader: FC<IFileLoader> = (
    {
        image,
        setImage,
        disabled
    }) => {
    const loader = useRef(null)
    return (
        <div
            data-testid={"image-loader-test"}
            className={styles.file_wrapper}
            onClick={() => {
                if(loader.current) loader.current.click()
            }}
        >
            <input
                data-testid={"image-loader-input-test"}
                disabled={!disabled}
                ref={loader}
                id={"file-loader"}
                className={styles.file}
                type={"file"}
                accept={"image/*"}
                onChange={({target: {files}}) => {
                    if (files) files[0] && setImage(URL.createObjectURL(files[0]))
                }}
            />
            {
                image
                    ?
                    <Image src={image} alt={"image"} width={160} height={160} />
                    :
                    <>
                        <MdCloudUpload size={50} color={"yellow"} />
                        <p>Browse files to Upload</p>
                    </>
            }

        </div>

    )
}

export default FileLoader