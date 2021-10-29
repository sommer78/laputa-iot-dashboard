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
export interface PrivilegeValueModel {
                id:  any;   /*主键ID */
                position:  number;   /*整型的位 */
                name:  any;   /*名称 */
                orderNo:  number;   /*排序号 */
                icon:  any;   /*权限图标 */
                remark:  any;   /*备注 */
                deleted:  any;   /*是否删除 0正常 1删除 */
                version:  number;   /*乐观锁 */
                createUser:  any;   /*创建人id */
                createTime:  any;   /*创建时间 */
                updateUser:  any;   /*更新人id */
                updateTime:  any;   /*修改时间 */
                tenantId:  any;   /*所属租户 */
    }

export type PrivilegeValuePageParams = BasicPageParams & PrivilegeValueModel;