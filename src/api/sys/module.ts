import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, RouteItem, MenuPageParams } from './model/menuModel';
import { listToTree, forEach } from '/@/utils/helper/treeHelper';
import { CheckExistParams } from '/@/api/model/baseModel';
enum Api {
  GetMenuRouter = '/upms/menu',
  GetMenuList = '/upms/menu/page',
  GetAllMenu = '/upms/menu/getAll',
  GetTopMenuList = '/upms/menu',
  SaveOrUpdate = '/upms/menu/saveOrUpdate',
  GetMenuTree = '/upms/menu/tree',
  GetAllMenuTree = '/upms/menu/menuTree',
  APIMenu = '/upms/menu',
  GetMenu = '/upms/menu/',
  GetMenuParents = '/upms/menu/parents',
  CheckEntityExist = '/upms/menu/checkEntityExist',
  SavePValue = '/upms/menu/addPriVal',
}

/**
 * @description: Get user menu based on id
 */
 export const getMenuRouter = (id? :number) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuRouter,  params: {parentId: id} });
};
export const getModules = (params? : MenuPageParams) => {
  console.log('getMenuList',params);
  const result = defHttp.get<getMenuListResultModel>({ url: Api.GetAllMenu, params });
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
export const getTopMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetTopMenuList,  params: {type: 'top'} });
};

export const getMenuTree = (lazy?, parentId?) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuTree,  params: {lazy: lazy, parentId: parentId}});
};

export const getAllMenuTree = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetAllMenuTree});
};

export const addMenu = (menu :RouteItem) => {
  return defHttp.post({ url: Api.APIMenu, data:menu});
};

export const getMenu = (id? :number) => {
  return defHttp.get<RouteItem>({ url: Api.GetMenuList + id});
};
export const deleteByIds = (id? :number) => {
  return defHttp.delete({ url: Api.APIMenu + "/" + id});
};

export const updateMenu = (menu :RouteItem) => {
  return defHttp.put({ url: Api.GetMenu, data:menu});
};
export const getMenuParents = () => {
  return defHttp.get({ url: Api.GetMenuParents});
};
export const saveOrUpdate = (params?: RouteItem) =>
  defHttp.post<RouteItem>({ url: Api.SaveOrUpdate, params });


export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });
