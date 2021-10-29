import { BasicFetchResult } from '/@/api/model/baseModel';

export type CompanyParams = {
  keyword?: string;
};

export type CompanyInfo = {
  id: Number;
  pid: Number;
  name: string;
  shortName: string;
  status: Number;
  tName: string;
  orderNo: Number;
  code: string;
  descr: string;
  pcode: string;
  userName: string;
};

export interface CompanyListItem extends CompanyInfo {
  id: Number;
}

/**
 * @description: Get menu interface
 */
export interface DeleteByIdsParams {
  appIds: [];
}

/**
 * @description: Request list return value
 */

export type CompanyListGetResultModel = BasicFetchResult<CompanyListItem>;
