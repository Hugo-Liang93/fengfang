<template>
  <div id="simple-calendar-app">
    <div class="vx-card no-scroll-content">
      <calendar-view
        ref="calendar"
        :displayPeriodUom="calendarView"
        :show-date="showDate"
        :events="simpleCalendarEvents"
        enableDragDrop
        :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
        eventBorderHeight="0px"
        eventContentHeight="1.65rem"
        class="theme-default"
        @click-date="openAddNewEvent"
        @click-event="openEditEvent"
        @drop-on-date="eventDragged">

        <div slot="header" class="mb-4">

          <div class="vx-row no-gutter">

            <!-- Month Name -->
            <div class="vx-col w-1/3 items-center sm:flex hidden">
              <!-- Add new event button -->
              <vs-button icon-pack="feather" icon="icon-plus" @click="promptAddNewEvent(new Date())">新增</vs-button>
            </div>

            <!-- Current Month 更换月份 -->
            <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex sm:justify-end justify-center order-last">
              <div class="flex items-center">
                <feather-icon
                  :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                  @click="updateMonth(-1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />

                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>

                <feather-icon
                  :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                  @click="updateMonth(1)"
                  svgClasses="w-5 h-5 m-1"
                  class="cursor-pointer bg-primary text-white rounded-full" />
              </div>
            </div>

             <!-- 选择年周月 -->
            <div class="vx-col sm:w-1/3 w-full flex justify-center">
              <template v-for="(view, index) in calendarViewTypes">
                <vs-button
                  v-if="calendarView === view.val"
                  :key="String(view.val) + 'filled'"
                  type="filled"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                  >{{ view.label }}</vs-button>
                <vs-button
                  v-else
                  :key="String(view.val) + 'border'"
                  type="border"
                  class="p-3 md:px-8 md:py-3"
                  :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                  @click="calendarView = view.val"
                  >{{ view.label }}</vs-button>
              </template>

            </div>
          </div>

          <!-- Labels 标题 -->
          <div class="vx-row sm:flex hidden mt-4">
            <div class="vx-col w-full flex">

              <div class="flex flex-wrap sm:justify-start justify-center">
                  <div v-for="(label, index) in labels" :key="index" class="flex items-center mr-4 mb-2">
                      <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + label.label_color"></div>
                      <span>{{ label.label_text }}</span>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </calendar-view>
    </div>

    <!-- ADD EVENT -->
    <vs-prompt
        class="calendar-event-dialog"
        title="添加日程"
        accept-text= "添加日程"
        @accept="addEvent"
        :is-valid="validForm"
        :active.sync="activePromptAddEvent">

        <div class="calendar__label-container flex">

            <vs-chip v-if="labelLocal != 'none'" class="text-white" :class="'bg-' + labelColor(labelLocal)">{{ labelLocal }}</vs-chip>

            <vs-dropdown vs-custom-content vs-trigger-click class="ml-auto my-2 cursor-pointer">

                <feather-icon icon="TagIcon" svgClasses="h-5 w-5" class="cursor-pointer" @click.prevent></feather-icon>

                <vs-dropdown-menu style="z-index: 200001">
                        <vs-dropdown-item v-for="(label, index) in calendarLabels" :key="index" @click="labelLocal = label.label_value">
                            <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + label.label_color"></div>
                            <span>{{ label.label_text }}</span>
                        </vs-dropdown-item>

                </vs-dropdown-menu>
            </vs-dropdown>

        </div>

        <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="日程标题" v-model="title"></vs-input>
        <div class="my-4">
            <small class="date-label">开始时间</small>
            <datepicker :format="customFormatter" :language="langZH" name="start-date" v-model="startDate" :disabled="disabledFrom"></datepicker>
        </div>
        <div class="my-4">
            <small class="date-label">结束时间</small>
            <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
        </div>
        <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="相关链接" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>

    </vs-prompt>

    <!-- EDIT EVENT -->
    <vs-prompt
        class="calendar-event-dialog"
        title="修改日程"
        accept-text= "提交"
        cancel-text = "删除"
        button-cancel = "border"
        @cancel="removeEvent"
        @accept="editEvent"
        :is-valid="validForm"
        :active.sync="activePromptEditEvent">

        <div class="calendar__label-container flex">

            <vs-chip v-if="labelLocal != 'none'" class="text-white mb-base" :class="'bg-' + labelColor(labelLocal)">{{ labelLocal }}</vs-chip>

            <vs-dropdown vs-custom-content class="ml-auto my-2 cursor-pointer">

                <feather-icon icon="TagIcon" svgClasses="h-5 w-5" @click.prevent></feather-icon>

                <vs-dropdown-menu style="z-index: 200001">
                        <vs-dropdown-item v-for="(label, index) in calendarLabels" :key="index" @click="labelLocal = label.label_value">
                            <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + label.label_color"></div>
                            <span>{{ label.label_text }}</span>
                        </vs-dropdown-item>

                </vs-dropdown-menu>
            </vs-dropdown>

        </div>

        <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="日程标题" v-model="title"></vs-input>
        <div class="my-4">
            <small class="date-label">开始时间</small>
            <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesFrom" name="start-date" v-model="startDate"></datepicker>
        </div>
        <div class="my-4">
            <small class="date-label">结束时间</small>
            <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
        </div>
        <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="相关链接" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>

    </vs-prompt>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moduleCalendar from '@/store/calendar/moduleCalendar.js'
