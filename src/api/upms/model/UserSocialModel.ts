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
export interface UserSocialModel {
                id:  any;   /*主键ID */
                userId:  any;   /*用户ID */
                name:  any;   /*姓名 */
                type:  any;   /*账号类型：wx微信登录Id mini小程序Id，qqQQ openId gitee_id码云 osc_id 开源中国  */
                avatar:  any;   /*头像 */
                socialUid:  any;   /*社交登录UID */
                accessToken:  any;   /*社交登录TOKEN */
                expiresIn:  any;   /*社交登录过期时间 */
                deleted:  any;   /*启用状态 0启用 1禁用 */
                version:  number;   /*乐观锁 */
                createUser:  any;   /*创建人id */
                createTime:  any;   /*创建时间 */
                updateUser:  any;   /*更新人id */
                updateTime:  any;   /*修改时间 */
                tenantId:  any;   /*所属租户 */
    }

export type UserSocialPageParams = BasicPageParams & UserSocialModel;