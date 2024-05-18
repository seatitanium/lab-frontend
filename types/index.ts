export {};

declare global {
    type Nullable<T> = T | null;
    
    type VerifyForm = Nullable<{ getValidity: () => boolean[] }>

    type LoginResp = Resp<string>;

    interface Resp<T> {
        code: number,
        msg: string,
        data: T
    }
}