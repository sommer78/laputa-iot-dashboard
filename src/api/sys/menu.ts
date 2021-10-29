import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, RouteItem, MenuPageParams } from './model/menuModel';

enum Api {
  GetMenuRouter = '/upms/menu',
  GetMenuList = '/upms/menu/page',
  GetTopMenuList = '/upms/menu',
  GetMenuTree = '/upms/menu/tree',
  GetAllMenuTree = '/upms/menu/menuTree',
  AddMenu = '/upms/menu',
  GetMenu = '/upms/menu/',
  GetMenuParents = '/upms/menu/parents',
}

/**
 * @description: Get user menu based on id
 */
 export const getMenuRouter = (id? :number) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuRouter,  params: {parentId: id} });
};
export const getMenuList = (params? : MenuPageParams) => {
  console.log('getMenuList',params);
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList, params:  { current: params?.page, size: params?.pageSize, ...params} });
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
  return defHttp.post({ url: Api.AddMenu, data:menu});
};

export const getMenu = (id? :number) => {
  return defHttp.get<RouteItem>({ url: Api.GetMenuList + id});
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
