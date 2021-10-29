export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T[];
  total: number;
}



export interface CheckExistParams {
  id: number;
  field: string;
  fieldName: string;
  fieldValue: string;
}


export interface ResultPageParams<T extends any>  {
  page: number;
  pageSize: number;
  records: T[];
}



export interface BasicPageSearchParams<T extends any> {
  query: BasicPageParams;
  entity: T;
}


export interface ListItem {
  id: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}