export {};

declare global {
    type Nullable<T> = T | null;
    type OrEmpty<T extends string> = Either<T, ''>;
    type Either<K, T> = K | T;

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
        mcidVerified: boolean,
    }

    interface UserExtended extends User {
        skinBase64: string,
        analytics: UserAnalytics,
        uuid: string,
        mcidExist: boolean,
        hasBoundValidMCID: boolean,
        loading: boolean,
        playtimeTotalMillis: number,
        playtimeAfkMillis: number
    }

    interface UserAnalytics {
        loginCount: number,
        loginRecords: LoginRecord[],
        playtime: {
            afk: number,
            total: number
        },
        firstLoginRecord: LoginRecord,
        termsInvolved: Term[]
    }

    interface LoginRes {
        username: string,
        token: string
    }

    interface DescribeInstanceRes {
        local: {
            instance_id: string,
            instance_type: string,
            region_id: string,
            zone_id: string
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

    interface LoginRecord {
        id: number,
        actionType: boolean,
        createdAt: string,
        tag: string,
        player: string
    }

    interface PlaytimeRecord {
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

    interface LoginRecordBoard extends Dict<any> {
        player: string,
        count: number,
        lastCreatedAt: string
    }

    interface PlaytimeBoard extends Dict<any> {
        player: string,
        timeTotal: number,
        timeAfk: number,
        timeValid?: number
    }

    interface Term {
        tag: string,
        version: string,
        theme: string,
        themeAlt?: string,
        packVersion?: string,
        type: string,
        author: string,
        link?: string,
        startAt: string,
        endAt?: string,
        created: string,
        image?: string,
        downloads: {
            world: TermDownloadItem,
            pack: TermDownloadItem,
            mods: TermDownloadItem,
        }
    }

    interface ServerPlayer {
        uuid: string,
        name: string
    }

    interface TermDownloadItem {
        name: string,
        size: string
    }

    interface TermSet {
        tag: string,
        forge: string,
        ram: string,
        java: string,
        description: string
    }
}