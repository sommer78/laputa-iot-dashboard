import {defHttp} from '/@/utils/http/axios';
import {CheckExistParams} from "/@/api/model/baseModel";
import {BatchJobGradeVo, JobGradeInfo, JobGradeParams} from "./model/jobGradeModel";
import {CompanyInfo} from "/@/api/org/model/companyModel";
import {forEach, listToTree} from "/@/utils/helper/treeHelper";

enum Api {
  GetJobGrades = '/org/jobgrade/getJobGrades',
  GetJobGradeTree = '/org/jobgrade/getJobGradeTree',
  SaveOrUpdate = '/org/jobgrade/saveOrUpdate',
  BatchSaveJobGradeTypeAndJobGrade = '/org/jobgrade/batchSaveJobGradeTypeAndJobGrade',
  Delete = '/org/jobgrade/delete',
  CheckEntityExist = '/org/jobgrade/checkEntityExist',
}

export const getJobGradeTree = (params?: JobGradeParams) => {
  const result = defHttp.get<CompanyInfo[]>({url: Api.GetJobGradeTree, params});
  return Promise.resolve(result).then(res => {
    const treeData = listToTree(res, {id: 'id', children: 'children', pid: 'pid'});
    forEach(treeData, (node) => {
      node.showName = `${node.name} (${node.code})`;
      if(node.sourceType === '1'){
        node.selectable = false;
        node.disabled = true;
      }
      if (node.children.length === 0) {
        delete node.children;
      }
    }, {id: 'id', children: 'children', pid: 'pid'});
    return treeData;
  });
};

export const getJobGrades = (params: JobGradeParams) => {
  const result = defHttp.get<JobGradeInfo[]>({url: Api.GetJobGrades, params});
  return result;
};

export const saveOrUpdate = (params?: JobGradeInfo) =>
  defHttp.post<JobGradeInfo>({url: Api.SaveOrUpdate, params});

export const batchSaveJobGradeTypeAndJobGrade = (params?: BatchJobGradeVo) =>
  defHttp.post<JobGradeInfo>({url: Api.BatchSaveJobGradeTypeAndJobGrade, params});

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });

export const deleteById = (params?: object) =>
  defHttp.post<JobGradeInfo>({url: Api.Delete, params});
