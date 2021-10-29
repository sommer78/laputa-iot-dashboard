

/**
 * @description: Get DataSourceModel
 */
/*DataSourceModel*/
export interface DataSourceModel {
  id: number;
  name: string;
  dsType: string;
  confType: number;
  host: string;
  port: number;
  url: string;
  instance: string;
  dsName: string;
  username: string;
  password: string;
  createDate: string;
  updateDate: string;
  delFlag: string;
}

export interface GenModel {
  createTime: string;
  ENGINE: string;
  dbType: string;
  tableComment: string;
  tableName: string;
}