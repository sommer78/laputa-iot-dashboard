import {defHttp} from '/@/utils/http/axios';
import { getPageParam } from '/@/utils/util';
import {

  MailListGetResultModel,
  MailPageParams
} from "./model/mailModel";


enum Api {
  MailPageList = '/msg/mail/page',
  MailPageListShowRows = '/msg/mail/getPageShowRoles',
  SaveOrUpdate = '/msg/mail/saveOrUpdate',
  Delete = '/msg/mail/delete',
  CheckEntityExist = '/msg/mail/checkEntityExist',
}

export const getMailPageList = (params: MailPageParams) =>{
  const url = Api.MailPageList;
  console.log('getMailPageList',params);
  return defHttp.get<MailListGetResultModel>({ url,  params: getPageParam(params) });
}


