<!-- =========================================================================================
    File Name: QuillEditorThemeSnow.vue
    Description: Quill editor with snow theme
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card :title="activity.title" >
        <p class="mb-5">
          <span>由 {{activity.owner}} </span> 
          <span>生效日期 {{activity.startDate}} - {{activity.endDate}}</span>
        </p> 
          <div class="ql-container ql-snow">
            <div class="ql-editor">
              <div v-html="this.activity.content"></div>
            </div>
          </div>
    </vx-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      activity: null
    }
  },
  methods: {
  },
  created () {
    this.activity = this.$store.state.activity.activityList.find(val => {
      return val.id === this.$route.params.activityId
    })
  }
}
</script>
