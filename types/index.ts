export {};

declare global {
    type Nullable<T> = T | null;

    type LoginResp = Resp<{
        username: string,
        token: string
    }>;

    type UserResp = Resp<User>

    type Dict<T> = {[prop: string]: T}

    interface Resp<T> {
        code: number,
        msg: string,
        data: T
    }

    interface User {
        id: number
        username: string,
        nickname: string,
        email: string
        mcid: string,
        createdAt: number,
        updatedAt: number
    }
}