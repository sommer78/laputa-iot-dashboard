

export interface NoticeListItem {
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

export interface NoticeTabItem {
  key: string;
  name: string;
  list: NoticeListItem[];
  unreadlist?: NoticeListItem[];
}