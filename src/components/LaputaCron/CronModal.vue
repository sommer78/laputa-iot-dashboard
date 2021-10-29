<template>
  <div class="vben-cron-div">
    <el-tabs type="border-card">
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> {{ t('cron.Seconds.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
          <el-row>
            <el-radio v-model="state.second.cronEvery" label="1">{{
              t('cron.Seconds.every')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.second.cronEvery" label="2"
              >{{ t('cron.Seconds.interval[0]') }}
              <el-input-number
                size="small"
                v-model="state.second.incrementIncrement"
                :min="1"
                :max="60"
              ></el-input-number>
              {{ t('cron.Seconds.interval[1]') || "" }}
              <el-input-number
                size="small"
                v-model="state.second.incrementStart"
                :min="0"
                :max="59"
              ></el-input-number>
              {{ t('cron.Seconds.interval[2]') || "" }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.second.cronEvery" label="3"
              >{{ t('cron.Seconds.specific') }}
              <el-select
                size="small"
                multiple
                v-model="state.second.specificSpecific"
              >
                <el-option
                  v-for="(val, index) in 60"
                  :key="index"
                  :value="val - 1"
                  >{{ val - 1 }}</el-option
                >
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.second.cronEvery" label="4"
              >{{ t('cron.Seconds.cycle[0]') }}
              <el-input-number
                size="small"
                v-model="state.second.rangeStart"
                :min="1"
                :max="60"
              ></el-input-number>
              {{ t('cron.Seconds.cycle[1]') || "" }}
              <el-input-number
                size="small"
                v-model="state.second.rangeEnd"
                :min="0"
                :max="59"
              ></el-input-number>
              {{ t('cron.Seconds.cycle[2]') || "" }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> {{ t('cron.Minutes.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
          <el-row>
            <el-radio v-model="state.minute.cronEvery" label="1">{{
              t('cron.Minutes.every')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.minute.cronEvery" label="2"
              >{{ t('cron.Minutes.interval[0]') }}
              <el-input-number
                size="small"
                v-model="state.minute.incrementIncrement"
                :min="1"
                :max="60"
              ></el-input-number>
              {{ t('cron.Minutes.interval[1]') }}
              <el-input-number
                size="small"
                v-model="state.minute.incrementStart"
                :min="0"
                :max="59"
              ></el-input-number>
              {{ t('cron.Minutes.interval[2]') || "" }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.minute.cronEvery" label="3"
              >{{ t('cron.Minutes.specific') }}
              <el-select
                size="small"
                multiple
                v-model="state.minute.specificSpecific"
              >
                <el-option
                  v-for="(val, index) in 60"
                  :key="index"
                  :value="val - 1"
                  >{{ val - 1 }}</el-option
                >
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.minute.cronEvery" label="4"
              >{{ t('cron.Minutes.cycle[0]') }}
              <el-input-number
                size="small"
                v-model="state.minute.rangeStart"
                :min="1"
                :max="60"
              ></el-input-number>
              {{ t('cron.Minutes.cycle[1]') }}
              <el-input-number
                size="small"
                v-model="state.minute.rangeEnd"
                :min="0"
                :max="59"
              ></el-input-number>
              {{ t('cron.Minutes.cycle[2]') }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> {{ t('cron.Hours.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
          <el-row>
            <el-radio v-model="state.hour.cronEvery" label="1">{{
              t('cron.Hours.every')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.hour.cronEvery" label="2"
              >{{ t('cron.Hours.interval[0]') }}
              <el-input-number
                size="small"
                v-model="state.hour.incrementIncrement"
                :min="0"
                :max="23"
              ></el-input-number>
              {{ t('cron.Hours.interval[1]') }}
              <el-input-number
                size="small"
                v-model="state.hour.incrementStart"
                :min="0"
                :max="23"
              ></el-input-number>
              {{ t('cron.Hours.interval[2]') }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.hour.cronEvery" label="3"
              >{{ t('cron.Hours.specific') }}
              <el-select size="small" multiple v-model="state.hour.specificSpecific">
                <el-option
                  v-for="(val, index) in 24"
                  :key="index"
                  :value="val - 1"
                  >{{ val - 1 }}</el-option
                >
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.hour.cronEvery" label="4"
              >{{ t('cron.Hours.cycle[0]') }}
              <el-input-number
                size="small"
                v-model="state.hour.rangeStart"
                :min="0"
                :max="23"
              ></el-input-number>
              {{ t('cron.Hours.cycle[1]') }}
              <el-input-number
                size="small"
                v-model="state.hour.rangeEnd"
                :min="0"
                :max="23"
              ></el-input-number>
              {{ t('cron.Hours.cycle[2]') }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> {{ t('cron.Day.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="1">{{
              t('cron.Day.every')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="2"
              >{{ t('cron.Day.intervalWeek[0]') }}
              <el-input-number
                size="small"
                v-model="state.week.incrementIncrement"
                :min="1"
                :max="7"
              ></el-input-number>
              {{ t('cron.Day.intervalWeek[1]') }}
              <el-select size="small" v-model="state.week.incrementStart">
                <el-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="val"
                ></el-option>
              </el-select>
              {{ t('cron.Day.intervalWeek[2]') }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="3"
              >{{ t('cron.Day.intervalDay[0]') }}
              <el-input-number
                size="small"
                v-model="state.day.incrementIncrement"
                :min="1"
                :max="31"
              ></el-input-number>
              {{ t('cron.Day.intervalDay[1]') }}
              <el-input-number
                size="small"
                v-model="state.day.incrementStart"
                :min="1"
                :max="31"
              ></el-input-number>
              {{ t('cron.Day.intervalDay[2]') }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.day.cronEvery" label="4"
              >{{ t('cron.Day.specificWeek') }}
              <el-select size="small" multiple v-model="state.week.specificSpecific">
                <el-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="
                    ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][val - 1]
                  "
                ></el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.day.cronEvery" label="5"
              >{{ t('cron.Day.specificDay') }}
              <el-select size="small" multiple v-model="state.day.specificSpecific">
                <el-option
                  v-for="(val, index) in 31"
                  :key="index"
                  :value="val"
                  >{{ val }}</el-option
                >
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="6">{{
              t('cron.Day.lastDay')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="7">{{
              t('cron.Day.lastWeekday')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="8"
              >{{ t('cron.Day.lastWeek[0]') }}
              <el-select size="small" v-model="state.day.cronLastSpecificDomDay">
                <el-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="val"
                ></el-option>
              </el-select>
              {{ t('cron.Day.lastWeek[1]') || "" }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="9">
              <el-input-number
                size="small"
                v-model="state.day.cronDaysBeforeEomMinus"
                :min="1"
                :max="31"
              ></el-input-number>
              {{ t('cron.Day.beforeEndMonth[0]') }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="10"
              >{{ t('cron.Day.nearestWeekday[0]') }}
              <el-input-number
                size="small"
                v-model="state.day.cronDaysNearestWeekday"
                :min="1"
                :max="31"
              ></el-input-number>
              {{ t('cron.Day.nearestWeekday[1]') }}
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.day.cronEvery" label="11"
              >{{ t('cron.Day.someWeekday[0]') }}
              <el-input-number
                size="small"
                v-model="state.week.cronNthDayNth"
                :min="1"
                :max="5"
              ></el-input-number>
              <el-select size="small" v-model="state.week.cronNthDayDay">
                <el-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="val"
                ></el-option>
              </el-select>
              {{ t('cron.Day.someWeekday[1]') }}
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> {{ t('cron.Month.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
          <el-row>
            <el-radio v-model="state.month.cronEvery" label="1">{{
              t('cron.Month.every')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.month.cronEvery" label="2"
              >{{ t('cron.Month.interval[0]') }}
              <el-input-number
                size="small"
                v-model="state.month.incrementIncrement"
                :min="0"
                :max="12"
              ></el-input-number>
              {{ t('cron.Month.interval[1]') }}
              <el-input-number
                size="small"
                v-model="state.month.incrementStart"
                :min="0"
                :max="12"
              ></el-input-number>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.month.cronEvery" label="3"
              >{{ t('cron.Month.specific') }}
              <el-select size="small" multiple v-model="state.month.specificSpecific">
                <el-option
                  v-for="(val, index) in 12"
                  :key="index"
                  :label="val"
                  :value="val"
                ></el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.month.cronEvery" label="4"
              >{{ t('cron.Month.cycle[0]') }}
              <el-input-number
                size="small"
                v-model="state.month.rangeStart"
                :min="1"
                :max="12"
              ></el-input-number>
              {{ t('cron.Month.cycle[1]') }}
              <el-input-number
                size="small"
                v-model="state.month.rangeEnd"
                :min="1"
                :max="12"
              ></el-input-number>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> {{ t('cron.Year.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
          <el-row>
            <el-radio v-model="state.year.cronEvery" label="1">{{
              t('cron.Year.every')
            }}</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.year.cronEvery" label="2"
              >{{ t('cron.Year.interval[0]') }}
              <el-input-number
                size="small"
                v-model="state.year.incrementIncrement"
                :min="1"
                :max="99"
              ></el-input-number>
              {{ t('cron.Year.interval[1]') }}
              <el-input-number
                size="small"
                v-model="state.year.incrementStart"
                :min="2018"
                :max="2118"
              ></el-input-number>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio class="long" v-model="state.year.cronEvery" label="3"
              >{{ t('cron.Year.specific') }}
              <el-select
                size="small"
                filterable
                multiple
                v-model="state.year.specificSpecific"
              >
                <el-option
                  v-for="(val, index) in 100"
                  :key="index"
                  :label="2017 + val"
                  :value="2017 + val"
                ></el-option>
              </el-select>
            </el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="state.year.cronEvery" label="4"
              >{{ t('cron.Year.cycle[0]') }}
              <el-input-number
                size="small"
                v-model="state.year.rangeStart"
                :min="2018"
                :max="2118"
              ></el-input-number>
              {{ t('cron.Year.cycle[1]') }}
              <el-input-number
                size="small"
                v-model="state.year.rangeEnd"
                :min="2018"
                :max="2118"
              ></el-input-number>
            </el-radio>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bottom">
      <div class="value">
        <span>
          cron预览:
        </span>
        <el-tag type="primary"> 
          {{ state.cron }}
        </el-tag>
        </div>
        <div class="buttonDiv">
      <el-button type="primary" size="mini" @click.stop="handleChange">{{ t('cron.Save') }}</el-button>
      <el-button type="primary" size="mini" @click="close">{{ t('cron.Close') }}</el-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, computed, } from 'vue';
// import { BasicModal, useModalInner } from '/@/components/Modal';

import {
  ElTabs,
  ElTabPane,
  ElTag,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElInputNumber,
  ElDivider,
  ElButton,
  ElRadio,
} from 'element-plus';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  name: 'CronModal',
  components: {
    ElTabs,
    ElTabPane,
    ElTag,
    ElRow,
    ElCol,
    ElButton,
    ElRadio,
    ElSelect,
    ElOption,
    ElInput,
    ElInputNumber,

    ElDivider,
    Icon,
  },
  emits: ['close', 'change'],
  props: {
    // cronValue
    cronValue: propTypes.string,
    // maxHeight
    maxHeight: propTypes.number,
  },
  setup(_, { emit }) {
    const { t } = useI18n();

    const state = reactive({
      visible: false,
      second: {
        cronEvery: '1',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 0,
        rangeEnd: 0,
        specificSpecific: [],
      },
      minute: {
        cronEvery: '1',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 0,
        rangeEnd: 0,
        specificSpecific: [],
      },
      hour: {
        cronEvery: '1',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 0,
        rangeEnd: 0,
        specificSpecific: [],
      },
      day: {
        cronEvery: '1',
        incrementStart: 1,
        incrementIncrement: 1,
        rangeStart: 0,
        rangeEnd: 0,
        specificSpecific: [],
        cronLastSpecificDomDay: 1,
        cronDaysBeforeEomMinus: 0,
        cronDaysNearestWeekday: 0,
      },
      week: {
        cronEvery: '1',
        incrementStart: 1,
        incrementIncrement: 1,
        specificSpecific: [],
        cronNthDayDay: 1,
        cronNthDayNth: 1,
      },
      month: {
        cronEvery: '1',
        incrementStart: 3,
        incrementIncrement: 5,
        rangeStart: 0,
        rangeEnd: 0,
        specificSpecific: [],
      },
      year: {
        cronEvery: '1',
        incrementStart: 2017,
        incrementIncrement: 1,
        rangeStart: 0,
        rangeEnd: 0,
        specificSpecific: [],
      },
      output: {
        second: '',
        minute: '',
        hour: '',
        day: '',
        month: '',
        Week: '',
        year: '',
      },
      text: '',
      secondsText: computed(() => {
        let seconds = '';
        let cronEvery = state.second.cronEvery;

        switch (cronEvery.toString()) {
          case '1':
            seconds = '*';
            break;
          case '2':
            seconds = state.second.incrementStart + '/' + state.second.incrementIncrement;
            break;
          case '3':
            state.second.specificSpecific.map((val) => {
              seconds += val + ',';
            });
            seconds = seconds.slice(0, -1);
            break;
          case '4':
            seconds = state.second.rangeStart + '-' + state.second.rangeEnd;
            break;
        }
        console.log(seconds);
        return seconds;
      }),
      minutesText: computed(() => {
        let minutes = '';
        let cronEvery = state.minute.cronEvery;
        switch (cronEvery.toString()) {
          case '1':
            minutes = '*';
            break;
          case '2':
            minutes = state.minute.incrementStart + '/' + state.minute.incrementIncrement;
            break;
          case '3':
            state.minute.specificSpecific.map((val) => {
              minutes += val + ',';
            });
            minutes = minutes.slice(0, -1);
            break;
          case '4':
            minutes = state.minute.rangeStart + '-' + state.minute.rangeEnd;
            break;
        }
        return minutes;
      }),
      hoursText: computed(() => {
        let hours = '';
        let cronEvery = state.hour.cronEvery;
        switch (cronEvery.toString()) {
          case '1':
            hours = '*';
            break;
          case '2':
            hours = state.hour.incrementStart + '/' + state.hour.incrementIncrement;
            break;
          case '3':
            state.hour.specificSpecific.map((val) => {
              hours += val + ',';
            });
            hours = hours.slice(0, -1);
            break;
          case '4':
            hours = state.hour.rangeStart + '-' + state.hour.rangeEnd;
            break;
        }
        return hours;
      }),
      daysText: computed(() => {
        let days = '';
        let cronEvery = state.day.cronEvery;
        switch (cronEvery.toString()) {
          case '1':
            break;
          case '2':
          case '4':
          case '11':
            days = '?';
            break;
          case '3':
            days = state.day.incrementStart + '/' + state.day.incrementIncrement;
            break;
          case '5':
            state.day.specificSpecific.map((val) => {
              days += val + ',';
            });
            days = days.slice(0, -1);
            break;
          case '6':
            days = 'L';
            break;
          case '7':
            days = 'LW';
            break;
          case '8':
            days = state.day.cronLastSpecificDomDay + 'L';
            break;
          case '9':
            days = 'L-' + state.day.cronDaysBeforeEomMinus;
            break;
          case '10':
            days = state.day.cronDaysNearestWeekday + 'W';
            break;
        }
        return days;
      }),
      weeksText: computed(() => {
        let weeks = '';
        let cronEvery = state.day.cronEvery;
        switch (cronEvery.toString()) {
          case '1':
          case '3':
          case '5':
            weeks = '?';
            break;
          case '2':
            weeks = state.week.incrementStart + '/' + state.week.incrementIncrement;
            break;
          case '4':
            state.week.specificSpecific.map((val) => {
              weeks += val + ',';
            });
            weeks = weeks.slice(0, -1);
            break;
          case '6':
          case '7':
          case '8':
          case '9':
          case '10':
            weeks = '?';
            break;
          case '11':
            weeks = state.week.cronNthDayDay + '#' + state.week.cronNthDayNth;
            break;
        }
        return weeks;
      }),
      monthsText: computed(() => {
        let months = '';
        let cronEvery = state.month.cronEvery;
        switch (cronEvery.toString()) {
          case '1':
            months = '*';
            break;
          case '2':
            months = state.month.incrementStart + '/' + state.month.incrementIncrement;
            break;
          case '3':
            state.month.specificSpecific.map((val) => {
              months += val + ',';
            });
            months = months.slice(0, -1);
            break;
          case '4':
            months = state.month.rangeStart + '-' + state.month.rangeEnd;
            break;
        }
        return months;
      }),
      yearsText: computed(() => {
        let years = '';
        let cronEvery = state.year.cronEvery;
        switch (cronEvery.toString()) {
          case '1':
            years = '*';
            break;
          case '2':
            years = state.year.incrementStart + '/' + state.year.incrementIncrement;
            break;
          case '3':
            state.year.specificSpecific.map((val) => {
              years += val + ',';
            });
            years = years.slice(0, -1);
            break;
          case '4':
            years = state.year.rangeStart + '-' + state.year.rangeEnd;
            break;
        }
        return years;
      }),
      cron: computed(() => {
        // console.log(state.secondsText);
        return `${state.secondsText || '*'} ${state.minutesText || '*'} ${state.hoursText || '*'} ${
          state.daysText || '*'
        } ${state.monthsText || '*'} ${state.weeksText || '?'} ${state.yearsText || '*'}`;
      }),
    });

    const getValue = () => {
      return state.cron;
    };

    const rest = (data) => {
      for (let i in data) {
        if (data[i] instanceof Object) {
          rest(data[i]);
        } else {
          switch (typeof data[i]) {
            case 'object':
              data[i] = [];
              break;
            case 'string':
              data[i] = '';
              break;
          }
        }
      }
    };


    // const [registerModal, { closeModal }] = useModalInner(async (data) => {
    //   console.log(data);
    // });

    const getTitle = computed(() => 'CronEdit');



    function handleCancel(e) {
      console.log('Clicked cancel button');
      state.visable = false;
    }

    const close = () => {
      emit('close')
    }
 

    const handleChange = () => {
      emit('change', state.cron)
      close()
    }
    return { t, 
    getTitle, 
    handleCancel, 
    state, 
    getValue, 
    rest, 
    close,
    handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.vue3-cron-div {
  .el-input-number__decrease, .el-input-number__increase {
    top: 2px !important
  }
  .el-tabs {
    box-shadow: none;
  }
  .tabBody {
    overflow: auto;

    .el-row {
      margin: 20px 0 !important;
      .long {
        .el-select {
          width: 350px;
        }
      }
      .el-input-number {
        width: 110px;
      }
    }
  }
  .myScroller {
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius   : 10px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
      );
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      background   : #ededed;
      border-radius: 10px;
    }
  }
  .bottom {
    width: 100%;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .value {
      float: left;
      font-size: 14px;
      vertical-align: middle;
      span:nth-child(1) {
        color: red
      }
    }
  }
}
</style>


