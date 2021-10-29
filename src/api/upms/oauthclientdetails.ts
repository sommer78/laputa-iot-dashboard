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
import {  OauthClientDetailsModel } from './model/OauthClientDetailsModel';

enum Api {
            OauthClientDetailsList = '/upms/client/page',
            OauthClientDetailsBase = '/upms/client',
}



export const fetchList = (params? : any) => {
  return defHttp.get<OauthClientDetailsModel[]>({ url: Api.OauthClientDetailsList,  params: getPageParam(params)});
};

export const getDetails = (form :OauthClientDetailsModel) => {
  return defHttp.get<OauthClientDetailsModel[]>({ url: Api.OauthClientDetailsBase, data: form});
};


export const addFrom = (form :OauthClientDetailsModel) => {
  return defHttp.post({ url: Api.OauthClientDetailsBase, data:form});
};

export const getFrom  = (id :number) => {
  return defHttp.get<OauthClientDetailsModel>({ url: Api.OauthClientDetailsBase+ '/'+ id});
};
export const deleteFrom = (id :number) => {
  return defHttp.delete<OauthClientDetailsModel>({ url: Api.OauthClientDetailsBase+ '/' + id});
};

export const putFrom = (form :OauthClientDetailsModel) => {
  return defHttp.put({ url: Api.OauthClientDetailsBase, data:form});
};

