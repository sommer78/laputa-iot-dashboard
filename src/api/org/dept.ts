import {defHttp} from '/@/utils/http/axios';
import {listToTree, forEach} from "/@/utils/helper/treeHelper";
import {DeptInfo, DeptSearchParams} from "./model/deptModel";
import {CheckExistParams} from "/@/api/model/baseModel";
import {ResultPageParams} from "../model/baseModel"

enum Api {
  DeptList = '/org/department/getAll',
  GetOrgTree = '/org/department/getOrgTree',
  SaveOrUpdate = '/org/department/saveOrUpdate',
  Delete = '/org/department/delete',
  CheckEntityExist = '/org/department/checkEntityExist',
}

export const getDepts = (params?: DeptSearchParams) => {
  const result = defHttp.get<ResultPageParams<DeptInfo>>({url: Api.DeptList, params});
  return Promise.resolve(result).then((res:any) => {
    const treeData = listToTree(res, {id: 'id', children: 'children', pid: 'pid'});
    forEach(treeData, (node) => {
      if (node.children.length === 0) {
        delete node.children;
      }
    }, {id: 'id', children: 'children', pid: 'pid'});
    return treeData;
  });
};

export const getOrgTree = () => {
  const result = defHttp.get<DeptInfo>({url: Api.GetOrgTree});
  return Promise.resolve(result).then((res:any) => {
    const treeData = listToTree(res, {id: 'id', children: 'children', pid: 'pid'});
    forEach(treeData, (node) => {
      if (node.children.length === 0) {
        delete node.children;
      }
    }, {id: 'id', children: 'children', pid: 'pid'});
    return treeData;
  });
};

export const saveOrUpdate = (params?: DeptInfo) =>
  defHttp.post({url: Api.SaveOrUpdate, params});

export const deleteByIds = (params?: Array<string>) =>
  defHttp.post({url: Api.Delete, params});

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });
