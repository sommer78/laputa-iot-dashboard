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
import {  PublicParamModel } from './model/PublicParamModel';

enum Api {
            PublicParamList = '/upms/param/page',
            PublicParamBase = '/upms/param',
            PublicParamKey= '/upms/param/publicValue',
}



export const fetchList = (params? : any) => {
  return defHttp.get<PublicParamModel[]>({ url: Api.PublicParamList,  params: getPageParam(params)});
};

export const getDetails = (key :string) => {
  return defHttp.get<PublicParamModel[]>({ url: Api.PublicParamKey+ '/'+ key});
};

export const getPublicParamKey = (form :PublicParamModel) => {
  return defHttp.get<PublicParamModel[]>({ url: Api.PublicParamBase, data: form});
};
export const addFrom = (form :PublicParamModel) => {
  return defHttp.post({ url: Api.PublicParamBase, data:form});
};

export const getFrom  = (id :number) => {
  return defHttp.get<PublicParamModel>({ url: Api.PublicParamBase+ '/'+ id});
};
export const deleteFrom = (id :number) => {
  return defHttp.delete<PublicParamModel>({ url: Api.PublicParamBase+ '/' + id});
};

export const putFrom = (form :PublicParamModel) => {
  return defHttp.put({ url: Api.PublicParamBase, data:form});
};

