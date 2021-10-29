import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '任务日志ID',
    dataIndex: 'jobLogId',
    width: 150,
  },
  {
    align: 'left',
    title: '任务id',
    dataIndex: 'jobId',
    width: 150,
  },
  {
    align: 'left',
    title: '任务名称',
    dataIndex: 'jobName',
    width: 150,
  },
  {
    align: 'left',
    title: '任务组名',
    dataIndex: 'jobGroup',
    width: 150,
  },
  {
    align: 'left',
    title: '组内执行顺利，值越大执行优先级越高，最大值9，最小值1',
    dataIndex: 'jobOrder',
    width: 150,
  },
  {
    align: 'left',
    title: '类型',
    dataIndex: 'jobType',
    width: 150,
  },
  {
    align: 'left',
    title: '执行路径',
    dataIndex: 'executePath',
    width: 150,
  },
  {
    align: 'left',
    title: '类名',
    dataIndex: 'className',
    width: 150,
  },
  {
    align: 'left',
    title: '任务方法',
    dataIndex: 'methodName',
    width: 150,
  },
  {
    align: 'left',
    title: '参数值',
    dataIndex: 'methodParamsValue',
    width: 150,
  },
  {
    align: 'left',
    title: 'cron执行表达式',
    dataIndex: 'cronExpression',
    width: 150,
  },
  {
    align: 'left',
    title: '日志信息',
    dataIndex: 'jobMessage',
    width: 150,
  },
  {
    align: 'left',
    title: '执行状态（0正常 1失败）',
    dataIndex: 'jobLogStatus',
    width: 150,
  },
  {
    align: 'left',
    title: '执行时间',
    dataIndex: 'executeTime',
    width: 150,
  },
  {
    align: 'left',
    title: '异常信息',
    dataIndex: 'exceptionInfo',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '定时任务执行日志表名',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'delete',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];
export const descSchema: DescItem[] = [
  {
    label: '任务日志ID',
    field: 'jobLogId',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '任务id',
    field: 'jobId',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '任务名称',
    field: 'jobName',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '任务组名',
    field: 'jobGroup',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '组内执行顺利',
    
    field: 'jobOrder',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '类型',
    field: 'jobType',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '路径',
    field: 'executePath',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '类名',
    field: 'className',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '任务方法',
    field: 'methodName',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '参数值',
    field: 'methodParamsValue',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: 'cron执行表达式',
    field: 'cronExpression',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '日志信息',
    field: 'jobMessage',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '执行状态（0正常 1失败）',
    field: 'jobLogStatus',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '执行时间',
    field: 'executeTime',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '异常信息',
    field: 'exceptionInfo',
    contentMinWidth: 100,
    span: 1,
  },
];

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '任务日志ID',
    field: 'jobLogId',
    required: false,
  },
  {
    component: 'Input',
    label: '任务id',
    field: 'jobId',
    required: false,
  },
  {
    component: 'Input',
    label: '任务名称',
    field: 'jobName',
    required: false,
  },
  {
    component: 'Input',
    label: '任务组名',
    field: 'jobGroup',
    required: false,
  },
  {
    component: 'Input',
    label: '组内执行顺利，值越大执行优先级越高，最大值9，最小值1',
    field: 'jobOrder',
    required: false,
  },
  {
    component: 'Input',
    label: '1、java类;2、spring bean名称;3、rest调用;4、jar调用;9其他',
    field: 'jobType',
    required: false,
  },
  {
    component: 'Input',
    label: 'job_type=3时，rest调用地址，仅支持post协议;job_type=4时，jar路径;其它值为空',
    field: 'executePath',
    required: false,
  },
  {
    component: 'Input',
    label: 'job_type=1时，类完整路径;job_type=2时，spring bean名称;其它值为空',
    field: 'className',
    required: false,
  },
  {
    component: 'Input',
    label: '任务方法',
    field: 'methodName',
    required: false,
  },
  {
    component: 'Input',
    label: '参数值',
    field: 'methodParamsValue',
    required: false,
  },
  {
    component: 'Input',
    label: 'cron执行表达式',
    field: 'cronExpression',
    required: false,
  },
  {
    component: 'Input',
    label: '日志信息',
    field: 'jobMessage',
    required: false,
  },
  {
    component: 'Input',
    label: '执行状态（0正常 1失败）',
    field: 'jobLogStatus',
    required: false,
  },
  {
    component: 'Input',
    label: '执行时间',
    field: 'executeTime',
    required: false,
  },
  {
    component: 'Input',
    label: '异常信息',
    field: 'exceptionInfo',
    required: false,
  },
];
