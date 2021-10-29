import { defHttp } from '/@/utils/http/axios';
import {  DataSourceModel, GenModel } from './model/genModel';
import {  getPageParam } from '/@/utils/util';

enum Api {
  GetPreview= '/gen/generator/preview',
  GetGeneratorList = '/gen/generator/page',
  GetDataSourceList = '/gen/dsconf/list',
  GetDataSourcePage = '/gen/dsconf/page',
  
  DsconfBase = '/gen/dsconf/',
  GeneratorCode = '/gen/generator/code',

  GetGeneratorTable = '/gen/generator/table',
  GetFormInfo= '/gen/form/info',
  GenForm =  '/gen/form/',
}

export const fetchList = (params? : any) => {
  return defHttp.get<GenModel[]>({ url: Api.GetGeneratorList,  params: getPageParam(params) });
};

export const fetchDsList = (params? : any) => {
  return defHttp.get<DataSourceModel[]>({ url: Api.GetDataSourcePage,  params});
};

export const fetchSelectDsList = (params? : any) => {
  return defHttp.get<DataSourceModel[]>({ url: Api.GetDataSourceList,  params});
};


export const addDsconf = (ds :DataSourceModel) => {
  return defHttp.post({ url: Api.DsconfBase, data:ds});
};

export const getDsconf = (id :number) => {
  return defHttp.get<DataSourceModel>({ url: Api.DsconfBase + id});
};
export const deleteDsconf= (id :number) => {
  return defHttp.delete<DataSourceModel>({ url: Api.DsconfBase + id});
};

export const putDsconf = (user :DataSourceModel) => {
  return defHttp.put({ url: Api.DsconfBase, data:user});
};

export const preview = (table :any) => {
  return defHttp.get({ url: Api.GetPreview, params:table});
};
import { downloadByData } from '/@/utils/file/download';

export const handleDown = (table :any) => {
  return defHttp.post({ url: Api.GeneratorCode, data:table, responseType: 'arraybuffer'},{
    isReturnNativeResponse: true,
  }).then((resp=>{
  // 处理返回的文件流
  downloadByData(resp.data,table.tableName + '.zip','application/zip')
  // const blob = new Blob([resp.data], {type: 'application/zip'});
  // const filename = table.tableName + '.zip';
  // const link = document.createElement('a');
  // link.href = URL.createObjectURL(blob);
  // link.download = filename;
  // document.body.appendChild(link);
  // link.click();
  // window.setTimeout(()=> {
  //   URL.revokeObjectURL(blob);
  //   document.body.removeChild(link);
  // }, 0)
  }));
};

export const getGenTable = (query :any) => {
  return defHttp.get({ url: Api.GetGeneratorTable, params:query});
};
export const getForm = (tableName, dsName) => {
  return defHttp.get({ url: Api.GetFormInfo, params: {tableName: tableName, dsName: dsName}});
};

export const postForm = (formInfo, tableName, dsId) => {
  return defHttp.get({ url: Api.GenForm, data: Object.assign({formInfo, tableName, dsId})});
};

