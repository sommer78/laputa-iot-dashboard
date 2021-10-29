<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button  @click="handleCreate"> 新建任务 </a-button>
        <Tooltip title="暂停全部运行状态的定时任务" placement="top">
          <a-button  type="primary" @click="shutdownJobs"> 暂停全部任务 </a-button>
        </Tooltip>
        <Tooltip title="启动全部暂停状态的定时任务" placement="top">
          <a-button  type="primary" @click="startJobs"> 启动全部任务 </a-button>
        </Tooltip>
        <Tooltip title="谨慎使用" placement="top">
          <a-button  type="primary" @click="refreshJobs">重置全部任务 </a-button>
        </Tooltip>
      </template>

      <template #jobStatus="{ record }">
        <div v-if="record.jobStatus === '1'">
          <Tag color="blue">{{ getDicNameJobStatus(record.jobStatus) }}</Tag>
        </div>
        <div v-else-if="record.jobStatus === '2'">
          <Tag color="green">{{ getDicNameJobStatus(record.jobStatus) }}</Tag>
        </div>
        <div v-else-if="record.jobStatus === '3'">
          <Tag color="red">{{ getDicNameJobStatus(record.jobStatus) }}</Tag>
        </div>
      </template>

      <template #jobExecuteStatus="{ record }">
        <div v-if="record.jobExecuteStatus === '0'">
          <Tag color="green">{{ getDicNameJobExecuteStatus(record.jobExecuteStatus) }}</Tag>
        </div>
        <div v-else>
          <Tag color="red">{{ getDicNameJobExecuteStatus(record.jobExecuteStatus) }}</Tag>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'mdi:post',
              onClick: handleJobLog.bind(null, record),
            },
            {
              icon: 'codicon:debug-start',
              onClick: handleStartJob.bind(null, record),
            },
            {
              icon: 'ant-design:pause-circle-twotone',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'carbon:run',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',

              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <JobDrawer @register="registerDrawer" @success="handleSuccess" />
    <JobModal @register="registerModel" :minHeight="100" useWrapper width="80%" />
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, unref } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import {
  fetchList,
  deleteById,
  //   isValidTaskName,
  refreshJobsRa,
  // runJobRa,
  // shutDownJobRa,
  shutdownJobsRa,
  startJobRa,
  startJobsRa,
} from '/@/api/job/job';
import { dictType } from '/@/api/upms/dict';

