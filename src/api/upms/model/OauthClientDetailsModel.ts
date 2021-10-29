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
export interface OauthClientDetailsModel {
                id:  number;   /*ID */
                clientId:  any;   /*clientId */
                resourceIds:  any;   /*resourceIds */
                clientSecret:  any;   /*clientSecret */
                scope:  any;   /*scope */
                authorizedGrantTypes:  any;   /*authorizedGrantTypes */
                webServerRedirectUri:  any;   /*webServerRedirectUri */
                authorities:  any;   /*authorities */
                accessTokenValidity:  number;   /*accessTokenValidity */
                refreshTokenValidity:  number;   /*refreshTokenValidity */
                additionalInformation:  any;   /*additionalInformation */
                autoapprove:  any;   /*autoapprove */
                delFlag:  any;   /*delFlag */
                tenantId:  number;   /*所属租户 */
    }

export type OauthClientDetailsPageParams = BasicPageParams & OauthClientDetailsModel;