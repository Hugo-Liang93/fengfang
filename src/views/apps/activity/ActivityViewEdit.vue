<!-- =========================================================================================
    File Name: QuillEditorThemeSnow.vue
    Description: Quill editor with snow theme
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="热点发布" >
        <p class="mb-5">公告内容编辑</p>
        <quill-editor v-model="activity.content"></quill-editor>
        <br />
        <template v-if="activity.content">
          <h1>预览</h1>
          <div class="ql-container ql-snow">
            <div class="ql-editor">
              <div v-html="activity.content"></div>
            </div>
          </div>
          <div class="mt-5">
            <vs-button class="mr-4" color="primary"  type="filled" @click="openAddNewEvent">更新</vs-button>
          </div>
          <!-- ADD EVENT -->
          <vs-prompt
              class="calendar-event-dialog"
              title="发布公告"
              accept-text= "确定"
              @accept="updateEvent"
              :is-valid="validForm"
              :active.sync="activePromptAddEvent">
          
<!--             <div class="calendar__label-container flex">
          
                  <vs-chip v-if="labelLocal != 'none'" class="text-white" :class="'bg-' + labelColor(labelLocal)">{{ labelLocal }}</vs-chip>
          
                  <vs-dropdown vs-custom-content vs-trigger-click class="ml-auto my-2 cursor-pointer">
          
                      <feather-icon icon="TagIcon" svgClasses="h-5 w-5" class="cursor-pointer" @click.prevent></feather-icon>
          
                      <vs-dropdown-menu style="z-index: 200001">
                              <vs-dropdown-item v-for="(label, index) in calendarLabels" :key="index" @click="labelLocal = label.label_value">
                                  <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + label.label_color"></div>
                                  <span>{{ label.label_text }}</span>
                              </vs-dropdown-item>
          
                              <vs-dropdown-item @click="labelLocal = 'none'">
                                  <div class="h-3 w-3 mr-1 inline-block rounded-full mr-2 bg-primary"></div>
                                  <span>None</span>
                              </vs-dropdown-item>
                      </vs-dropdown-menu>
                  </vs-dropdown>
          
              </div> -->
          
              <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="activity.title"></vs-input>
              <div class="my-4">
                  <small class="date-label">Start Date</small>
                  <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesFrom" name="start-date" v-model="activity.startDate" :disabled="disabledFrom"></datepicker>
              </div>
              <div class="my-4">
                  <small class="date-label">End Date</small>
                  <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesTo" name="end-date" v-model="activity.endDate"></datepicker>
              </div>
              <div class="my-4">
                <small class="date-label">发布范围</small>
                <ul class="demo-alignment">
                  <li>
                    <vs-radio v-model="activity.company" vs-value="admin">Admin</vs-radio>
                  </li>
                  <li>
                    <vs-radio v-model="activity.company" :vs-value="activity.company">Company</vs-radio>
                  </li>
                </ul>
              </div>
          </vs-prompt>
        </template>
    </vx-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from 'moment'
import { quillEditor } from 'vue-quill-editor'
import activityAPI from '../../../http/requests/api/activity/index.js'
// import Prism from 'vue-prism-component'

import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/src/locale'

export default {
  data () {
    return {
      langZH: zh,
      disabledFrom: false,
      activity: {
        content: null,
        startDate: '',
        endDate: '',
        title: '',
        company: ''
      },
      activePromptAddEvent: false
    }
  },
  components: {
    quillEditor,
    Datepicker
  },
  methods: {
    customFormatter (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    addNewEventDialog (date) {
      this.startDate = date
      this.endDate = date
      this.activePromptAddEvent = true
    },
    // open 绑定数据
    openAddNewEvent () {
      this.disabledFrom = true
      this.addNewEventDialog(new Date())
    },
    updateEvent () {
      activityAPI.updateActivity({
        id: this.activity.id,
        startDate: this.customFormatter(this.activity.startDate),
        endDate: this.customFormatter(this.activity.endDate),
        title: this.activity.title,
        content: this.activity.content,
        owner: this.$store.state.AppActiveUser.user_id,
        company: this.activity.company
      }).then(response => { 
        console.log(response.data)
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success',
          text: '更新活动成功',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    }
  },
  computed: {
    validForm () {
      return this.activity.title !== '' && this.activity.startDate !== '' && this.activity.endDate !== '' && Date.parse(this.activity.endDate) - Date.parse(this.activity.startDate) >= 0
    },
    disabledDatesTo () {
      return { to: new Date(this.activity.startDate) }
    },
    disabledDatesFrom () {
      return { from: new Date(this.activity.endDate) }
    }
  },
  created () {
    this.activity = this.$store.state.activity.activityList.find(val => {
      return val.id === this.$route.params.activityId
    })
  }
}
</script>
