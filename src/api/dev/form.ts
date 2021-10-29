import { defHttp } from '/@/utils/http/axios';

import {  DataSourceModel } from './model/genModel';
enum Api {
 
 
  GetFormList = '/gen/form/page',
  FormBase = '/gen/form/',
 
}



export const fetchList = (params? : any) => {
  return defHttp.get<DataSourceModel[]>({ url: Api.GetFormList,  params});
};

export const getDetails = (form :DataSourceModel) => {
  return defHttp.get<DataSourceModel[]>({ url: Api.FormBase, data: form});
};


export const addFrom = (form :DataSourceModel) => {
  return defHttp.post({ url: Api.FormBase, data:form});
};

export const getFrom  = (id :number) => {
  return defHttp.get<DataSourceModel>({ url: Api.FormBase+ id});
};
export const deleteFrom = (id :number) => {
  return defHttp.delete<DataSourceModel>({ url: Api.FormBase + id});
};

export const putFrom = (form :DataSourceModel) => {
  return defHttp.put({ url: Api.FormBase, data:form});
};



