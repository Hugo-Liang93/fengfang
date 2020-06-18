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
          <vs-input class="w-full mt-4" label="项目名称" size="large" placeholder="请输入项目名称"  v-model="project.project_name" />
          <vs-textarea class="w-full mt-4" label="项目介绍" v-model="project.project_desc" />
        </div>

      </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-end">
              <vs-button class="ml-auto mt-2" @click="update_project" >更新项目基本信息</vs-button>
            </div>
          </div>
        </div>
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>户型图/区位图</p>
          </vs-alert>
        <template v-if="houseType !== []">
          <template class="mt-5" v-for="(houseTypeFileName,index) in houseType">
            <a class="flex" @click="download_file('houseType',houseTypeFileName)" :key="index">{{houseTypeFileName.replace(project.project_id+"_houseType_",'')}}</a>
          </template>
          
        </template>
          
          <div class="mt-5">
              <vs-upload :action="`http://localhost:8080/upload/houseType/${project.project_id}`" fileName="file" text="户型图/区位图" @on-success="successUpload" />
          </div>
          
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>项目附件</p>
          </vs-alert>
          <template v-if="attach !== []">
            <template class="mt-5" v-for="(attachFileName,index) in attach">
              <a class="flex" @click="download_file('attach',attachFileName)" :key="index">{{attachFileName.replace(project.project_id+"_attach_",'')}}</a>
            </template>
          </template>
          <div class="mt-5">
              <vs-upload :action="`http://localhost:8080/upload/attach/${project.project_id}`" fileName="file" text="项目附件" @on-success="successUpload" />
          </div>
    </vx-card>
</template>

<script>
import projectAPI from '../../../http/requests/api/project/index.js'

export default {
  data () {
    return {
      project: {
        project_id: '',
        project_name: '',
        project_desc: ''
      },
      attach: [],
      houseType: []
    }
  },
  methods: {
    successUpload () {
      this.fetchFiles(this.project.project_id)
      this.$vs.notify({ color: 'success', title: '上传成功', text: '您上传的文件已经上传成功' })
    },
    download_file (fileType, fileName) {
      projectAPI.downLoadFile(fileName).then(msg => {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = window.URL.createObjectURL(new Blob([msg.data]))
        if (fileType === 'attach') {
          link.setAttribute('download', fileName.replace(this.project.project_id.concat('_attach_'), ''))//完整文件名称
        } else {
          link.setAttribute('download', fileName.replace(this.project.project_id.concat('_houseType_'), ''))//完整文件名称
        }
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      }) 
    },
    update_project () {
      if (this.project.project_name) {
        projectAPI.updateProject(this.project).then(response => {
          console.log(response)
          if (response.data === true) {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Success',
              text: '项目基本信息更新成功',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'success'
            })
          } else {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: '项目更新不成功',
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
    },
    fetchFiles (projectId) {
      projectAPI.getFilesByProjectId(projectId).then(response => {
        console.log(response)
        this.attach = response.data.attach
        this.houseType = response.data.houseType
        this.$forceUpdate()
      })
    }
    
  },
  created () {
    this.project = this.$store.state.project.projectList.find(val => {
      return val.project_id === this.$route.params.projectId
    })
    this.fetchFiles(this.$route.params.projectId)
    
  }
}
</script>
