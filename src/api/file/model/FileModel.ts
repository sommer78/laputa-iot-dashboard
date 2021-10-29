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
export interface FileModel {
                id:  any;   /*编号 */
                fileName:  any;   /*fileName */
                bucketName:  any;   /*bucketName */
                original:  any;   /*original */
                type:  any;   /*type */
                fileSize:  any;   /*文件大小 */
                createUser:  any;   /*createUser */
                createTime:  any;   /*上传时间 */
                updateUser:  any;   /*updateUser */
                updateTime:  any;   /*更新时间 */
                deleted:  any;   /*逻辑删除 */
                tenantId:  number;   /*所属租户 */
                version:  number;   /*version */
                url:  any;   /*url */
                metaType:  any;   /*metaType */
    }
export type FilePageParams = BasicPageParams & FileModel;