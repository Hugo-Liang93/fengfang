<!-- =========================================================================================
    File Name: QuillEditorThemeSnow.vue
    Description: Quill editor with snow theme
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="公告发布" >

        <p class="mb-5">公告内容编辑</p>
        <quill-editor v-model="content"  ref="myTextEditor"
          :options="quillOption">
        </quill-editor>

        <template v-if="content">
          <h1>预览</h1>
          <div class="ql-container ql-snow">
            <div class="ql-editor">
              <div v-html="content"></div>
            </div>
          </div>
          <div class="mt-5">
            <vs-button class="mr-4" color="primary"  type="filled" @click="openAddNewEvent">提交</vs-button>
          </div>
          <!-- ADD EVENT -->
          <vs-prompt
              class="calendar-event-dialog"
              title="发布公告"
              accept-text= "确定"
              @accept="addEvent"
              :is-valid="validForm"
              :active.sync="activePromptAddEvent">

              <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="热点标题" v-model="title"></vs-input>
              <div class="my-4">
                  <small class="date-label">开始时间</small>
                  <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesFrom" name="start-date" v-model="startDate" :disabled="disabledFrom"></datepicker>
              </div>
              <div class="my-4">
                  <small class="date-label">结束时间</small>
                  <datepicker :format="customFormatter" :language="langZH" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
              </div>
              <div class="my-4">
                <small class="date-label">发布范围</small>
                <ul class="demo-alignment">
                  <li>
                    <vs-radio v-model="company" vs-value="全集团">全集团</vs-radio>
                  </li>
                  <li>
                    <vs-radio v-model="company" :vs-value="this.$store.state.AppActiveUser.user_company">公司</vs-radio>
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
import quillConfig from './quill-config.js'
import moment from 'moment'
import { quillEditor } from 'vue-quill-editor'
import activityAPI from '../../../http/requests/api/activity/index.js'
// import Prism from 'vue-prism-component'
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/src/locale'

export default {
  data () {
    return {
      quillOption: quillConfig,
      langZH: zh,
      content: null,
      activePromptAddEvent: false,
      startDate: '',
      endDate: '',
      title: '',
      disabledFrom: false,
      company: ''
    }
  },
  components: {
    quillEditor,
    Datepicker
  },
  methods: {
    beforeUpload () {},
    // 上传图片成功
    uploadSuccess () {},
    // 上传图片失败
    uploadError () {},
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
    addEvent () {
      activityAPI.saveActivity({
        startDate: this.customFormatter(this.startDate),
        endDate: this.customFormatter(this.endDate),
        title: this.title,
        content: this.content,
        owner: this.$store.state.AppActiveUser.user_id,
        company: this.company
      }).then(response => {
        console.log(response.data)
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Success',
          text: '添加活动成功',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.$router.push('/activity/activityList').catch(() => {})
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
      return this.title !== '' && this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    },
    disabledDatesFrom () {
      return { from: new Date(this.endDate) }
    }
  },
  created () {
    this.company = this.$store.state.AppActiveUser.user_company
  }
}
</script>
