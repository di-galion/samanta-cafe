import get from "../a/a";
import {useState} from "react";
import {someFunction} from "@/b/utils";
import B from "@/b/B";
import {useActions} from "@/hooks/useActions";

const A = () => {
    const result = get()
    // const [type, setType] = useState("login")
    const [open, setOpen] = useState(false)
    useActions()
    // const {login, register} = useActions()

    const submit = () => {
        setOpen(true)
        someFunction()
        console.log("SUBMIT")
        // login()
    }

    return (
        <>
            {open && <B />}
            Hello + {result}
            <button data-testid={"button"} onClick={() => submit()}>Submit</button>
        </>
    )
}

export default A