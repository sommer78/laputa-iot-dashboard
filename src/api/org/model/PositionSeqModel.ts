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

import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type PositionSeqParams = {
  keyword?: string;
};

export type PositionSeqPageParams = BasicPageParams & PositionSeqParams;

export type PositionSeqInfo = {
  name?: string;
  status?: number;
  orderNo?: number;
  note?: string;
  creator?: string;
  createTime?: any;
  updator?: string;
  updateTime?: any;

};

/**
 * @description: Request list return value
 */
export type PositionSeqPageListGetResultModel = BasicFetchResult<PositionSeqInfo>;

export interface PositionSeqModel {
  id: any /*主键ID */;
  code: any /*编码 */;
  pid: any /*父级Id */;
  name: any /*名称 */;
  status: number /*状态1启用；0停用 */;
  orderNo: number /*排序编号 */;
  note: any /*备注 */;
  deleted: any /*是否删除 0正常 1删除 */;
  version: number /*乐观锁 */;
  createUser: any /*创建人id */;
  createTime: any /*创建时间 */;
  updateUser: any /*更新人id */;
  updateTime: any /*修改时间 */;
  tenantId: any /*所属租户 */;
}


