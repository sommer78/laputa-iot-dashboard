import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, UserInfoModel, UserDtoModel } from './model/UserModel';
import {  CheckExistParams } from '/@/api/model/baseModel';
import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { getPageParam } from '/@/utils/util';

enum Api {
  Login = '/login',
  Logout = '/auth/token/logout',
  LoginAuth = '/auth/oauth/token',
  GetUserInfoDetail = '/upms/user/details/',
  GetPermCode = '/upms/acl/getPermCode',
  GetUserList = '/upms/user/page',
  UserBase = '/upms/user',
  EditUser = '/upms/user/edit',
  UserDetail = '/upms/user/details/',
  UseUSERiNFOrDetail = '/upms/user/details/',
  UserInfoById =  '/upms/user/userinfo/',
  UserInfo =  '/upms/user/info',
  SaveOrUpdate =  '/upms/user/saveOrUpdate/',
  CheckEntityExist = '/upms/user/checkEntityExist',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });



export const fetchUserList = (params? : any) => {
  return defHttp.get<UserInfoModel[]>({ url: Api.GetUserList,  params: getPageParam(params)});
};

export const getDetails = (user :UserInfoModel) => {
  return defHttp.get<UserInfoModel[]>({ url: Api.UserDetail, data: user});
};



export const addUser = (user :UserInfoModel) => {
  return defHttp.post({ url: Api.UserBase, data:user});
};

export const getUser = (id :number) => {
  return defHttp.get<UserInfoModel>({ url: Api.UserBase+ '/' + id});
};
export const deleteUser= (id :number) => {
  return defHttp.delete<UserInfoModel>({ url: Api.UserBase + '/' + id});
};

// 更改个人信息
export const saveOrUpdate = (user :UserDtoModel) => {
  console.log(user);
  return defHttp.post({ url: Api.SaveOrUpdate, data:user});
};

export const updateUser = (user :UserDtoModel) => {
  // console.log(user);
  return defHttp.put({ url: Api.UserBase, data:user});
};

export const getUserInfoDetail = (id :string | string[]) => {
  return defHttp.get<UserInfoModel>({ url: Api.UserInfoById+id});
};



export const getUserInfo = () => {
  return defHttp.get<UserInfoModel>({ url: Api.UserInfo});
};




export function loginByUsername(params: LoginParams, code = '1234', randomStr = 'blockPuzzle') {
  const grant_type = 'password';
  const dataObj = { username: params.username, password: params.password };
  // dGVzdDp0ZXN0
  // bGFwdXRhOmxhcHV0YQ==
  return defHttp.requestData({
    url: Api.LoginAuth,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      'TENANT-ID': '1',
      'Authorization': 'Basic dGVzdDp0ZXN0'
    },
    method: 'post',
    params: {randomStr, code, grant_type},
    data: dataObj,
  });
}


/**
 * @description: getUserInfo
 */
export function GetUserInfoDetailByname(name: string) {
  return defHttp.get<UserInfoModel>({ url: Api.GetUserInfoDetail+name });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.delete({
    url: Api.Logout
  })
  // return defHttp.get({ url: Api.Logout });
}
