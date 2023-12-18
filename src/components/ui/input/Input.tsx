import styles from "./styles.module.scss"
import {forwardRef} from "react";
import {IInput} from "./input.interface";
import cn from "classnames";

const Input= forwardRef<HTMLInputElement, IInput> (
    ({
         placeholder,
         error,
         Icon,
         className,
         type = "text",
        label,
        testId,
         ...rest
     },
     ref
    ) => {

        return (
            <div className={cn(styles.input_form, {
                [styles.input_error]: true
            })} >
                <label >
                    {label && (
                        <span
                            className={cn(styles.label, {
                                [styles.label_error]: error
                            })}
                        >
                        {Icon && <Icon className={""} />}
                            {label}
                    </span>
                    )}

                    <input
                        data-testid={testId}
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        className={cn(styles.input, {
                            [styles.input_error]: error
                        })}
                        {...rest}
                    />
                </label>
            </div>
        )
    }
)
export default Input