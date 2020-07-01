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
          <vs-input disabled  class="w-full mt-4" label="项目名称" size="large" placeholder="请输入项目名称"  v-model="project.project_name" />
          <vs-textarea disabled  class="w-full mt-4" label="项目介绍" v-model="project.project_desc" />
        </div>

      </div>
      <template  v-if="houseType.length !== 0">
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>户型图/区位图</p>
          </vs-alert>
        
          <template class="vx-col">
            <div class="con-example-images">
              <vs-images>
                <vs-image :key="index" :src="`/images/${houseTypeFileName}`" v-for="(houseTypeFileName, index) in houseType"></vs-image>
              </vs-images>
            </div>
            
          </template>
        </template>
          
        <template v-if="attach.length !== 0">  
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>项目附件</p>
          </vs-alert>
          
            <template class="vx-col" v-for="(attachFileName,index) in attach">  
              <div :key="`${index+'d'}`" >
                <a class="mt-4" @click="download_file('attach',attachFileName)" :key="index">{{attachFileName.replace(project.project_id+"_attach_",'')}}</a>
              </div>
            </template>
          </template>
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
    fetchFiles (projectId) {
      projectAPI.getFilesByProjectId(projectId).then(response => {
        console.log(response)
        this.attach = response.data.attach
        this.houseType = response.data.houseType
        this.$forceUpdate()
      })
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

<style lang="stylus">
.con-example-images
  max-height 800px
  overflow auto
</style>