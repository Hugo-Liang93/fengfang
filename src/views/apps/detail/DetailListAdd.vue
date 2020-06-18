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
                            <vs-select v-model="project_id" class="w-full select-large" label="项目名称">
                                <vs-select-item :key="index" :value="item.project_id" :text="item.project_name" v-for="(item,index) in projectsData" class="w-full" />
                            </vs-select>
                        </div>
                    </div>
                </tab-content>

                <!-- tab 2 content -->
                <tab-content title="Step 2" class="mb-5" icon="feather icon-briefcase">
                    <div class="con-example-images">
                      <vs-images>
                        <template v-for="(image, index) in projectPics">
                          <vs-image :key="index" :src="`/images/${image}`"  />
                          <vs-radio :key="index+1"  v-model="pic" :vs-value="image">{{image}}</vs-radio>
                        </template>
                        
                      </vs-images>
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
      pic:'',
      attachPic: [],
      project_id: '',
      detail_title: '',
      projectsData: this.$store.state.project.projectList
    }
  },
  methods: {
    formSubmitted () {
      this.$vs.loading()
      projectAPI.saveDetail({pic: this.pic, detail_title: this.detail_title})
        .then(response => { 
          console.log(response)
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: '保存成功',
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
  components: {
    FormWizard,
    TabContent
  },
  computed: {
    projectPics () {
      return this.attachPic.filter(val => {
        return val.split('_')[0] === this.project_id
      })
    }
  },
  created () {
    this.$store.dispatch('project/listProject').catch(err => { console.error(err) })
    projectAPI.getPic().then(response => {
      this.attachPic = response.data
    })
  }
}
</script>
