import {IUser} from "@/types/user.types";

export interface IAuthResponse extends ITokens {
    user: IUser
}
export interface ITokens {
    accessToken: string
    refreshToken: string
}


export interface IRegisterRequest {
    email: string
    name: string
    password: string
}

export interface ILoginRequest extends Omit<IRegisterRequest, "name"> {}