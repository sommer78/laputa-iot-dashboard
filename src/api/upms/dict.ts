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
import { DictModel, DictItemModel, DictItemPageParams, DictPageParams } from './model/DictModel';
import { CheckExistParams } from '../model/baseModel';

enum Api {
  DictList = '/upms/dict/page',
  DictBase = '/upms/dict',
  DictItemPage = '/upms/dict/item/page',
  DictItem = '/upms/dict/item',
  DictType = '/upms/dict/type',
  CheckDictEntityExist = '/upms/dict/check',
}

export const fetchList = (params?: any) => {
  return defHttp.get<DictModel[]>({
    url: Api.DictList,
    params: getPageParam(params) as DictPageParams,
  });
};

export const fetchItemList = (params?: any) => {
  return defHttp.get<DictItemModel[]>({
    url: Api.DictItemPage,
    params: getPageParam(params) as DictItemPageParams,
  });
};

export const getDetails = (form: DictModel) => {
  return defHttp.get<DictModel[]>({ url: Api.DictBase, data: form });
};

export const addDict = (form: DictModel) => {
  return defHttp.post({ url: Api.DictBase, data: form });
};

export const getDict = (id: number) => {
  return defHttp.get<DictModel>({ url: Api.DictBase + '/' + id });
};
export const deleteDict = (id: number) => {
  return defHttp.delete<DictModel>({ url: Api.DictBase + '/' + id });
};

export const putDict = (form: DictModel) => {
  return defHttp.put({ url: Api.DictBase, data: form });
};

export const getItemDetails = (form: DictItemModel) => {
  return defHttp.get<DictItemModel[]>({ url: Api.DictBase, data: form });
};

export const addDictItem = (form: DictItemModel) => {
  return defHttp.post({ url: Api.DictItem, data: form });
};

export const getDictItem = (id: number) => {
  return defHttp.get<DictItemModel>({ url: Api.DictItem + '/' + id });
};

export const putDictItem = (form: DictItemModel) => {
  return defHttp.put({ url: Api.DictItem, data: form });
};

export const deleteItemByIds = (id: number) => {
  return defHttp.delete<DictItemModel>({ url: Api.DictItem + '/' + id });
};

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckDictEntityExist, params });

export const dictType = (type: string) => {
  return defHttp.get<DictItemModel[]>({ url: Api.DictType + '/' + type });
};
