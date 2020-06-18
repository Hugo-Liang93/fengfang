<!-- =========================================================================================
    File Name: UploadDefault.vue
    Description: Rendering of default Upload
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="项目资料上传">
      
      <div class="vx-row">
        
        <div class="vx-col w-full">
          <vs-input class="w-full mt-4" label="项目名称" size="large" placeholder="请输入项目名称" :disabled="projectNameAble" v-model="project_name" />
          <vs-textarea class="w-full mt-4" label="项目介绍" :disabled="projectNameAble" v-model="project_desc" />
        </div>

      </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-end">
              <vs-button class="ml-auto mt-2" @click="init_project" :disabled="projectNameAble">保存项目基本信息</vs-button>
              <vs-button class="ml-4 mt-2" type="border" color="warning" :disabled="projectNameAble" @click="reset_project_name">重置</vs-button>
            </div>
          </div>
        </div>
        <template v-if="projectNameAble">
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>户型图/区位图</p>
          </vs-alert>
          
          <div class="mt-5">
              <vs-upload :action="`http://localhost:8080/upload/houseType/${project_id}`" fileName="file" text="户型图/区位图" @on-success="successUpload" />
          </div>
          
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>项目附件</p>
          </vs-alert>
          
          <div class="mt-5">
              <vs-upload :action="`http://localhost:8080/upload/attach/${project_id}`" fileName="file" text="项目附件" @on-success="successUpload" />
          </div>
        </template>
    </vx-card>
</template>

<script>
import projectAPI from '../../../http/requests/api/project/index.js'

export default {
  data () {
    return {
      projectNameAble: false,
      project_name: '',
      project_desc: '',
      project_id: ''
    }
  },
  methods: {
    successUpload () {
      this.$vs.notify({ color: 'success', title: '上传成功', text: '您上传的文件已经上传成功' })
    },
    reset_project_name () {
      this.project_name = null
      this.project_desc = null
    },
    init_project () {
      if (this.project_name) {
        projectAPI.initProject({
          project_name: this.project_name,
          project_desc: this.project_desc}).then(response => {
          if (response.data !== '') {
            this.projectNameAble = true
            this.project_id = response.data
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Success',
              text: '项目基本信息保存成功',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success'
            })
          } else {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: '项目名称已存在',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
          
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
    }
    
  }
}
</script>
