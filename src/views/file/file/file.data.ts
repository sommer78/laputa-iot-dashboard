import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
const _TB = 1024 * 1024 * 1024 * 1024
const _GB = 1024 * 1024 * 1024
const _KB = 1024
const _MB = 1024 * 1024

export const columns: BasicColumn[] = [
  {
    align: 'left',
    title: '编号',
    dataIndex: 'id',
    width: 200,
    ifShow: false,
  },
  {
    align: 'left',
    title: '文件名',
    dataIndex: 'fileName',
    width: 300,
  },
  {
    align: 'left',
    title: 'Bucket',
    dataIndex: 'bucketName',
    width: 100,
  },
  {
    align: 'left',
    title: '源文件',
    dataIndex: 'original',
    width: 200,
  },
  {
    align: 'center',
    title: '后缀名',
    dataIndex: 'fileExten',
    width: 50,
  },

  {
    align: 'center',
    title: '数据源',
    dataIndex: 'source',
    width: 50,
  },
  {
    align: 'left',
    title: '文件大小',
    width: 100,
    customRender:  ({ record }) => {
      const size = record.fileSize;
      if (size === null) return '-'
      if (size < _KB) {
        // 1024以下显示kb
        return size + 'B'
      }
      if (size < _MB) {
        const _mb = (size / _KB).toFixed(2)
        return parseFloat(_mb) + 'KB'
      }
      if (size < _GB) {
        const _mb = (size / _MB).toFixed(2)
        return parseFloat(_mb) + 'MB'
      }
      if (size < _TB) {
        const _mb = (size / _GB).toFixed(2)
        return parseFloat(_mb) + 'GB'
      }
      const _gb = ( size / _TB).toFixed(2)
      return parseFloat(_gb) + 'TB'
     },
  },
 
  {
    align: 'left',
    title: '链接url',
    dataIndex: 'url',
    width: 200,
  },
  {
    align: 'left',
    title: 'contentType',
    dataIndex: 'contentType',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '文件名',
    field: 'fileName',
    component: 'Input',
    colProps: { span: 4 },
  },
];
import { uploadApi } from '/@/api/sys/upload';
export const formSchema: FormSchema[] = [
 
  {
    component: 'Upload',
    label: 'file',
    field: 'file',
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
    },
  },
 
 
];
