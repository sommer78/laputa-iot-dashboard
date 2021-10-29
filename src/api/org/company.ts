import {defHttp} from '/@/utils/http/axios';
import {listToTree, forEach} from "/@/utils/helper/treeHelper";
import {CompanyInfo, CompanyParams} from "/@/api/org/model/companyModel";
import {CheckExistParams} from "/@/api/model/baseModel";

enum Api {
  CompanyList = '/org/company/page',
  SaveOrUpdate = '/org/company/saveOrUpdate',
  Delete = '/org/company/delete',
  CheckEntityExist = '/org/company/checkEntityExist',
}

export const getCompanies = (params?: CompanyParams) => {
  const result = defHttp.get<any>({url: Api.CompanyList, params});
  return Promise.resolve(result).then(res => {
    if(res.records.length>0){
      const treeData = listToTree( res.records, {id: 'id', children: 'children', pid: 'pid'});
      forEach(treeData, (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      }, {id: 'id', children: 'children', pid: 'pid'});
      return treeData;
    }
   
  });
};

export const saveOrUpdate = (params?: CompanyInfo) =>
  defHttp.post<CompanyInfo>({url: Api.SaveOrUpdate, params});

export const deleteByIds = (params?: Array<string>) =>
  defHttp.post<CompanyInfo>({url: Api.Delete, params});

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });
