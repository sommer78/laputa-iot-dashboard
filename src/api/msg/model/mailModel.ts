import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type MailParams = BasicPageParams & {
  keyword?: string;
};

export type MailPageParams = BasicPageParams & MailParams;

export interface MailInfo {
  id:  any;   /*主键ID */
  title:  any;   /*主题 */
  content:  any;   /*内容 */
  describe:  any;   /*简单描述 */
  isstar:  any;   /*星标邮件 0普通 1星级 */
  senderName:  any;   /*发送者 */
  receiveUser:  any;   /*收件人id */
  receiveName:  any;   /*收件人 */
  receiveDate:  any;   /*接收时间 */
  isInner:  any;   /*内部邮箱，默认是0 1是外部 */
  senderMail:  any;   /*发送者邮箱 */
  receiveMail:  any;   /*接收者邮箱 */
  readDate:  any;   /*阅读时间 */
  status:  number;   /*状态码  0: 未读,1: 已读,2: 已回复,3: 已转发 */
  fileCount:  number;   /*附件数 */
  size:  number;   /*内容大小 */
  isAudio:  any;   /*是否语音邮箱 0正常 1语音 */
  isDraft:  any;   /*是否草稿 0草稿 1正式 */
  deleted:  any;   /*是否删除 0正常 1删除 */
  createUser:  any;   /*创建人id */
  createTime:  any;   /*创建时间 */
}



export interface MailListItem {
  id:  any;   /*主键ID */
  title:  any;   /*主题 */
  content:  any;   /*内容 */
  describe:  any;   /*简单描述 */
  isstar:  any;   /*星标邮件 0普通 1星级 */
  senderName:  any;   /*发送者 */
  receiveUser:  any;   /*收件人id */
  receiveName:  any;   /*收件人 */
  receiveDate:  any;   /*接收时间 */
  isInner:  any;   /*内部邮箱，默认是0 1是外部 */
  senderMail:  any;   /*发送者邮箱 */
  receiveMail:  any;   /*接收者邮箱 */
  readDate:  any;   /*阅读时间 */
  status:  number;   /*状态码  0: 未读,1: 已读,2: 已回复,3: 已转发 */
  fileCount:  number;   /*附件数 */
  size:  number;   /*内容大小 */
  isAudio:  any;   /*是否语音邮箱 0正常 1语音 */
  isDraft:  any;   /*是否草稿 0草稿 1正式 */
  deleted:  any;   /*是否删除 0正常 1删除 */
  createUser:  any;   /*创建人id */
  createTime:  any;   /*创建时间 */
}

export interface MailModel {
  id:  any;   /*主键ID */
  title:  any;   /*主题 */
  content:  any;   /*内容 */
  describe:  any;   /*简单描述 */
  isstar:  any;   /*星标邮件 0普通 1星级 */
  senderName:  any;   /*发送者 */
  receiveUser:  any;   /*收件人id */
  receiveName:  any;   /*收件人 */
  receiveDate:  any;   /*接收时间 */
  isInner:  any;   /*内部邮箱，默认是0 1是外部 */
  senderMail:  any;   /*发送者邮箱 */
  receiveMail:  any;   /*接收者邮箱 */
  readDate:  any;   /*阅读时间 */
  status:  number;   /*状态码  0: 未读,1: 已读,2: 已回复,3: 已转发 */
  fileCount:  number;   /*附件数 */
  size:  number;   /*内容大学 */
  isAudio:  any;   /*是否语音邮箱 0正常 1语音 */
  isDraft:  any;   /*是否草稿 0草稿 1正式 */
  deleted:  any;   /*是否删除 0正常 1删除 */
  createUser:  any;   /*创建人id */
  createTime:  any;   /*创建时间 */
}

/**
 * @description: Request list return value
 */
export type MailListGetResultModel = BasicFetchResult<MailListItem>;
