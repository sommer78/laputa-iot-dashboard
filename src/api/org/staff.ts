import {defHttp} from '/@/utils/http/axios';
import {DeptInfo} from "./model/deptModel";
import { getPageParam } from '/@/utils/util';
import {
  StaffLeaderParam,
  StaffListGetResultModel,
  StaffPageParams,
  StaffRoleDeleteParam
} from "./model/staffModel";
import {CheckExistParams} from "/@/api/model/baseModel";

enum Api {
  StaffPageList = '/org/staff/page',
  StaffPageListShowRows = '/org/staff/getPageShowRoles',
  AllocationRoles = '/org/staffRole/allocationRoles',
  SaveOrUpdate = '/org/staff/saveOrUpdate',
  Delete = '/org/staff/delete',
  SetLeaderCode = '/org/staff/setLeaderCode',
  CheckEntityExist = '/org/staff/checkEntityExist',
  DeleteStaffRole = '/org/staffRole/deleteStaffRole',
}

export const getStaffPageList = (params: StaffPageParams) =>{

  const showRoles = params.showRoles;

  const url = showRoles?(Api.StaffPageListShowRows+`?showRoles=${showRoles}`):Api.StaffPageList;
  console.log('getStaffPageList',params);
  return defHttp.get<StaffListGetResultModel>({ url,  params: getPageParam(params) });
}

export const saveOrUpdate = (params?: DeptInfo) =>
  defHttp.post({url: Api.SaveOrUpdate, params});

export const allocationRoles = (params: any) =>
  defHttp.post({url: Api.AllocationRoles + "/" + params.staffId, params: params.roles});

export const deleteByIds = (params?: Array<string>) =>
  defHttp.post({url: Api.Delete, params});

export const deleteStaffRole = (params: StaffRoleDeleteParam) =>
  defHttp.post({url: Api.DeleteStaffRole, params});

export const setLeaderCode = (params: StaffLeaderParam) =>
  defHttp.post({url: Api.SetLeaderCode + `/${params.leaderCode}/${params.id}`});

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });
