export const BackendCodes = {
    OK: 0,
    ParamError: 1101,
    NotFound: 1102,
    TargetNotExist: 1103,
    AuthenticationFailed: 1201,
    Forbidden: 1202,
    InvalidToken: 1203,
    BadToken: 1204,
    DuplicatedUserRegistration: 1205,
    DuplicatedMCIDBinding: 1206,
    ServerError: 1301,
    DatabaseError: 1302,
    AliyunError: 1303,
    OperationNotApplied: 1304
}

export const SupportEmail = "i@seati.cc";

export const ServerWebSocketURL = "ws://localhost:23322";

export const PeriodTag = "st13";

export const LocalStorageAuthTokenKey = 'tisea-auth-token';

export const LocalStorageAuthUsernameKey = 'tisea-auth-username';

export const TermColors: Dict<string> = {
    '13': 'rgb(243, 209, 61)'
}