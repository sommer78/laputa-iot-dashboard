interface WidgetBaseOptions {
  /*** 控件宽度, 默认 '100%' */
  width?: string | number
  /***
   * 控件默认值
   * 单行文本/多行文本: 空字符串
   * 计数器: 数字
   * 多选框组: 多选数组
   * 评分: 数字 | null
   * 开关: boolean
   */
  defaultValue?: string | number | any[] | null | boolean
  required?: boolean
  defaultType?: string
  requiredMessage?: string
  pattern?: string
  placeholder?: string
  remote?: boolean
  remoteType?: 'option' | 'func'
  remoteOption?: string
  remoteOptions?: any[]
  remoteFunc?: string
  customClass?: string
  disabled?: boolean
  labelWidth?: string | number
  isLabelWidth?: boolean
  hidden?: boolean
  readonly?: boolean
  editable?: boolean
  clearable?: boolean
  dataBind?: boolean
  multiple?: boolean
  props?: {
    value?: string
    label?: string
    children?: string
  }
}

// 单行文本参数
interface InputWidgetOptions {
  /*** 输入框的类型 -- text，textarea 和其他 原生 input 的 type 值 */
  dataType?: string
  /*** 是否开启校验输入框类型 */
  dataTypeCheck?: boolean
  /*** 校验输入框类型的错误信息 */
  dataTypeMessage?: string
  patternCheck?: boolean
  patternMessage?: string
  showPassword?: boolean
}

// 多行文本参数
interface TextareaWidgetOptions {
  patternMessage?: string
}

// 计数器参数
interface NumberWidgetOptions {
  min?: number
  max?: number
  step?: number
  controlsPosition?: string
}

// 单选框组 && 多选框组参数
interface RadioWidgetOptions {
  inline?: boolean
  showLabel?: boolean
  // TODO 泛型规定 value 值 === label 值
  options?: { value: string; label?: string }[]
}

// 日期时间参数
interface DatetimeWidgetOptions {
  startPlaceholder?: string
  endPlaceholder?: string
  isRange?: boolean
  arrowControl?: boolean
  format?: string
  type?: string
  timestamp?: boolean
}

// 评分参数
interface RateWidgetOptions {
  allowHalf?: boolean
  showScore?: boolean
}

// 下拉框参数
interface SelectWidgetOptions {
  filterable?: boolean
}

// 取色器参数
interface ColorWidgetOptions {
  showAlpha?: boolean
}

// 滑块参数
interface SliderWidgetOptions {
  showInput?: boolean
  range?: boolean
}

// 自定义组件参数
interface ComponentWidgetOptions {
  template?: string
}

// 文件上传参数
interface FileUploadWidgetOptions {
  tokenFunc?: string
  token?: string
  domain?: string
  tip?: string
  action?: string
  limit?: string | number
  isQiniu?: boolean
  headers?: any[]
  size?: {
    width: number
    height: number
  }
  isDelete?: boolean
  isEdit?: boolean
}

// 编辑器参数
// TODO 使用哪个富文本编辑器,结构改成对应的结构
interface EditorWidgetOptions {
  customToolbar?: any[]
}

// 栅格布局参数
interface GridWidgetOptions {
  gutter?: number
  justify?: string
  align?: string
  flex?: boolean
  responsive?: boolean
}

// 标签页参数
interface TabsWidgetOptions {
  tabPosition?: 'top' | 'right' | 'bottom' | 'left'
}

// 分割线参数
interface DividerWidgetOptions {
  contentPosition?: 'left' | 'right' | 'center'
}

type WidgetOptions = WidgetBaseOptions &
  InputWidgetOptions &
  TextareaWidgetOptions &
  NumberWidgetOptions &
  RadioWidgetOptions &
  DatetimeWidgetOptions &
  RateWidgetOptions &
  ColorWidgetOptions &
  SelectWidgetOptions &
  SliderWidgetOptions &
  ComponentWidgetOptions &
  FileUploadWidgetOptions &
  EditorWidgetOptions &
  GridWidgetOptions &
  TabsWidgetOptions &
  DividerWidgetOptions

export interface GridColumns {
  span: number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  list: any[]
}

export interface Widget {
  /*** 控件唯一标识 */
  key?: string
  /*** 控件类型 */
  type: string
  /*** 左侧控件列表显示的控件图标 */
  icon?: string
  /*** 栅格布局列结构数据 */
  columns?: GridColumns[]
  /*** 子表单数据结构 */
  tableColumns?: any[]
  tabs?: { label: string; name: string; list: any[] }[]
  // 默认的规则
  rules?: any[]
  options: WidgetOptions
}

export interface WidgetForm {
  list: Widget[] // TODO list 类
  config: {
    labelWidth: number
    labelPosition: 'left' | 'right' | 'top'
    size: 'medium' | 'small' | 'mini'
    layout: 'horizontal' | 'vertical'
    customClass: string
    labelCol: number
    width: string
  }
}
