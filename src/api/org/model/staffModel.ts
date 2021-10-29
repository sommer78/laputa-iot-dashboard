import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type StaffParams = BasicPageParams & {
  keyword?: string;
  showRoles?: boolean;
};

export type StaffPageParams = BasicPageParams & StaffParams;

export interface StaffInfo {
  id: string,
  username: string,
  realName: string,
  sex: number,
  password: string;
  tel: string;
  mobile: string;
  email: string;
  image: string;
  address: string;
}

export interface StaffRoleDeleteParam {
  personalId: string;
  roleId: string;
}

export interface StaffLeaderParam {
  id: string;
  leaderCode: string;
}

export interface StaffListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

/**
 * @description: Request list return value
 */
export type StaffListGetResultModel = BasicFetchResult<StaffListItem>;
