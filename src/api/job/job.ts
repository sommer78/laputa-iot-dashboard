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
import {  getPageParam } from '/@/utils/util';
import {  JobModel } from './model/JobModel';

enum Api {
  SysJobList = '/job/sys-job/page',
  SysJobBase = '/job/sys-job',
  FetchLogList = '/job/sys-job/job-log',
  ShutdownJobsRa = '/job/sys-job/shutdown-jobs',
  RefreshJobsRa = '/job/sys-job/refresh-jobs',
  StartJobsRa = '/job/sys-job/start-jobs',
  StartJobRa = '/job/sys-job/start-job',
  RunJobRa = '/job/sys-job/run-job',
  ShutDownJobRa = '/job/sys-job/shutdown-job',
  ValidTaskName = '/job/sys-job/is-valid-task-name',
}




export const fetchList = (params?: any) => {
  return defHttp.get<JobModel[]>({ url: Api.SysJobList, params: getPageParam(params) });
};

export const fetchLogList = (params?: any) => {
  return defHttp.get<JobModel[]>({ url: Api.FetchLogList, params: getPageParam(params) });
};

export const shutdownJobsRa = () => {
  return defHttp.post<JobModel[]>({ url: Api.ShutdownJobsRa });
};

export const refreshJobsRa = () => {
  return defHttp.post<JobModel[]>({ url: Api.RefreshJobsRa });
};
export const startJobsRa = () => {
  return defHttp.post<JobModel[]>({ url: Api.StartJobsRa });
};

export const startJobRa = (id: number) => {
  return defHttp.post<JobModel[]>({ url: Api.StartJobsRa  + '/' + id });
};

export const runJobRa = (id: number) => {
  return defHttp.post<JobModel[]>({ url: Api.RunJobRa  + '/' + id });
};
export const shutDownJobRa = (id: number) => {
  return defHttp.post<JobModel[]>({ url: Api.ShutDownJobRa  + '/' + id });
};


export const isValidTaskName = (params?: any) => {
  return defHttp.get<JobModel[]>({ url: Api.ValidTaskName, params: getPageParam(params) });
};


export const getDetail = (obj: JobModel) => {
  return defHttp.get<JobModel[]>({ url: Api.SysJobBase, data: obj });
};

export const addModel = (obj: JobModel) => {
  return defHttp.post({ url: Api.SysJobBase, data: obj });
};

export const getById = (id: number) => {
  return defHttp.get<JobModel>({ url: Api.SysJobBase + '/' + id });
};
export const deleteById = (id: number) => {
  return defHttp.delete<JobModel>({ url: Api.SysJobBase + '/' + id });
};

export const updateById = (obj: JobModel) => {
  return defHttp.put({ url: Api.SysJobBase, data: obj });
};
