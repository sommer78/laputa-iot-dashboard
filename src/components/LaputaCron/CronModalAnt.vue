<template>
  <div class="vben-cron-div">
    <ATabs default-active-key="Second" type="card">
      <TabPane key="Second" :tab="t('cron.Seconds.name')">
        <div class="tabBody myScroller" :style="{ 'max-height': maxHeight }">
          <RadioGroup :default-value="1" v-model="state.second.cronEvery" @change="onSecondChange">
            <a-row>
              <Radio v-model="state.second.cronEvery" :value="1">{{
                t('cron.Seconds.every')
              }}</Radio>
            </a-row>
            <a-row>
              <Radio v-model="state.second.cronEvery" :value="2"
                >{{ t('cron.Seconds.interval[0]') }}
                <InputNumber
                  size="small"
                  v-model="state.second.incrementIncrement"
                  :min="1"
                  :max="60"
                ></InputNumber>
                {{ t('cron.Seconds.interval[1]') || '' }}
                <InputNumber
                  size="small"
                  v-model="state.second.incrementStart"
                  :min="0"
                  :max="59"
                ></InputNumber>
                {{ t('cron.Seconds.interval[2]') || '' }}
              </Radio>
            </a-row>
            <a-row>
              <Radio class="long" v-model="state.second.cronEvery" :value="3"
                >{{ t('cron.Seconds.specific') }}
                <a-select
                  size="small"
                  mode="multiple"
                  v-model="state.second.specificSpecific"
                  width="350"
                >
                  <a-select-option v-for="(val, index) in 60" :key="index" :value="val - 1">{{
                    val - 1
                  }}</a-select-option>
                </a-select>
              </Radio>
            </a-row>
            <a-row>
              <Radio v-model="state.second.cronEvery" :value="4"
                >{{ t('cron.Seconds.cycle[0]') }}
                <InputNumber
                  size="small"
                  v-model="state.second.rangeStart"
                  :min="1"
                  :max="60"
                ></InputNumber>
                {{ t('cron.Seconds.cycle[1]') || '' }}
                <InputNumber
                  size="small"
                  v-model="state.second.rangeEnd"
                  :min="0"
                  :max="59"
                ></InputNumber>
                {{ t('cron.Seconds.cycle[2]') || '' }}
              </Radio>
            </a-row>
          </RadioGroup>
        </div>
      </TabPane>
      <TabPane key="Minute" :tab="t('cron.Minutes.name')" forceRender>
        <div class="tabBody myScroller" :style="{ 'max-height': maxHeight }">
          <a-row>
            <a-radio v-model="state.minute.cronEvery" label="1">{{
              t('cron.Minutes.every')
            }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.minute.cronEvery" label="2"
              >{{ t('cron.Minutes.interval[0]') }}
              <a-input-number
                size="small"
                v-model="state.minute.incrementIncrement"
                :min="1"
                :max="60"
              ></a-input-number>
              {{ t('cron.Minutes.interval[1]') }}
              <a-input-number
                size="small"
                v-model="state.minute.incrementStart"
                :min="0"
                :max="59"
              ></a-input-number>
              {{ t('cron.Minutes.interval[2]') || '' }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio class="long" v-model="state.minute.cronEvery" label="3"
              >{{ t('cron.Minutes.specific') }}
              <a-select size="small" multiple v-model="state.minute.specificSpecific">
                <a-select-option v-for="(val, index) in 60" :key="index" :value="val - 1">{{
                  val - 1
                }}</a-select-option>
              </a-select>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.minute.cronEvery" label="4"
              >{{ t('cron.Minutes.cycle[0]') }}
              <a-input-number
                size="small"
                v-model="state.minute.rangeStart"
                :min="1"
                :max="60"
              ></a-input-number>
              {{ t('cron.Minutes.cycle[1]') }}
              <a-input-number
                size="small"
                v-model="state.minute.rangeEnd"
                :min="0"
                :max="59"
              ></a-input-number>
              {{ t('cron.Minutes.cycle[2]') }}
            </a-radio>
          </a-row>
        </div>
      </TabPane>
      <TabPane key="hour" :tab="t('cron.Hours.name')" forceRender>
        <div class="tabBody myScroller" :style="{ 'max-height': maxHeight }">
          <a-row>
            <a-radio v-model="state.hour.cronEvery" label="1">{{ t('cron.Hours.every') }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.hour.cronEvery" label="2"
              >{{ t('cron.Hours.interval[0]') }}
              <a-input-number
                size="small"
                v-model="state.hour.incrementIncrement"
                :min="0"
                :max="23"
              ></a-input-number>
              {{ t('cron.Hours.interval[1]') }}
              <a-input-number
                size="small"
                v-model="state.hour.incrementStart"
                :min="0"
                :max="23"
              ></a-input-number>
              {{ t('cron.Hours.interval[2]') }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio class="long" v-model="state.hour.cronEvery" label="3"
              >{{ t('cron.Hours.specific') }}
              <a-select size="small" multiple v-model="state.hour.specificSpecific">
                <a-select-option v-for="(val, index) in 24" :key="index" :value="val - 1">{{
                  val - 1
                }}</a-select-option>
              </a-select>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.hour.cronEvery" label="4"
              >{{ t('cron.Hours.cycle[0]') }}
              <a-input-number
                size="small"
                v-model="state.hour.rangeStart"
                :min="0"
                :max="23"
              ></a-input-number>
              {{ t('cron.Hours.cycle[1]') }}
              <a-input-number
                size="small"
                v-model="state.hour.rangeEnd"
                :min="0"
                :max="23"
              ></a-input-number>
              {{ t('cron.Hours.cycle[2]') }}
            </a-radio>
          </a-row>
        </div>
      </TabPane>
      <TabPane key="day" :tab="t('cron.Day.name')" forceRender>
        <div class="tabBody myScroller" :style="{ 'max-height': maxHeight }">
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="1">{{ t('cron.Day.every') }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="2"
              >{{ t('cron.Day.intervalWeek[0]') }}
              <a-input-number
                size="small"
                v-model="state.week.incrementIncrement"
                :min="1"
                :max="7"
              ></a-input-number>
              {{ t('cron.Day.intervalWeek[1]') }}
              <a-select size="small" v-model="state.week.incrementStart">
                <a-select-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="val"
                ></a-select-option>
              </a-select>
              {{ t('cron.Day.intervalWeek[2]') }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="3"
              >{{ t('cron.Day.intervalDay[0]') }}
              <a-input-number
                size="small"
                v-model="state.day.incrementIncrement"
                :min="1"
                :max="31"
              ></a-input-number>
              {{ t('cron.Day.intervalDay[1]') }}
              <a-input-number
                size="small"
                v-model="state.day.incrementStart"
                :min="1"
                :max="31"
              ></a-input-number>
              {{ t('cron.Day.intervalDay[2]') }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio class="long" v-model="state.day.cronEvery" label="4"
              >{{ t('cron.Day.specificWeek') }}
              <a-select size="small" multiple v-model="state.week.specificSpecific">
                <a-select-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][val - 1]"
                ></a-select-option>
              </a-select>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio class="long" v-model="state.day.cronEvery" label="5"
              >{{ t('cron.Day.specificDay') }}
              <a-select size="small" multiple v-model="state.day.specificSpecific">
                <a-select-option v-for="(val, index) in 31" :key="index" :value="val">{{
                  val
                }}</a-select-option>
              </a-select>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="6">{{ t('cron.Day.lastDay') }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="7">{{
              t('cron.Day.lastWeekday')
            }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="8"
              >{{ t('cron.Day.lastWeek[0]') }}
              <a-select size="small" v-model="state.day.cronLastSpecificDomDay">
                <a-select-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="val"
                ></a-select-option>
              </a-select>
              {{ t('cron.Day.lastWeek[1]') || '' }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="9">
              <a-input-number
                size="small"
                v-model="state.day.cronDaysBeforeEomMinus"
                :min="1"
                :max="31"
              ></a-input-number>
              {{ t('cron.Day.beforeEndMonth[0]') }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="10"
              >{{ t('cron.Day.nearestWeekday[0]') }}
              <a-input-number
                size="small"
                v-model="state.day.cronDaysNearestWeekday"
                :min="1"
                :max="31"
              ></a-input-number>
              {{ t('cron.Day.nearestWeekday[1]') }}
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.day.cronEvery" label="11"
              >{{ t('cron.Day.someWeekday[0]') }}
              <a-input-number
                size="small"
                v-model="state.week.cronNthDayNth"
                :min="1"
                :max="5"
              ></a-input-number>
              <a-select size="small" v-model="state.week.cronNthDayDay">
                <a-select-option
                  v-for="(val, index) in 7"
                  :key="index"
                  :label="t('cron.Week[val - 1]')"
                  :value="val"
                ></a-select-option>
              </a-select>
              {{ t('cron.Day.someWeekday[1]') }}
            </a-radio>
          </a-row>
        </div>
      </TabPane>
      <TabPane key="month" :tab="t('cron.Month.name')" forceRender>
        <template #label>
          <span><i class="a-icon-date"></i> {{ t('cron.Month.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{ 'max-height': maxHeight }">
          <a-row>
            <a-radio v-model="state.month.cronEvery" label="1">{{ t('cron.Month.every') }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.month.cronEvery" label="2"
              >{{ t('cron.Month.interval[0]') }}
              <a-input-number
                size="small"
                v-model="state.month.incrementIncrement"
                :min="0"
                :max="12"
              ></a-input-number>
              {{ t('cron.Month.interval[1]') }}
              <a-input-number
                size="small"
                v-model="state.month.incrementStart"
                :min="0"
                :max="12"
              ></a-input-number>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio class="long" v-model="state.month.cronEvery" label="3"
              >{{ t('cron.Month.specific') }}
              <a-select size="small" multiple v-model="state.month.specificSpecific">
                <a-select-option
                  v-for="(val, index) in 12"
                  :key="index"
                  :label="val"
                  :value="val"
                ></a-select-option>
              </a-select>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.month.cronEvery" label="4"
              >{{ t('cron.Month.cycle[0]') }}
              <a-input-number
                size="small"
                v-model="state.month.rangeStart"
                :min="1"
                :max="12"
              ></a-input-number>
              {{ t('cron.Month.cycle[1]') }}
              <a-input-number
                size="small"
                v-model="state.month.rangeEnd"
                :min="1"
                :max="12"
              ></a-input-number>
            </a-radio>
          </a-row>
        </div>
      </TabPane>
      <TabPane key="year" :tab="t('cron.Year.name')" forceRender>
        <template #label>
          <span><i class="a-icon-date"></i> {{ t('cron.Year.name') }}</span>
        </template>
        <div class="tabBody myScroller" :style="{ 'max-height': maxHeight }">
          <a-row>
            <a-radio v-model="state.year.cronEvery" label="1">{{ t('cron.Year.every') }}</a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.year.cronEvery" label="2"
              >{{ t('cron.Year.interval[0]') }}
              <a-input-number
                size="small"
                v-model="state.year.incrementIncrement"
                :min="1"
                :max="99"
              ></a-input-number>
              {{ t('cron.Year.interval[1]') }}
              <a-input-number
                size="small"
                v-model="state.year.incrementStart"
                :min="2018"
                :max="2118"
              ></a-input-number>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio class="long" v-model="state.year.cronEvery" label="3"
              >{{ t('cron.Year.specific') }}
              <a-select size="small" filterable multiple v-model="state.year.specificSpecific">
                <a-select-option
                  v-for="(val, index) in 100"
                  :key="index"
                  :label="2017 + val"
                  :value="2017 + val"
                ></a-select-option>
              </a-select>
            </a-radio>
          </a-row>
          <a-row>
            <a-radio v-model="state.year.cronEvery" label="4"
              >{{ t('cron.Year.cycle[0]') }}
              <a-input-number
                size="small"
                v-model="state.year.rangeStart"
                :min="2018"
                :max="2118"
              ></a-input-number>
              {{ t('cron.Year.cycle[1]') }}
              <a-input-number
                size="small"
                v-model="state.year.rangeEnd"
                :min="2018"
                :max="2118"
              ></a-input-number>
            </a-radio>
          </a-row>
        </div>
      </TabPane>
    </ATabs>
    <div class="bottom">
      <div class="value">
        <span> CRON预览: </span>
        <a-tag type="primary">
          {{ state.cron }}
        </a-tag>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue';
// import { BasicModal, useModalInner } from '/@/components/Modal';
import {
  Tabs,
  Tag,
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  Divider,
  RadioButton,
  Radio,
} from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  name: 'CronModal',
  components: {
    ATabs: Tabs,
    TabPane: Tabs.TabPane,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    RadioButton,
    Radio,
    RadioGroup: Radio.Group,
    [Select.name]: Select,
    ASelectOption: Select.Option,
    [Input.name]: Input,
    InputNumber: InputNumber,
    [Input.Group.name]: Input.Group,
    Divider,
    Icon,
  },
  emits: ['success', 'register'],
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
        console.log(state.secondsText);
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
    watch(state, (nv, ov) => {
      //直接监听
      console.log('count改变了', nv);
    });

    const onSecondChange = (e) => {
     console.log('onSecondChange', e);
    };
    // const [registerModal, { closeModal }] = useModalInner(async (data) => {
    //   console.log(data);
    // });

    const getTitle = computed(() => 'CronEdit');



    function handleCancel(e) {
      console.log('Clicked cancel button');
      state.visable = false;
    }

    function handleSubmit() {
      // closeModal();
      emit('success', state.cron);
    }

    return { t, 
    getTitle, 
    handleSubmit, 
    handleCancel, 
    state, 
    getValue, 
    rest, 
    onSecondChange 
    };
  },
});
</script>

<style scoped lang="less">
.vben-cron-div {
  .a-input-number__decrease,
  .a-input-number__increase {
    top: 2px !important;
  }

  .ant-tabs-card {
    box-shadow: none;
  }

  .tabBody {
    overflow: auto;

    .ant-row {
      margin: 10px 0;

      .ant-select {
        width: 350px;
      }

      .InputNumber {
        width: 110px;
      }
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
        color: red;
      }
    }
  }
}
</style>

