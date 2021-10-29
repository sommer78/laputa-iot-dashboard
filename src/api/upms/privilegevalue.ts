/*
 *    Copyright (c) 2018-2025, Laputa IOT All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the www.laputa-iot.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: SommerJiang (sommer_jiang@163.com)
 */

import { defHttp } from '/@/utils/http/axios';
import { getPageParam } from '/@/utils/util';
import { PrivilegeValueModel, ACLModel } from './model/PrivilegeValueModel';


enum Api {
  PrivilegeValueList = '/upms/privilegevalue/page',
  PrivilegeValueBase = '/upms/privilegevalue',
  PrivilegeValueAll = '/upms/privilegevalue/all',
  PrivilegeSaveOrUpdate = '/upms/privilegevalue/saveOrUpdate',
  MenuPrivilegeValue = '/upms/acl/getAclByMenu',
  RoleMenuPrivilegeValue = '/upms/acl/getAclByRoleMenu',
  UpdatePriVal = '/upms/acl/updatePriVal',
}

export const fetchList = (params?: any) => {
  return defHttp.get<PrivilegeValueModel[]>({
    url: Api.PrivilegeValueList,
    params: getPageParam(params),
  });
};

export const getAll = () => {
  return defHttp.get<PrivilegeValueModel[]>({ url: Api.PrivilegeValueAll });
};

export const getDetails = (form: PrivilegeValueModel) => {
  return defHttp.get<PrivilegeValueModel[]>({ url: Api.PrivilegeValueBase, data: form });
};

export const addFrom = (form: PrivilegeValueModel) => {
  return defHttp.post({ url: Api.PrivilegeValueBase, data: form });
};

export const getById = (id: number) => {
  return defHttp.get<PrivilegeValueModel>({ url: Api.PrivilegeValueBase + '/' + id });
};
export const deleteById = (id: number) => {
  return defHttp.delete<PrivilegeValueModel>({ url: Api.PrivilegeValueBase + '/' + id });
};

export const updateById = (form: PrivilegeValueModel) => {
  return defHttp.put({ url: Api.PrivilegeValueBase, data: form });
};

export const getMenuPvs = (id: number) => {
  return defHttp.get({ url: Api.MenuPrivilegeValue + '/' + id });
};
export const getRoleMenuPvs = (params?: ACLModel) => {
  return defHttp.get({ url: Api.RoleMenuPrivilegeValue, params});
};

export const saveOrUpdate = (params?: PrivilegeValueModel) =>
  defHttp.post<PrivilegeValueModel>({ url: Api.PrivilegeSaveOrUpdate, params });

export const updatePriVal = (params?: ACLModel) =>
  defHttp.post<Boolean>({ url: Api.UpdatePriVal, params });
