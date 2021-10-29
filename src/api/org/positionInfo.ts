import {defHttp} from '/@/utils/http/axios';
import { getPageParam } from '/@/utils/util';
import {BasicPageSearchParams, CheckExistParams} from "/@/api/model/baseModel";
import {
  BatchPositionInfoVo,
  PositionInfo,
  PositionInfoPageParams,
  PositionInfoPageListGetResultModel,
  PositionInfoParams
} from "./model/positionInfoModel";
import {CompanyInfo} from "/@/api/org/model/companyModel";
import {forEach, listToTree} from "/@/utils/helper/treeHelper";

enum Api {
  GetPositionInfos = '/org/positionInfo/getPositionInfoTree',
  GetPositionInfoTree = '/org/positionInfo/getPositionInfoTree',
  GetPagerModel = '/org/positionInfo/page',
  SaveOrUpdate = '/org/positionInfo/saveOrUpdate',
  BatchSaveOrUpdatePositionSeqAndPosition = '/org/positionInfo/batchSaveOrUpdatePositionSeqAndPosition',
  Delete = '/org/positionInfo/delete',
  CheckEntityExist = '/org/positionInfo/checkEntityExist',
}

export const getPositionInfoTree = (params?: PositionInfoParams) => {
  const result = defHttp.get<CompanyInfo[]>({url: Api.GetPositionInfoTree, params});
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

export const getPositionInfos = (params: PositionInfoParams) => {
  const result = defHttp.post<PositionInfo>({url: Api.GetPositionInfos, params});

  return Promise.resolve(result).then(res => {
    // const treeData = listToTree(res, {id: 'id', children: 'children', pid: 'pid'});
    // forEach(treeData, (node) => {
    //   node['key'] = node.id;
    //   if (node.children.length === 0) {
    //     delete node.children;
    //   }
    // }, {id: 'id', children: 'children', pid: 'pid'});
    return res;
  }).catch(res=>{
    return Promise.reject('获取数据异常')
  });
};



export const getPagerModel = (params?: PositionInfoPageParams) => {
  return defHttp.get<PositionInfoPageListGetResultModel[]>({
    url: Api.GetPagerModel,
    params: getPageParam(params),
  });
};

export const saveOrUpdate = (params?: PositionInfo) =>
  defHttp.post<PositionInfo>({url: Api.SaveOrUpdate, params});

export const batchSaveOrUpdatePositionSeqAndPosition = (params?: BatchPositionInfoVo) =>
  defHttp.post<PositionInfo>({url: Api.BatchSaveOrUpdatePositionSeqAndPosition, params});

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });

export const deleteById = (params?: object) =>
  defHttp.post<PositionInfo>({url: Api.Delete, params});
