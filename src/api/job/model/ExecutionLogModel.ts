export interface ExecutionLogModel {
  path: string;
  component: any;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
 
}