import { defHttp } from '/@/utils/http/axios';

import {

  RolePageParams,

  RoleParams,

  RolePageListGetResultModel,

} from './model/systemModel';
import { AnyARecord } from 'node:dns';
enum Api {
  GetRoleRouter = '/upms/role',
  GetRolePage = '/upms/role/page',
  GetRoleList = '/upms/role/list',
  GetTopRoleList = '/upms/role',
  GetRoleTree = '/upms/role/tree',
  Role = '/upms/role',
  RolePath = '/upms/role/',
  GetRoleParents = '/upms/role/parents',
  setRoleStatus = '/upms/role/setStatus',
  PermissionUpd = '/upms/role/menu',
  RoleTree = '/upms/menu/tree/',
  setRoleAuth = '/upms/role/updateRolePermission',
}

/**
 * @description: Get user role based on id
 */


export const getRoleParents = () => {
  return defHttp.get({ url: Api.GetRoleParents});
};
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.GetRolePage, params });

  export const getRoleList = (params?: any) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.GetRoleList, params });

  
export const setRoleStatus = (id: number, deleted: boolean) =>
defHttp.post({ url: Api.setRoleStatus, params: { id, deleted } });


export const permissionUpd = (roleId: number, menuIds: string) =>
defHttp.put({ url: Api.PermissionUpd, params: { roleId, menuIds } });

export const fetchRoleTree = (roleId: number) =>
  defHttp.get<number[]>({ url: Api.RoleTree+roleId });



  export const addRole = (role :RoleParams) => {
    return defHttp.post({ url: Api.Role, data:role});
  };
  
  export const deleteRole= (id? :number) => {
    return defHttp.delete({ url: Api.RolePath + id});
  };

  export const updateRole = (role :RoleParams) => {
    return defHttp.put({ url: Api.Role, data:role});
  };


  
  export const setRoleAuth = (role : any) => {
    return defHttp.post({ url: Api.setRoleAuth, data:role});
  };