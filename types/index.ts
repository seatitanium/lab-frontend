export {};

declare global {
    type Nullable<T> = T | null;
    type OrEmpty<T extends string> = T | '';

    type InstanceStatus = 'Pending' | 'Running' | 'Stopping' | 'Stopped' | 'Starting'
    type DeploymentStatus =
        'Pending'
        | 'Invalid'
        | 'Aborted'
        | 'Running'
        | 'Success'
        | 'Failed'
        | 'Error'
        | 'Timeout'
        | 'Cancelled'
        | 'Stopping'
        | 'Terminated'
        | 'Scheduled';

    type Dict<T> = { [prop: string]: T }

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
        updatedAt: number,
    }

    interface UserExtended extends User {
        skinBase64: string,
        analytics: UserAnalytics,
        uuid: string
    }

    interface UserAnalytics {
        loginCount: number,
        playtime: {
            afk: number,
            total: number
        }
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

    interface GetLastInvokeRes {
        status: DeploymentStatus,
        content: string,
        errorInfo: string,
        startTime: string,
        finishedTime: string
    }

    interface UserStatsLogin {
        id: number,
        actionType: boolean,
        createdAt: string,
        tag: string,
        player: string
    }

    interface UserStatsPlaytime {
        id: number,
        total: number,
        afk: number,
        updatedAt: string,
        tag: string,
        player: string
    }

    interface ServerStatus {
        version: {
            name_raw: string,
            name_clean: string,
            name_html: string,
            protocol: number
        },
        players: {
            max: number,
            online: number,
            sample: {
                id: string,
                name_raw: string,
                name_clean: string,
                name_html: string,
            }[]
        },
        motd: {
            raw: string,
            clean: string,
            html: string,
        },
        favicon: string,
        srv_result: {
            host: string,
            port: number
        }[],
        mod_info: {
            type: string,
            mods: {
                id: string,
                version: string
            }[]
        }
    }

    interface SnapshotOnlinePlayers {
        id: number,
        count: number,
        names: string,
        created_at: string
    }
}