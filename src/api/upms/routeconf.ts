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
import { RouteConfModel } from './model/RouteConfModel';

enum Api {
  RouteConfList = '/upms/route',
  RouteConfBase = '/upms/route',
}

export const fetchList = (params?: any) => {
  return defHttp.get<RouteConfModel[]>({ url: Api.RouteConfList, params: getPageParam(params) });
};

export const getDetails = (form: RouteConfModel) => {
  return defHttp.get<RouteConfModel[]>({ url: Api.RouteConfBase, data: form });
};

export const addFrom = (form: RouteConfModel) => {
  return defHttp.post({ url: Api.RouteConfBase, data: form });
};

export const getFrom = (id: number) => {
  return defHttp.get<RouteConfModel>({ url: Api.RouteConfBase + '/' + id });
};
export const deleteFrom = (id: number) => {
  return defHttp.delete<RouteConfModel>({ url: Api.RouteConfBase + '/' + id });
};

export const putFrom = (form: RouteConfModel) => {
  return defHttp.put({ url: Api.RouteConfBase, data: form });
};
