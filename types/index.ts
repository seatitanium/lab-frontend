export {};

declare global {
    type Nullable<T> = T | null;
    type OrEmpty<T extends string> = T | '';

    type InstanceStatus = 'Pending' | 'Running' | 'Stopping' | 'Stopped' | 'Starting'

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

    interface LoginRes {
        username: string,
        token: string
    }

    interface DescribeInstanceRes {
        local: {
            instance_id: string,
            instance_type: string,
            region_id: string
        },
        retrieved: {
            creation_time: string,
            exist: boolean,
            public_ip_address: Nullable<string>,
            status: OrEmpty<InstanceStatus>
        }
    }
}