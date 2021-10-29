import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';

export const columns: BasicColumn[] = [
                                {
            align: 'left',
            title: 'tableName',
            dataIndex: 'tableName',
            width: 150,
                    },                            {
            align: 'left',
            title: '表单信息',
            dataIndex: 'formInfo',
            width: 150,
                    },                                                    {
            align: 'left',
            title: 'delFlag',
            dataIndex: 'delFlag',
            width: 150,
                    },                        
];



export const searchFormSchema: FormSchema[] = [
    {
        label: '表单配置名',
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

                label: 'tableName',
                field: 'tableName',
                contentMinWidth: 100,
                span: 1,
            },            
                    {

                label: '表单信息',
                field: 'formInfo',
                contentMinWidth: 100,
                span: 1,
            },            
            
            
                    {

                label: 'delFlag',
                field: 'delFlag',
                contentMinWidth: 100,
                span: 1,
            },            
            
];

export const formSchema: FormSchema[] = [
    
            
                {
            component: 'Input',
            label: 'tableName',
            field: 'tableName',
            required: false,
                },            
                {
            component: 'Input',
            label: '表单信息',
            field: 'formInfo',
            required: false,
                },            
            
            
                {
            component: 'Input',
            label: 'delFlag',
            field: 'delFlag',
            required: false,
                },            
            


];
