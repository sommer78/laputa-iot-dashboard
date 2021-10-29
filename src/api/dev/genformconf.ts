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
import {  GenFormConfModel } from './model/GenFormConfModel';

enum Api {
            GenFormConfList = '/gen/form/page',
            GenFormConfBase = '/gen/form',
}



export const fetchList = (params? : any) => {
  return defHttp.get<GenFormConfModel[]>({ url: Api.GenFormConfList,  params: getPageParam(params)});
};

export const getDetails = (form :GenFormConfModel) => {
  return defHttp.get<GenFormConfModel[]>({ url: Api.GenFormConfBase, data: form});
};


export const addFrom = (form :GenFormConfModel) => {
  return defHttp.post({ url: Api.GenFormConfBase, data:form});
};

export const getFrom  = (id :number) => {
  return defHttp.get<GenFormConfModel>({ url: Api.GenFormConfBase+ '/'+ id});
};
export const deleteFrom = (id :number) => {
  return defHttp.delete<GenFormConfModel>({ url: Api.GenFormConfBase+ '/' + id});
};

export const putFrom = (form :GenFormConfModel) => {
  return defHttp.put({ url: Api.GenFormConfBase, data:form});
};

