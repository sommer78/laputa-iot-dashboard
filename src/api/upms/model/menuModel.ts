import type { RouteMeta } from 'vue-router';
import { BasicPageParams } from '/@/api/model/baseModel';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}
export type MenuParams = {
  name?: string;
  deleted?: string;
};

export type MenuPageParams = BasicPageParams & MenuParams;
/**
 * @description: Get menu return value
 */
export type MenuResultModel = RouteItem[];
