import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';


export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '任务id',
    dataIndex: 'jobId',
    width: 100,
  },
  {
    align: 'left',
    title: '任务名称',
    dataIndex: 'jobName',
    width: 100,
  },
  {
    align: 'left',
    title: '任务组名',
    dataIndex: 'jobGroup',
    width: 100,
  },
  {
    align: 'left',
    title: '执行顺序',
    dataIndex: 'jobOrder',
    width: 100,
  },
  {
    align: 'left',
    title: '类型',
    dataIndex: 'jobType',
    width: 80,
  },
  {
    align: 'left',
    title: '路径',
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
    width: 100,
  },
  {
    align: 'left',
    title: 'cron执行表达式',
    dataIndex: 'cronExpression',
    width: 150,
  },
  {
    align: 'left',
    title: '错失执行策略',
    dataIndex: 'misfirePolicy',
    width: 100,
  },
  {
    align: 'left',
    title: '多租户',
    dataIndex: 'jobTenantType',
    width: 100,
  },
  {
    align: 'left',
    title: '状态',
    dataIndex: 'jobStatus',
    width: 80,
    slots: { customRender: 'jobStatus' },
  },
  {
    align: 'left',
    title: '执行状态',
    dataIndex: 'jobExecuteStatus',
    width: 80,
    slots: { customRender: 'jobExecuteStatus' },
  },
  
  {
    align: 'left',
    title: '初次执行时间',
    dataIndex: 'startTime',
    width: 150,
  },
  {
    align: 'left',
    title: '上次执行时间',
    dataIndex: 'previousTime',
    width: 150,
  },
  {
    align: 'left',
    title: '下次执行时间',
    dataIndex: 'nextTime',
    width: 150,
  },
  {
    align: 'left',
    title: '备注信息',
    dataIndex: 'remark',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '定时任务调度表名',
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
export const jobSchema: DescItem[] = [
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
    label: '组内执行顺利，值越大执行优先级越高，最大值9，最小值1',
    field: 'jobOrder',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '1、java类;2、spring bean名称;3、rest调用;4、jar调用;9其他',
    field: 'jobType',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label:
      'job_type=3时，rest调用地址，仅支持rest get协议,需要增加String返回值，0成功，1失败;job_type=4时，jar路径;其它值为空',
    field: 'executePath',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: 'job_type=1时，类完整路径;job_type=2时，spring bean名称;其它值为空',
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
    label: '错失执行策略（1错失周期立即执行 2错失周期执行一次 3下周期执行）',
    field: 'misfirePolicy',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '1、多租户任务;2、非多租户任务',
    field: 'jobTenantType',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '状态（1、未发布;2、运行中;3、暂停;4、删除;）',
    field: 'jobStatus',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '状态（0正常 1异常）',
    field: 'jobExecuteStatus',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '创建者',
    field: 'createBy',
    contentMinWidth: 100,
    span: 1,
  },

  {
    label: '更新者',
    field: 'updateBy',
    contentMinWidth: 100,
    span: 1,
  },

  {
    label: '初次执行时间',
    field: 'startTime',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '上次执行时间',
    field: 'previousTime',
    contentMinWidth: 100,
    span: 1,
  },
  {
    label: '下次执行时间',
    field: 'nextTime',
    contentMinWidth: 100,
    span: 1,
  },

  {
    label: '备注信息',
    field: 'remark',
    contentMinWidth: 100,
    span: 1,
  },
];

export const formSchema: FormSchema[] = [
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
    label: '组内执行顺序',
    field: 'jobOrder',
    required: false,
    componentProps: {
      placeholder: '组内执行顺利，值越大执行优先级越高，最大值9，最小值1',
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    component: 'Input',
    label: '任务类型',
    field: 'jobType',
    required: false,
    componentProps: {
        placeholder: '1、java类;2、spring bean名称;3、rest调用;4、jar调用;9其他',
        onChange: (e: any) => {
          console.log(e);
        },
      },
  },
  {
    component: 'Input',
    label:      '执行路径',
    field: 'executePath',
    required: false,
    componentProps: {
        placeholder: 'job_type=3时，rest调用地址，仅支持rest get协议,需要增加String返回值，0成功，1失败;job_type=4时，jar路径;其它值为空',
        onChange: (e: any) => {
          console.log(e);
        },
      },
  },
  {
    component: 'Input',
    label: '类名',
    field: 'className',
    required: false,
    componentProps: {
        placeholder:  'job_type=1时，类完整路径;job_type=2时，spring bean名称;其它值为空',
        onChange: (e: any) => {
          console.log(e);
        },
      },
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
    slot: 'cron',
  },
  {
    component: 'Input',
    label: '错失执行策略',
    field: 'misfirePolicy',
    required: false,
    componentProps: {
        placeholder: '错失执行策略（1错失周期立即执行 2错失周期执行一次 3下周期执行）',
        onChange: (e: any) => {
          console.log(e);
        },
      },
  },
  {
    component: 'Input',
    label: '1、多租户任务;2、非多租户任务',
    field: 'jobTenantType',
    required: false,
  },
  {
    component: 'Input',
    label: '状态',
    field: 'jobStatus',
    required: false,
    componentProps: {
        placeholder: '状态（1、未发布;2、运行中;3、暂停;4、删除;）',
        onChange: (e: any) => {
          console.log(e);
        },
      },
  },
  {
    component: 'Input',
    label: '状态',
    field: 'jobExecuteStatus',
    required: false,
    componentProps: {
        placeholder: '状态（1、未发布;2、运行中;3、暂停;4、删除;）',
        onChange: (e: any) => {
          console.log(e);
        },
      },
  },
  {
    component: 'Input',
    label: '创建者',
    field: 'createBy',
    required: false,
  },

  {
    component: 'Input',
    label: '更新者',
    field: 'updateBy',
    required: false,
  },

  {
    component: 'Input',
    label: '初次执行时间',
    field: 'startTime',
    required: false,
  },
  {
    component: 'Input',
    label: '上次执行时间',
    field: 'previousTime',
    required: false,
  },
  {
    component: 'Input',
    label: '下次执行时间',
    field: 'nextTime',
    required: false,
  },

  {
    component: 'Input',
    label: '备注信息',
    field: 'remark',
    required: false,
  },
];




