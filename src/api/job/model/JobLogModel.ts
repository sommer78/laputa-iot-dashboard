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
export interface JobLogModel {
                jobLogId:  number;   /*任务日志ID */
                jobId:  number;   /*任务id */
                jobName:  any;   /*任务名称 */
                jobGroup:  any;   /*任务组名 */
                jobOrder:  any;   /*组内执行顺利，值越大执行优先级越高，最大值9，最小值1 */
                jobType:  any;   /*1、java类;2、spring bean名称;3、rest调用;4、jar调用;9其他 */
                executePath:  any;   /*job_type=3时，rest调用地址，仅支持post协议;job_type=4时，jar路径;其它值为空 */
                className:  any;   /*job_type=1时，类完整路径;job_type=2时，spring bean名称;其它值为空 */
                methodName:  any;   /*任务方法 */
                methodParamsValue:  any;   /*参数值 */
                cronExpression:  any;   /*cron执行表达式 */
                jobMessage:  any;   /*日志信息 */
                jobLogStatus:  any;   /*执行状态（0正常 1失败） */
                executeTime:  any;   /*执行时间 */
                exceptionInfo:  any;   /*异常信息 */
                createTime:  any;   /*创建时间 */
                tenantId:  number;   /*租户id */
    }

export type JobLogPageParams = BasicPageParams & JobLogModel;