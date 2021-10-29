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
import { BasicPageParams } from '/@/api/model/baseModel';
export interface DictModel {
                id:  number;   /*编号 */
                type:  any;   /*type */
                description:  any;   /*description */
                createTime:  any;   /*创建时间 */
                updateTime:  any;   /*更新时间 */
                remarks:  any;   /*remarks */
                system:  any;   /*system */
                delFlag:  any;   /*delFlag */
                tenantId:  number;   /*所属租户 */
    }

export type DictPageParams = BasicPageParams & DictModel;

export interface DictItemModel {
    id:  number;   /*编号 */
    dictId:  number;   /*dictId */
    value:  any;   /*value */
    label:  any;   /*label */
    type:  any;   /*type */
    description:  any;   /*description */
    sort:  number;   /*排序（升序） */
    createTime:  any;   /*创建时间 */
    updateTime:  any;   /*更新时间 */
    remarks:  any;   /*remarks */
    delFlag:  any;   /*delFlag */
    tenantId:  number;   /*所属租户 */
}

export type DictItemPageParams = BasicPageParams & DictItemModel;