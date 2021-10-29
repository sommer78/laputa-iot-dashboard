-- ----------------------------
-- Records of sys_menu
-- ----------------------------
routes.system.menu.edit
routes.system.role.edit
routes.system.dept.edit
routes.manage.dict.add
routes.manage.param.manage
routes.monitor.server
/manage/dict
routes.monitor.server
routes.workflow.holiday.

INSERT INTO `sys_menu` VALUES (3600, '任务日志', '', '/governance/job-log/index', 3000, 'icon-gtsquanjushiwufuwuGTS', 8, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:57:37', '0', 1);

INSERT INTO `sys_menu` VALUES (3700, '注册配置', NULL, '', 3000, 'icon-line', 10, '0', '0', '2018-01-25 11:08:52', '2020-03-24 08:57:37', '1', 1);
INSERT INTO `sys_menu` VALUES (4000, '协同管理', NULL, '/activti', -1, 'icon-kuaisugongzuoliu_o', 3, '0', '0', '2018-09-26 01:38:13', '2020-03-24 08:57:39', '0', 1);

INSERT INTO `sys_menu` VALUES (4100, '模型管理', NULL, '/activiti/index', 4000, 'icon-weibiaoti13', 1, '0', '0', '2018-09-26 01:39:07', '2020-03-24 08:57:40', '0', 1);
INSERT INTO `sys_menu` VALUES (4101, '模型管理', 'act_model_manage', NULL, 4100, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:57:41', '0', 1);
INSERT INTO `sys_menu` VALUES (4200, '流程管理', '/activiti/process', '/activiti/process', 4000, 'icon-liucheng', 2, '0', '0', '2018-09-26 06:41:05', '2020-03-24 08:57:42', '0', 1);
INSERT INTO `sys_menu` VALUES (4201, '流程管理', 'act_process_manage', NULL, 4200, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:57:42', '0', 1);

INSERT INTO `sys_menu` VALUES (4300, '请假管理', '/activiti/leave', '/activiti/leave', 4000, 'icon-qingjia', 3, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:57:43', '0', 1);
INSERT INTO `sys_menu` VALUES (4301, '请假新增', 'act_leavebill_add', NULL, 4300, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:57:44', '0', 1);
INSERT INTO `sys_menu` VALUES (4302, '请假修改', 'act_leavebill_edit', NULL, 4300, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:57:45', '0', 1);
INSERT INTO `sys_menu` VALUES (4303, '请假删除', 'act_leavebill_del', NULL, 4300, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:57:46', '0', 1);
INSERT INTO `sys_menu` VALUES (4400, '待办任务', '/activiti/task', '/activiti/task', 4000, 'icon-renwu', 4, '0', '0', '2018-09-27 09:52:31', '2020-03-24 08:57:48', '0', 1);
INSERT INTO `sys_menu` VALUES (4401, '流程管理', 'act_task_manage', NULL, 4400, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:57:50', '0', 1);

routes.pay.manage.
routes.pay.channel.manage
routes.pay.cashier
routes.pay.goods.add
routes.pay.orders.manage
INSERT INTO `sys_menu` VALUES (5000, '支付管理', NULL, '/pay', -1, 'icon-pay6zhifu', 4, '0', '0', '2019-05-30 15:28:03', '2020-03-24 08:57:51', '0', 1);
INSERT INTO `sys_menu` VALUES (5100, '渠道管理', NULL, '/pay/paychannel/index', 5000, 'icon-zhifuqudaoguanli', 1, '0', '0', '2019-05-30 15:32:17', '2020-03-24 08:57:52', '0', 1);
INSERT INTO `sys_menu` VALUES (5110, '增加渠道', 'pay_paychannel_add', NULL, 5100, NULL, 1, '0', '1', '2019-05-30 15:46:14', '2020-03-24 08:58:07', '0', 1);
INSERT INTO `sys_menu` VALUES (5120, '编辑渠道', 'pay_paychannel_edit', NULL, 5100, NULL, 1, '0', '1', '2019-05-30 15:46:35', '2020-03-24 08:58:08', '0', 1);
INSERT INTO `sys_menu` VALUES (5130, '删除渠道', 'pay_paychannel_del', NULL, 5100, NULL, 1, '0', '1', '2019-05-30 15:47:08', '2020-03-24 08:58:09', '0', 1);
INSERT INTO `sys_menu` VALUES (5200, '收银台', NULL, '/pay/cd/index', 5000, 'icon-shouyintai', 0, '0', '0', '2019-05-30 19:44:00', '2020-03-24 08:58:09', '0', 1);

INSERT INTO `sys_menu` VALUES (5300, '商品订单', '', '/pay/goods/index', 5000, 'icon-dingdan', 2, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:10', '0', 1);
INSERT INTO `sys_menu` VALUES (5310, '商品订单新增', 'generator_paygoodsorder_add', NULL, 5300, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:11', '0', 1);
INSERT INTO `sys_menu` VALUES (5320, '商品订单修改', 'generator_paygoodsorder_edit', NULL, 5300, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:13', '0', 1);
INSERT INTO `sys_menu` VALUES (5330, '商品订单删除', 'generator_paygoodsorder_del', NULL, 5300, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:14', '0', 1);

INSERT INTO `sys_menu` VALUES (5400, '支付订单', '', '/pay/orders/index', 5000, 'icon-zhifu', 3, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:14', '0', 1);
INSERT INTO `sys_menu` VALUES (5410, '支付订单新增', 'generator_paytradeorder_add', NULL, 5400, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:15', '0', 1);
INSERT INTO `sys_menu` VALUES (5420, '支付订单修改', 'generator_paytradeorder_edit', NULL, 5400, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:16', '0', 1);
INSERT INTO `sys_menu` VALUES (5430, '支付订单删除', 'generator_paytradeorder_del', NULL, 5400, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:18', '0', 1);
INSERT INTO `sys_menu` VALUES (5500, '回调记录', '', '/pay/notify/index', 5000, 'icon-huitiao', 4, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:19', '0', 1);
INSERT INTO `sys_menu` VALUES (5510, '记录新增', 'generator_paynotifyrecord_add', NULL, 5500, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:19', '0', 1);
INSERT INTO `sys_menu` VALUES (5520, '记录修改', 'generator_paynotifyrecord_edit', NULL, 5500, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:20', '0', 1);
INSERT INTO `sys_menu` VALUES (5530, '记录删除', 'generator_paynotifyrecord_del', NULL, 5500, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:21', '0', 1);

INSERT INTO `sys_menu` VALUES (6000, '微信管理', NULL, '/mp', -1, 'icon-gongzhonghao', 4, '0', '0', '2018-09-26 01:38:13', '2020-03-24 08:58:21', '0', 1);
INSERT INTO `sys_menu` VALUES (6100, '账号管理', '', '/mp/wxaccount/index', 6000, 'icon-weixincaidan', 8, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:22', '0', 1);
INSERT INTO `sys_menu` VALUES (6101, '公众号新增', 'mp_wxaccount_add', '', 6100, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:23', '0', 1);
INSERT INTO `sys_menu` VALUES (6102, '公众号修改', 'mp_wxaccount_edit', NULL, 6100, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:23', '0', 1);
INSERT INTO `sys_menu` VALUES (6103, '公众号删除', 'mp_wxaccount_del', NULL, 6100, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:25', '0', 1);
INSERT INTO `sys_menu` VALUES (6200, '粉丝管理', '', '/mp/wxaccountfans/index', 6000, 'icon-fensiguanli', 8, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:26', '0', 1);
INSERT INTO `sys_menu` VALUES (6201, '粉丝新增', 'mp_wxaccountfans_add', NULL, 6200, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:27', '0', 1);
INSERT INTO `sys_menu` VALUES (6202, '粉丝修改', 'mp_wxaccountfans_edit', NULL, 6200, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:30', '0', 1);
INSERT INTO `sys_menu` VALUES (6203, '粉丝删除', 'mp_wxaccountfans_del', NULL, 6200, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:31', '0', 1);
INSERT INTO `sys_menu` VALUES (6204, '粉丝同步', 'mp_wxaccountfans_sync', NULL, 6200, '1', 3, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:31', '0', 1);
INSERT INTO `sys_menu` VALUES (6300, '消息管理', '', '/mp/wxfansmsg/index', 6000, 'icon-xiaoxiguanli', 8, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:31', '0', 1);
INSERT INTO `sys_menu` VALUES (6301, '消息新增', 'mp_wxmsg_add', NULL, 6300, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:32', '0', 1);
INSERT INTO `sys_menu` VALUES (6302, '消息修改', 'mp_wxmsg_edit', NULL, 6300, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:33', '0', 1);
INSERT INTO `sys_menu` VALUES (6303, '消息删除', 'mp_wxmsg_del', NULL, 6300, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:33', '0', 1);
INSERT INTO `sys_menu` VALUES (6400, '菜单设置', NULL, '/mp/wxmenu/index', 6000, 'icon-anniu_weixincaidanlianjie', 6, '0', '0', '2019-03-29 15:20:12', '2020-03-24 08:58:38', '0', 1);
INSERT INTO `sys_menu` VALUES (6401, '保存', 'mp_wxmenu_add', NULL, 6400, NULL, 1, '0', '1', '2019-03-29 15:43:22', '2020-03-24 08:58:38', '0', 1);
INSERT INTO `sys_menu` VALUES (6402, '发布', 'mp_wxmenu_push', NULL, 6400, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (6403, '删除', 'mp_wxmenu_del', NULL, 6400, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (6500, '运营数据', NULL, '/mp/wxstatistics/index', 6000, 'icon-zhexiantu', 7, '0', '0', '2019-04-14 00:15:35', '2020-03-24 08:58:40', '0', 1);
INSERT INTO `sys_menu` VALUES (6600, '素材管理', NULL, '/mp/wxmaterial/index', 6000, 'icon-sucaisads', 999, '0', '0', '2020-04-27 15:25:17', '2020-05-09 03:16:13', '0', 1);
INSERT INTO `sys_menu` VALUES (6601, '素材维护', 'mp_wxmaterial_add', NULL, 6600, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (6602, '素材删除', 'mp_wxmaterial_del', NULL, 6600, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (6700, '自动回复', NULL, '/mp/wxautoreply/index', 6000, 'icon-huifu', 998, '0', '0', '2020-04-27 15:25:17', '2020-05-09 03:16:16', '0', 1);
INSERT INTO `sys_menu` VALUES (6701, '新增回复', 'mp_wxautoreply_add', NULL, 6700, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (6702, '编辑回复', 'mp_wxautoreply_edit', NULL, 6700, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (6703, '删除回复', 'mp_wxautoreply_del', NULL, 6700, NULL, 1, '0', '1', '2019-03-29 15:43:54', '2020-03-24 08:58:39', '0', 1);
INSERT INTO `sys_menu` VALUES (7000, '报表设计', NULL, '/report/ureport/designer', -1, 'icon-icon-p_mrpbaobiao', 9, '0', '0', '2019-08-12 09:35:16', '2021-07-22 06:53:27', '0', 1);
INSERT INTO `sys_menu` VALUES (8000, '文件管理', NULL, '/admin/file/index', 2000, 'icon-wenjianguanli', 6, '0', '0', '2019-06-25 12:44:46', '2020-03-24 08:58:41', '0', 1);
INSERT INTO `sys_menu` VALUES (8001, '删除文件', 'sys_file_del', NULL, 8000, NULL, 1, '0', '1', '2019-06-25 13:41:41', '2020-03-24 08:58:42', '0', 1);
routes.gen.form.manage
INSERT INTO `sys_menu` VALUES (9000, '开发平台', NULL, '/gen', -1, 'icon-shejiyukaifa-', 9, '0', '0', '2019-08-12 09:35:16', '2020-03-24 08:58:48', '0', 1);
routes.gen.datasource

INSERT INTO `sys_menu` VALUES (9001, '表单管理', '', '/gen/form', 9000, 'icon-record', 3, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:58:44', '0', 1);
INSERT INTO `sys_menu` VALUES (9002, '表单新增', 'gen_form_add', NULL, 9001, '1', 0, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:45', '0', 1);
INSERT INTO `sys_menu` VALUES (9003, '表单修改', 'gen_form_edit', NULL, 9001, '1', 1, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:46', '0', 1);
INSERT INTO `sys_menu` VALUES (9004, '表单删除', 'gen_form_del', NULL, 9001, '1', 2, '0', '1', '2018-05-15 21:35:18', '2020-03-24 08:58:47', '0', 1);
INSERT INTO `sys_menu` VALUES (9005, '数据源管理', NULL, '/gen/datasource', 9000, 'icon-mysql', 0, '0', '0', '2019-08-12 09:42:11', '2020-03-24 08:58:49', '0', 1);
INSERT INTO `sys_menu` VALUES (9006, '表单设计', NULL, '/gen/design', 9000, 'icon-biaodanbiaoqian', 2, '0', '0', '2019-08-16 10:08:56', '2020-03-24 08:58:53', '0', 1);
INSERT INTO `sys_menu` VALUES (2300, '代码生成', '', '/gen/index', 9000, 'icon-weibiaoti46', 1, '0', '0', '2018-01-20 13:17:19', '2020-03-24 08:57:14', '0', 1);
