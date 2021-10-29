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

import { defHttp } from '/@/utils/http/axios';

import {  FileModel, FilePageParams } from './model/FileModel';
import {  getPageParam } from '/@/utils/util';

enum Api {
            FileList = '/file/file/page',
            FileBase = '/file/file',
            FileDownload= '/file/file/down',
}



export const fetchList = (params? : FilePageParams) => {
  return defHttp.get<FileModel[]>({ url: Api.FileList, params: getPageParam(params) });
};

export const getDetails = (form :FileModel) => {
  return defHttp.get<FileModel[]>({ url: Api.FileBase, data: form});
};


import { downloadByData } from '/@/utils/file/download';

export const handleDown = (table :FileModel,
  onDownloadProgress: (progressEvent: ProgressEvent) => void) => {
  return defHttp.get({ url: Api.FileDownload+'/'+table.bucketName+'/'+table.fileName, 
  data:table,responseType: 'blob',
  timeout: 100*1000,
  onDownloadProgress,
},{
    isReturnNativeResponse: true,
    
  }).then((resp=>{
    // 处理返回的文件流
    downloadByData(resp.data,table.fileName,table.metaType);
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


export const addFrom = (form :FileModel) => {
  return defHttp.post({ url: Api.FileBase, data:form});
};

export const getFrom  = (id :number) => {
  return defHttp.get<FileModel>({ url: Api.FileBase+ '/'+ id});
};
export const deleteFrom = (id :number) => {
  return defHttp.delete<FileModel>({ url: Api.FileBase+ '/' + id});
};

export const putFrom = (form :FileModel) => {
  return defHttp.put({ url: Api.FileBase, data:form});
};

