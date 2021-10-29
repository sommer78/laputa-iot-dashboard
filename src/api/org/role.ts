import {
  RoleInfo,
  RolePageListGetResultModel,
  RolePageParams,
  StaffByRoleParams
} from './model/roleModel';
import { BasicPageSearchParams, CheckExistParams } from "/@/api/model/baseModel";

import { defHttp } from '/@/utils/http/axios';
import { StaffInfo } from "/@/api/org/model/staffModel";
import { StaffRoleParams } from "/@/api/org/model/staffRoleModel";
import { getPageParam } from '/@/utils/util';

enum Api {
  PageList = '/org/role/page',
  PageListByStaffId = '/org/role/pageByStaffId',
  GetStaffsByRole = '/org/role/staffsByRole',
  SaveOrUpdate = '/org/role/saveOrUpdate',
  AddStaffRoles = '/org/role//addStaffRoles',
  Delete = '/org/role/delete',
  DeleteRoleStaff = '/org/role/deleteRoleStaff',
  CheckEntityExist = '/org/role/checkEntityExist',
  AllocationStaffs = '/org/staffRole/allocationStaffs',
}

export const getRoleListByPage = (params: RolePageParams) => {

  const staffId = params.staffId;
 
  const url = staffId?Api.PageListByStaffId+`?staffId=${staffId}`:Api.PageList;

  return defHttp.get<RolePageListGetResultModel>({ url, params: getPageParam(params) });
};


export const getStaffsByRole = (params: StaffByRoleParams) => {
  return defHttp.post<StaffInfo>({ url: Api.GetStaffsByRole+'/' + params.roleId, params: params.staff });
};

export const saveOrUpdate = (params?: RoleInfo) =>
  defHttp.post<RoleInfo>({ url: Api.SaveOrUpdate, params });

export const addStaffRoles = (params?: RoleInfo) =>
  defHttp.post<RoleInfo>({ url: Api.AddStaffRoles+'/'+params.id, params: params.staffList });

/**
 * 给角色分配人员
 * @param params
 */
export const allocationStaffs = (params: StaffRoleParams) =>
  defHttp.post<RoleInfo>({ url: Api.AllocationStaffs+'/'+params.roleId, params: params.staffList });

export const deleteByIds = (params?: Array<string>) =>
  defHttp.post<RoleInfo>({ url: Api.Delete, params });

export const deleteRoleStaff = (params?: Array<string>) =>
  defHttp.post<RoleInfo>({ url: Api.DeleteRoleStaff, params });

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });
