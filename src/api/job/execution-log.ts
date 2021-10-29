/*
 *    Copyright (c) 2018-2025, Laputa IOT All rights reserved.
 *
 * Redistribution and use in source and binary objs, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary obj must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the www.laputa-iot.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: SommerJiang (sommer_jiang@163.com)
 */

import { defHttp } from '/@/utils/http/axios';
import { getPageParam } from '/@/utils/util';
import { ExecutionLogModel } from './model/ExecutionLogModel';

enum Api {
  ExecutionLogList = '/daemon/execution-log/page',
  ExecutionLogBase = '/daemon/execution-log',
}

export const fetchList = (params?: any) => {
  return defHttp.get<ExecutionLogModel[]>({ url: Api.ExecutionLogList, params: getPageParam(params) });
};

export const getDetail = (obj: ExecutionLogModel) => {
  return defHttp.get<ExecutionLogModel[]>({ url: Api.ExecutionLogBase, data: obj });
};

export const addModel = (obj: ExecutionLogModel) => {
  return defHttp.post({ url: Api.ExecutionLogBase, data: obj });
};

export const getById = (id: number) => {
  return defHttp.get<ExecutionLogModel>({ url: Api.ExecutionLogBase + '/' + id });
};
export const deleteById = (id: number) => {
  return defHttp.delete<ExecutionLogModel>({ url: Api.ExecutionLogBase + '/' + id });
};

export const updateById = (obj: ExecutionLogModel) => {
  return defHttp.put({ url: Api.ExecutionLogBase, data: obj });
};
