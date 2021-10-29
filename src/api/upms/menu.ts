import { defHttp } from '/@/utils/http/axios';
import { MenuResultModel, RouteItem, MenuPageParams } from './model/MenuModel';

import { listToTree, forEach } from '/@/utils/helper/treeHelper';
import { CheckExistParams } from '/@/api/model/baseModel';
enum Api {
  GetMenuRouter = '/upms/menu',
  GetMenuList = '/upms/menu/page',
  GetTopMenuList = '/upms/menu',
  GetMenuTree = '/upms/menu/tree',
  GetAllMenuTree = '/upms/menu/menuTree',
  AddMenu = '/upms/menu',
  GetMenu = '/upms/menu/',
  GetMenuParents = '/upms/menu/parents',
  GetAllMenu = '/upms/menu/getAll',
  SaveOrUpdate = '/upms/menu/saveOrUpdate',
  APIMenu = '/upms/menu',
  CheckEntityExist = '/upms/menu/checkEntityExist',
  SavePValue = '/upms/menu/addPriVal',
  GetAclByRoleId  = '/upms/menu/getAclsByRoleId',
}

/**
 * @description: Get user menu based on id
 */
 export const getMenuRouter = (id? :number) => {
  return defHttp.get<MenuResultModel>({ url: Api.GetMenuRouter,  params: {parentId: id} });
};
export const getMenuList = (params? : MenuPageParams) => {
  // console.log('getMenuList',params);
  return defHttp.get<MenuResultModel>({ url: Api.GetMenuList, params:  { current: params?.page, 
    size: params?.pageSize, 
    ...params} });
};
export const getTopMenuList = () => {
  return defHttp.get<MenuResultModel>({ url: Api.GetTopMenuList,  params: {type: 'top'} });
};

export const getMenuTree = (lazy?, parentId?) => {
  return defHttp.get<MenuResultModel>({ url: Api.GetMenuTree,  params: {lazy: lazy, parentId: parentId}});
};

export const getAllMenuTree = () => {
  return defHttp.get<MenuResultModel>({ url: Api.GetAllMenuTree});
};

export const addMenu = (menu :RouteItem) => {
  return defHttp.post({ url: Api.AddMenu, data:menu});
};

export const getMenu = (id? :number) => {
  return defHttp.get<RouteItem>({ url: Api.GetMenu + id});
};
export const deleteMenu = (id? :number) => {
  return defHttp.delete({ url: Api.GetMenu + id});
};
export const updateMenu = (menu :RouteItem) => {
  return defHttp.put({ url: Api.GetMenu, data:menu});
};
export const getMenuParents = () => {
  return defHttp.get({ url: Api.GetMenuParents});
};



export const getAclByRoleId = (id? : string  | string[]) => {

  const result = defHttp.get<MenuResultModel>({ url: Api.GetAclByRoleId, params: {roleId: id} });
  return Promise.resolve(result).then((res: any) => {
    console.log(res);
    // const data = res.records;
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'parentId' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'parentId' }
    );
    return treeData;
  });
};

export const getAllMenu = (params? : MenuPageParams) => {
  // console.log('getMenuList',params);
  const result = defHttp.get<MenuResultModel>({ url: Api.GetAllMenu, params });
  return Promise.resolve(result).then((res: any) => {
    // console.log(res);
    // const data = res.records;
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'parentId' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'parentId' }
    );
    return treeData;
  });
};

export const deleteByIds = (id? :number) => {
  return defHttp.delete({ url: Api.APIMenu + "/" + id});
};


export const saveOrUpdate = (params?: RouteItem) =>
  defHttp.post<RouteItem>({ url: Api.SaveOrUpdate, params });


export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });

