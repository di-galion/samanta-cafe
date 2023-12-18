"use client"
import {ButtonHTMLAttributes, FC, PropsWithChildren, useState} from "react";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../ui/input/Input"
import styles from "./styles..module.scss"
import Button from "@/components/ui/button/Button";
import {AuthService} from "@/services/auth/auth.service";
import {IRegisterRequest} from "@/types/auth.types";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {log} from "util";
import {AxiosResponse} from "axios";
import {useQueryClient} from "@tanstack/react-query";
import {GET_PROFILE} from "@/constants/query-keys.constants";
import {QueryClient} from "@tanstack/query-core";
// import Image from "next/image";
import React from 'react'

 import { ReactInternetSpeedMeter } from 'react-internet-meter'



const Auth: FC = () => {
    const dispatch = useDispatch()
    const {register, login} = useActions()
    const [type, setType] = useState("login")
    const router = useRouter()

    const [speed, setSpeed] = useState(0)

    const {
        register: formRegister,
        handleSubmit,
        watch,
        formState: {errors},
        reset
    } = useForm<IRegisterRequest>({mode: "onSubmit"});

    const queryCash = new QueryClient()

    queryCash.invalidateQueries([GET_PROFILE])
    const onSubmit: SubmitHandler<IRegisterRequest> = async (data) => {
        let response
        if (type === "login")  response = await login(data)
        else   response =  await register(data)
        if (response.type === "auth/login/fulfilled") {
            router.replace("/")
        } else {
            reset()
        }
    }
    //////
    let imageAddr = "https://images.unsplash.com/photo-1696422221633-1ae8f741b2cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
        // "https://upload.wikimedia.org/wikipedia/commons/3/3a/Bloemen_van_adderwortel_%28Persicaria_bistorta%2C_synoniem%2C_Polygonum_bistorta%29_06-06-2021._%28d.j.b%29.jpg";

    // const  imageAddr = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Snake_River_%285mb%29.jpg/2560px-Snake_River_%285mb%29.jpg"
        // "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Snake_River_%285mb%29.jpg/1024px-Snake_River_%285mb%29.jpg"
        //"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Snake_River_%285mb%29.jpg/1600px-Snake_River_%285mb%29.jpg"
        // "https://avatars.mds.yandex.net/i?id=fb75183e912ce368be6a1d7ca6cd710f2d15fbc2-9107065-images-thumbs&n=13";
    const  downloadSize = 15800; //bytes

    // https://img.freepik.com/premium-photo/river-in-winter-during-sunset-in-high-resolution-beautiful-wallpaper-on-the-theme-of-nature-snow-frost-season-forest-trees-picturesque-view-picture-sky-volumetric-clouds-3d-illustrationai_579956-3282.jpg
    function ShowProgressMessage(msg) {
        if (console) {
            if (typeof msg == "string") {
                console.log(msg);
            } else {
                for (var i = 0; i < msg.length; i++) {
                    console.log(msg[i]);
                }
            }
        }

        const oProgress = document.getElementById("progress");
        if (oProgress) {
            let actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
            oProgress.innerHTML = actualHTML;
        }
    }

    function InitiateSpeedDetection() {
        ShowProgressMessage("Loading the image, please wait...");
        window.setTimeout(MeasureConnectionSpeed, 1);
    }

    if (window.addEventListener) {
        window.addEventListener('load', InitiateSpeedDetection, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', InitiateSpeedDetection);
    }

    function MeasureConnectionSpeed() {
        let startTime, endTime;
        let download = new Image();
        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }

        download.onerror = function (err, msg) {
            ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        let cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function showResults() {
            let duration = (endTime - startTime) / 1000;
            console.log("END_TIME", endTime,"START_TIME", startTime, duration)
            let bitsLoaded = downloadSize * 8;
            let speedBps = (bitsLoaded / duration).toFixed(2);
            let speedKbps = (speedBps / 1024).toFixed(2);
            let speedMbps = (speedKbps / 1024).toFixed(2);
            ShowProgressMessage([
                "Your connection speed is:",
                speedBps + " bps",
                speedKbps + " kbps",
                speedMbps + " Mbps"
            ]);
        }

    }

        //////
    return (

        <section className={styles.auth}>
            <Button onClick={() => InitiateSpeedDetection()}>
                Click
            </Button>
            <ReactInternetSpeedMeter
                txtSubHeading="Internet is too slow"
                outputType="module"
                customClassName={null}
                txtMainHeading="Opps..."
                pingInterval={4000} // milliseconds
                thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte"
                threshold={100}
                imageUrl="https://images.unsplash.com/photo-1696422221633-1ae8f741b2cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
                downloadSize="15800"  //bytes
                // callbackFunctionOnNetworkDown={(speed)=>console.log(`Internet speed is down ${speed}`)}
                callbackFunctionOnNetworkTest={(speed: any)=>setSpeed(speed)}
            />
            <h1>{speed}</h1>
            <h1 className={styles.heading}>Вход на сайт</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <Input
                    testId={"email-input-test"}
                    {...formRegister(
                        "email",
                        {
                            required: "Email is required...",
                            // pattern: /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/
                        }
                    )}
                    label={errors.email?.message || "Email"}
                    error={errors.email?.message}
                    placeholder={"Email"}
                    type={"email"}
                />
                {type === "register" &&
                    <Input
                        testId={"name-input-test"}
                        {...formRegister(
                            "name",
                            {
                                required: "Enter your name"
                            }
                        )}
                        label={errors.name?.message || "Name"}
                        error={errors.name?.message}
                        placeholder={"Name"}
                        type={"text"}
                    />
                }
                <Input
                    testId={"password-input-test"}
                    {...formRegister(
                        "password",
                        {
                            required: "Password should contain at least 6 symbols",
                            min: 6,
                            max: 50
                        }
                    )}
                    error={errors.password?.message}
                    label={errors.password?.message ||  "Password" }
                    placeholder={"Password"}
                    type={"password"}
                />
                <div className={styles.buttons_container}>
                    <Button testId={"button-test"} type={'submit'}>Submit</Button>
                    <Button
                        testId={"button-toggle-test"}
                        onClick={() => {setType(type === "login" ? "register" : "login")}}
                        type={"button"}
                        variant={"toggle"}
                    >
                        {type === "login" ? "register" : "login"}
                    </Button>
                </div>
            </form>
        </section>

    )
}

export default Auth