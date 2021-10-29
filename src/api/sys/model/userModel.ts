/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}


/**
 * @description: Get SysUser
 */
export interface SysUser {
  id: string;
  createTime: string;
  createUser: string;
  deleted: number;
  tenantId: string;
  updateTime: string;
  updateUser: string;
  version: number;
  username: string;
  name: string;
  password: string;
  salt?: string;
  phone: string;
  email: string;
  avatar: string;
  socialUid?: string;
  accessToken?: string;
  expiresIn?: string;
  lockFlag: string;
}


/*User_info*/
export interface SecurityUserModel {
  id: string;
  phone: string;
  avatar: string;
  tenantId: string;
  username: string;
  password: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: string[];
  roles: string[];
}



/**
 * @description: Get user information return value
 */

export interface UserInfoModel {
  sysUser: SysUser;
  username?: string;
  permissions: string[];
  roles?: string[];
}
export interface UserDtoModel {
  sysUser: SysUser;
  role: number[];
  newpassword1?: string;
}