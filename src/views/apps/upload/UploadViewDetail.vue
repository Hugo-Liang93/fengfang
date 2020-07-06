<!-- =========================================================================================
    File Name: UploadDefault.vue
    Description: Rendering of default Upload
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card :title="project.project_name">
      <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
                    <p>项目介绍</p>
                </vs-alert>
          <vs-divider></vs-divider>
          <span>{{project.project_desc}}</span>
      <template  v-if="houseType.length !== 0">
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>户型图/区位图</p>
          </vs-alert>
          <vs-divider></vs-divider>
          <template class="vx-col">
            <div class="con-example-images">
              <vs-images>
                <vs-image :key="index" :src="`/images/${houseTypeFileName}`" v-for="(houseTypeFileName, index) in houseType" @click="download_file('houseType',houseTypeFileName)"></vs-image>
              </vs-images>
            </div>

          </template>
        </template>

        <template v-if="attach.length !== 0">
          <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
              <p>项目附件</p>
          </vs-alert>
          <vs-divider></vs-divider>
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
