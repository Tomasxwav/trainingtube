export type SessionData = {
    access_token: string;
    refresh_token: string;
    authorities: string[];
};

export interface AuthSession {
    refresh_token: string;
    authorities: string[];
    access_token: string;
}

export type UserRole = 'ROLE_ADMIN' | 'ROLE_EMPLOYEE' | 'ROLE_SUPERVISOR';

export type Authority = 
    | UserRole
    | 'canAdminDepartments'
    | 'canAdminEmployees'
    | 'canAdminVideos'
    | 'canComment'
    | 'canFavorites'
    | 'canLike'
    | 'canViewAllMetrics'
    | 'canViewMyInteractions'
    | 'canViewMyMetrics';