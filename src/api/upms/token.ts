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
import { TokenModel } from './model/TokenModel';

enum Api {
  TokenList = '/upms/token/page',
  TokenBase = '/upms/token',
}



export const fetchList = (params?: any) => {
  return defHttp.get<TokenModel[]>({ url: Api.TokenList, params: getPageParam(params) });
};

export const getDetails = (form: TokenModel) => {
  return defHttp.get<TokenModel[]>({ url: Api.TokenBase, data: form });
};

export const deleteFrom = (id: string) => {
  return defHttp.delete<TokenModel>({ url: Api.TokenBase + '/' + id });
};