import moment from 'moment'
require('vue-simple-calendar/static/css/default.css')

import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/src/locale'

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker
  },
  data () {
    return {
      showDate: new Date(),
      disabledFrom: false,
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      labelLocal: 'personal',

      langZH: zh,

      url: '',
      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,

      calendarViewTypes: [
        {
          label: '月',
          val: 'month'
        },
        {
          label: '周',
          val: 'week'
        },
        {
          label: '年',
          val: 'year'
        }
      ]
    }
  },
  computed: {
    simpleCalendarEvents () {
      return this.$store.state.calendar.events
    },
    validForm () {
      return this.title !== '' && this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 && !this.errors.has('event-url')
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    },
    disabledDatesFrom () {
      return { from: new Date(this.endDate) }
    },
    labels () {
      return this.$store.state.calendar.eventLabels
    },
    calendarLabels () {
      console.log(this.$store.state.calendar.eventLabels)
      if (!this.$acl.check('isAdmin')) {
        return this.$store.state.calendar.eventLabels.filter(val => {
          return val.id === 3
        })
      } else if (!this.$acl.check('isSuperAdmin')) {
        return  this.$store.state.calendar.eventLabels.filter(val => {
          return val.id >= 2 
        })
      } else return this.$store.state.calendar.eventLabels
    },
    labelColor () {
      return (label) => {
        if      (label === 'all') return 'success'
        else if (label === 'company')     return 'warning'
        else if (label === 'personal') return 'danger'
      }
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    customFormatter (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    addEvent () {
      const obj = {
        title: this.title,
        user_id: this.$store.state.AppActiveUser.user_id,
        startDate: this.customFormatter(this.startDate),
        endDate: this.customFormatter(this.endDate),
        label: this.labelLocal,
        url: this.url,
        user_company: this.$store.state.AppActiveUser.user_company
      }
      obj.classes = `event-${  this.labelColor(this.labelLocal)}`
      this.$store.dispatch('calendar/addEvent', obj)
    },
    editEvent () {
      if (this.labelLocal !== 'personal' & !this.$acl.check('isAdmin')) {
        this.$vs.notify({
          title: 'Error',
          text: '无权限',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
        return
      }
      console.log(this.labelLocal)
      const obj = { id: this.id, user_id: this.$store.state.AppActiveUser.user_id, title: this.title, startDate: this.customFormatter(this.startDate), endDate: this.customFormatter(this.endDate), label: this.labelLocal, url: this.url }
      obj.classes = `event-${  this.labelColor(this.labelLocal)}`
      this.$store.dispatch('calendar/editEvent', obj).then(response => {
        if (response.data.status) {
          this.$vs.notify({
            title: 'Success',
            text: '保存成功',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        } else {
          this.$vs.notify({
            title: 'Error',
            text: response.data.errorMsg,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      }).catch(error => {
        this.$vs.notify({
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
    },
    updateMonth (val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
    },
    clearFields () {
      this.title = this.endDate = this.url = ''
      this.id = 0
      this.labelLocal = 'personal'
    },
    promptAddNewEvent (date) {
      this.disabledFrom = false
      this.addNewEventDialog(date)
    },
    addNewEventDialog (date) {
      this.clearFields()
      this.startDate = date
      this.endDate = date
      this.activePromptAddEvent = true
    },
    // open 绑定数据
    openAddNewEvent (date) {
      this.disabledFrom = true
      this.addNewEventDialog(date)
    },
    openEditEvent (event) {
      const e = this.$store.getters['calendar/getEvent'](event.id)
      this.id = e.id
      this.title = e.title
      this.startDate = e.startDate
      this.endDate = e.endDate
      this.url = e.url
      this.labelLocal = e.label
      this.activePromptEditEvent = true
    },
    removeEvent () {
      if (this.labelLocal !== 'personal' & !this.$acl.check('isAdmin')) {
        this.$vs.notify({
          title: 'Error',
          text: '无权限',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
        return
      }
      this.$store.dispatch('calendar/removeEvent', this.id)
    },
    eventDragged (event, date) {
      this.$store.dispatch('calendar/eventDragged', {event, date})
    }
  },
  created () {
    this.$store.registerModule('calendar', moduleCalendar)
    this.$store.dispatch('calendar/fetchEvents', this.$store.state.AppActiveUser.user_id)
    this.$store.dispatch('calendar/fetchEventLabels')
  },
  beforeDestroy () {
    this.$store.unregisterModule('calendar')
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
