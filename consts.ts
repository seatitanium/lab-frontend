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

export const TermBGColors: Dict<string> = {
    '7': 'rgb(242,150,0)',
    '8': 'rgb(187,10,196)',
    '9': 'rgb(64,33,15)',
    '10': 'rgb(255,133,133)',
    '11': 'rgb(158,158,158)',
    '12': 'rgb(0,198,151)',
    '13': 'rgb(243, 209, 61)'
}

export const TermFGWhite = ['7', '8', '9', '10', '11', '12']

export const GlobalRegex = {
    mcid: /^[a-zA-Z0-9_]{2,16}$/,
    nickname: /^[\u4E00-\u9FFFA-Za-z0-9_]{3,15}$/,
    username:  /^[A-Za-z0-9_]{3,20}$/,
    email: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
    password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,20})\S$/
}

export const COSEndpoint = "https://d.seati.cc"