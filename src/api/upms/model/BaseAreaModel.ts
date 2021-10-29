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
export interface BaseAreaModel {
                code:  any;   /*编码 */
                pcode:  any;   /*父编码 */
                name:  any;   /*名称 */
                deleted:  number;   /*deleted */
                createTime:  any;   /*createTime */
                createUser:  any;   /*createUser */
                updateTime:  any;   /*updateTime */
                updateUser:  any;   /*updateUser */
                version:  number;   /*version */
    }

export type BaseAreaPageParams = BasicPageParams & BaseAreaModel;