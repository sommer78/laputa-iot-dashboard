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
import { PositionSeqModel, PositionSeqPageParams } from './model/positionSeqModel';
import { forEach, listToTree } from "/@/utils/helper/treeHelper";

enum Api {
 
  CheckEntityExist = '/org/positionseq/checkEntityExist',
  GetPositionSeqs = '/org/positionseq/getPositionSeqs',
  PositionSeqList = '/org/positionseq/page',
  PositionSeqBase = '/org/positionseq',
  SaveOrUpdate = '/org/positionseq/saveOrUpdate',
  Delete = '/org/positionseq/delete',
}

export const fetchList = (params?: any) => {
  return defHttp.get<PositionSeqModel[]>({
    url: Api.PositionSeqList,
    params: getPageParam(params),
  });
};

export const getPositionSeqs = (params?: PositionSeqPageParams) => {
  const result = defHttp.get<PositionSeqModel>({url: Api.GetPositionSeqs, params});
  return Promise.resolve(result).then(res => {
    const treeData = listToTree( res, {id: 'id', children: 'children', pid: 'pid'});
    forEach(treeData, (node) => {
      if (node.children.length === 0) {
        delete node.children;
      }
    }, {id: 'id', children: 'children', pid: 'pid'});
    return treeData;
  });
};
export const saveOrUpdate = (params?: PositionSeqModel) =>
  defHttp.post<PositionSeqModel>({url: Api.SaveOrUpdate, params});

export const checkEntityExist = (params?: PositionSeqModel) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });


export const getDetail = (form: PositionSeqModel) => {
  return defHttp.get<PositionSeqModel[]>({ url: Api.PositionSeqBase, data: form });
};

export const addModel = (form: PositionSeqModel) => {
  return defHttp.post({ url: Api.PositionSeqBase, data: form });
};

export const getById = (id: number) => {
  return defHttp.get<PositionSeqModel>({ url: Api.PositionSeqBase + '/' + id });
};
export const deleteById = (id: number) => {
  return defHttp.delete<PositionSeqModel>({ url: Api.PositionSeqBase + '/' + id });
};

export const updateById = (form: PositionSeqModel) => {
  return defHttp.put({ url: Api.PositionSeqBase, data: form });
};
export const deleteByIds = (params?: Array<string>) =>
  defHttp.post<PositionSeqModel>({url: Api.Delete, params});
