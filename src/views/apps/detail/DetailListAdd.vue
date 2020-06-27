<!-- =========================================================================================
    File Name: FormWizardIconTab.vue
    Description: Form wizard with numbers in tabs
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="轮播新增" >
        <div class="mt-5">
            <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="提交"  @on-complete="formSubmitted">
                <tab-content title="基本信息" class="mb-5" icon="feather icon-home">

                    <!-- tab 1 content -->
                    <div class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-input label="标题" v-model="detail_title" class="w-full" />
                        </div>
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-select v-model="detail_type_value" class="w-full select-large" label="轮播类型">
                                <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in detail_type" class="w-full" />
                            </vs-select>
                        </div>
                    </div>
                    <div v-show="detail_type_value!==null" class="vx-row">
                        <div class="vx-col md:w-1/2 w-full mt-5">
                            <vs-select v-model="type_id" class="w-full select-large" label="(项目/热点)名称">
                              <template v-if="detail_type_value==='project'">
                                <vs-select-item :key="index" :value="item.project_id" :text="item.project_name" v-for="(item,index) in projectsData" class="w-full" />
                              </template>
                              <template v-if="detail_type_value==='activity'">
                                <vs-select-item :key="index" :value="item.id" :text="item.title" v-for="(item,index) in activitiesData" class="w-full" />
                              </template> 
                            </vs-select>
                        </div>
                    </div>
                </tab-content>

                <!-- tab 2 content -->
                <tab-content title="轮播图片" class="mb-5" icon="feather icon-briefcase">
                    <div class="con-example-images">
                      <vs-upload action="/upload/detail/1" fileName="file" text="轮播图" @on-success="successUpload" />
                    </div>
                </tab-content>
            </form-wizard>
        </div>
    </vx-card>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import projectAPI from '../../../http/requests/api/project/index.js'

export default {
  data () {
    return {
      fileName : '',
      detail_type_value: null,
      pic:'',
      attachPic: [],
      detail_type: [
        { label: '项目', value: 'project' },
        { label: '热点', value: 'activity' }
      ],
      type_id: '',
      detail_title: ''
    }
  },
  methods: {
    successUpload (event) {
      this.fileName = event.target.response
      this.$vs.notify({ color: 'success', title: '上传成功', text: '您上传的文件已经上传成功' })
    },
    formSubmitted () {
      this.$vs.loading()
      projectAPI.saveDetail({fileName: this.fileName, detail_title: this.detail_title, detail_type : this.detail_type_value, type_id:this.type_id})
        .then(() => { 
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: '保存成功',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.$router.push('/apps/detail/detail-list').catch(() => {})
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
  components: {
    FormWizard,
    TabContent
  },
  computed: {
    activitiesData () {
      return this.$store.state.activity.activityList
    },
    projectsData () {
      return this.$store.state.project.projectList
    },
    detail_list () {
      return this.detail_type_value === 'project' ? this.projectsData : this.activitiesData
    }
    // ,
    // projectPics () {
    //   return this.attachPic.filter(val => {
    //     return val.split('_')[0] === this.project_id
    //   })
    // }
  },
  created () {
    this.$store.dispatch('activity/getActivityByCompany', this.$store.state.AppActiveUser.user_company).catch(err => { console.error(err) })
    this.$store.dispatch('project/listProject').catch(err => { console.error(err) })
  }
}
</script>
