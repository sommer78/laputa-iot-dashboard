import {defHttp} from '/@/utils/http/axios';
import {CheckExistParams} from "/@/api/model/baseModel";
import {JobGradeTypeInfo, JobGradeTypeParams} from "./model/jobGradeTypeModel";

import {forEach, listToTree} from "/@/utils/helper/treeHelper";

enum Api {
  GetJobGradeTypes = '/org/jobGradeType/getJobGradeTypes',
  SaveOrUpdate = '/org/jobGradeType/saveOrUpdate',
  Delete = '/org/jobGradeType/delete',
  CheckEntityExist = '/org/jobGradeType/checkEntityExist',
}

export const getJobGradeTypes = (params: JobGradeTypeParams) => {
  const result = defHttp.get<JobGradeTypeInfo>({url: Api.GetJobGradeTypes, params});
  return result;
};

export const getJobGradeTypesToTree = (params?: any) => {
  const result = defHttp.get<JobGradeTypeInfo>({url: Api.GetJobGradeTypes, params});
  return Promise.resolve(result).then(res => {
    const treeData = listToTree(res, {id: 'id', children: 'children', pid: 'pid'});
    forEach(treeData, (node) => {
      if (node.children.length === 0) {
        delete node.children;
      }
    }, {id: 'id', children: 'children', pid: 'pid'});
    return treeData;
  });
};

export const saveOrUpdate = (params?: JobGradeTypeInfo) =>
  defHttp.post<JobGradeTypeInfo>({url: Api.SaveOrUpdate, params});

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });

export const deleteById = (params?: object) =>
  defHttp.post<JobGradeTypeInfo>({url: Api.Delete, params});