import { useDrawer } from '/@/components/Drawer';
import JobDrawer from './JobDrawer.vue';
import { columns, searchFormSchema } from './job.data';
import JobModal from './JobModal.vue';
import { useModal } from '/@/components/Modal';
import { useContextMenu } from '/@/hooks/web/useContextMenu';
import { DictItemModel } from '/@/api/upms/model/DictModel';
import { Tag, Tooltip, } from 'ant-design-vue';
import { useGo } from '/@/hooks/web/usePage';
export default defineComponent({
  name: 'JobManagement',
  components: { BasicTable, JobDrawer, TableAction, JobModal, Tag, Tooltip,  },
  setup() {
    const { t } = useI18n();
    let JobExecuteStatusDicCache: DictItemModel[] = [];
    let JobStatusDicCache: DictItemModel[] = [];

    const { notification, createConfirm } = useMessage();
    const box = ref('');
    const go = useGo();
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [createContextMenu] = useContextMenu();
    const [registerModel, { openModal }] = useModal();
    const [registerTable, { reload, expandAll, }] = useTable({
      title: '定时任务调度表列表',
      api: fetchList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        showAdvancedButton: true,
        actionColOptions: {
          span: 8,
        },
      },
      isTreeTable: true,
      pagination: { pageSize: 10 },
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      rowSelection: { type: 'checkbox', onSelect: onSelect },
      actionColumn: {
        width: 250,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
      },
    });

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }

    function handleEdit(row: Recordable) {
    
      openDrawer(true, {
        isUpdate: true,
        record: row,
      });
    }

    function onSelect(e) {
      const ds = unref(e);
      console.log(ds);
    }

    async function handleDelete(record: Recordable) {
      const result = await deleteById(record.id);
      if (result) {
        handleSuccess();
        notification.success({
          message: '成功了',
          description: '删除成功',
          duration: 3,
        });
      }
    }

    function contextmenu(record, index, e: MouseEvent) {
      createContextMenu({
        event: e,
        items: [
          {
            label: '查看',
            icon: 'ant-design:fund-view-outlined',
            handler: () => {
              openModal(true, {
                data: record,
                index: index,
              });
            },
          },
        ],
      });
    }

    function handleSuccess() {
      reload();
    }

    function shutdownJobs() {
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: '即将暂停全部运行中定时任务, 是否继续?',
        onOk: async () => {
          shutdownJobsRa()
            .then((data) => {
              if (data) {
                handleSuccess();
                notification.success({
                  message: '暂停成功',
                  duration: 3,
                });
              } else {
                notification.error({
                  message: '暂停失败',

                  duration: 3,
                });
              }
            })
            .catch(() => {
              notification.error({
                message: '暂停失败',

                duration: 3,
              });
            });
        },
      });
    }

    /**
     * 启动全部暂停定时任务
     */
    function startJobs() {
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: '即将启动全部暂定中定时任务, 是否继续?',
        onOk: async () => {
          startJobsRa()
            .then((data) => {
              if (data) {
                handleSuccess();
                notification.success({
                  message: '启动成功',
                  duration: 3,
                });
              } else {
                notification.error({
                  message: '启动失败',

                  duration: 3,
                });
              }
            })
            .catch(() => {
              notification.error({
                message: '启动失败',

                duration: 3,
              });
            });
        },
      });
    }
    /**
     * 刷新定时任务
     */
    function refreshJobs() {
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: '即将刷新全部定时任务, 是否继续?',
        onOk: async () => {
          refreshJobsRa()
            .then((data) => {
              if (data) {
                handleSuccess();
                notification.success({
                  message: '重置成功',
                  duration: 3,
                });
              } else {
                notification.error({
                  message: '重置失败',

                  duration: 3,
                });
              }
            })
            .catch(() => {
              notification.error({
                message: '重置失败',

                duration: 3,
              });
            });
        },
      });
    }
    /**
     * 启动定时任务
     */
    function handleStartJob(row) {
      const jobStatus = row.jobStatus;
      if (jobStatus === '1' || jobStatus === '3') {
        createConfirm({
          iconType: 'warning',
          title: t('sys.app.logoutTip'),
          content: '即将发布或启动(任务名称:' + row.jobName + '), 是否继续?',
          onOk: async () => {
            startJobRa(row.jobId)
              .then((data) => {
                if (data) {
                  handleSuccess();
                  notification.success({
                    message: '启动成功',
                    duration: 3,
                  });
                } else {
                  notification.error({
                    message: '启动失败',

                    duration: 3,
                  });
                }
              })
              .catch(() => {
                notification.error({
                  message: '启动失败',

                  duration: 3,
                });
              });
          },
        });
      } else {
        notification.error({
          message: '定时任务已运行',

          duration: 3,
        });
      }
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(expandAll);
    }
    onMounted(async () => {
      await getDicJobExecuteStatusCache('job_execute_status'); // 获取定时任务运行时状态
      await getDicJobStatusCache('job_status'); // 获取定时任务状态
    });

    /**
     * 获取字典显示名称并缓存
     */
    async function getDicJobExecuteStatusCache(type) {
      await dictType(type).then((data) => {
        JobExecuteStatusDicCache = data;
      });
    }
    /**
     * 获取字典显示名称并缓存
     */
    async function getDicJobStatusCache(type) {
      await dictType(type).then((data) => {
        JobStatusDicCache = data;
      });
    }
    /**
     * 获取字典定时任务执行状态字典值显示名称
     */
    function getDicNameJobExecuteStatus(value) {
      let re = '';
      JobExecuteStatusDicCache.forEach((obj) => {
        if (obj.value === value) {
          re = obj.label;
          return;
        }
      });
      return re;
    }
    /**
     * 获取字典定时任务状态字典值显示名称
     */
    function getDicNameJobStatus(value) {
      let re = '';
      JobStatusDicCache.forEach((obj) => {
        if (obj.value === value) {
          re = obj.label;
          return;
        }
      });
      return re;
    }

    function handleJobLog(record) {
      //  console.log(record)
      go('/job-log/' + record.jobId);
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      onFetchSuccess,
      box,
      onSelect,
      contextmenu,
      registerModel,
      openModal,
      getDicJobExecuteStatusCache,
      getDicJobStatusCache,
      getDicNameJobExecuteStatus,
      getDicNameJobStatus,
      shutdownJobs,
      startJobs,
      refreshJobs,
      handleJobLog,
      handleStartJob,
    };
  },
});
</script>

