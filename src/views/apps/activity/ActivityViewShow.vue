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
      <vs-popup background-color="rgba(255, 255, 255, 0.7)"   title="评论成功等待审核" :active.sync="popupActivo">
                  <div>
                    <span >{{commentbox}}</span>
                  </div>

      </vs-popup>
      <div>
      <div class="post-header flex justify-between mb-4">
          <div class="flex items-center">
             <div>
                  <vs-avatar class="m-0" :src="activity.user.user_pic" size="45px"></vs-avatar>
              </div>
              <div class="ml-4">
                  <h6>{{ activity.user.name }}</h6>
                  <small>{{ activity.startDate | date(true) }} to {{ activity.endDate | date(true) }}</small>
              </div>
          </div>
          <div class="flex">
              <feather-icon class="ml-4" icon="HeartIcon" @click="changeLiked" :svgClasses="{'text-danger fill-current stroke-current': isLiked}"></feather-icon>
          </div>
      </div>
      
      <div class="ql-container ql-snow">
        <div class="ql-editor">
          <div v-html="this.activity.content"></div>
        </div>
      </div>
      <vs-divider></vs-divider>
      <!-- post action -->
       <div>
            <div class="flex justify-between">
                <div class="flex items-center">
                    <div class="flex items-center"><feather-icon class="mr-2" icon="HeartIcon" svgClasses="h-5 w-5"></feather-icon> <span>{{ like_user.length }}</span></div>
                    <ul class="users-liked user-list ml-3 sm:ml-6">
                        <li v-for="(like, likeIndex) in like_user" :key="likeIndex">
                            <vx-tooltip :text="like.name" position="bottom">
                                <vs-avatar :src="like.user_pic" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                            </vx-tooltip>
                        </li>
                    </ul>
                    <small v-if="likes.length > 5" class="ml-2">+{{ like_user.length - 5 }} more</small>
                </div>
                <div class="flex items-center"><feather-icon class="mr-2" icon="MessageSquareIcon" svgClasses="h-5 w-5"></feather-icon> <span>{{ likes_comment.length }}</span></div>
            </div>
            <div class="comments-container mt-4">
                <ul class="user-comments-list">
                    <li v-for="(like_comment, commentIndex) in likes_comment.slice(0, 10)" :key="commentIndex" class="commented-user flex items-center mb-4">
                        <div class="mr-3"><vs-avatar class="m-0" :src="like_comment.user.user_pic" size="30px" /></div>
                        <div class="leading-tight">
                            <p class="font-medium">{{ like_comment.user.name }}</p>
                            <span class="text-xs">{{ like_comment.like_comment }}</span>
                        </div>
                       <div class="ml-auto">
                            <div class="flex">
                                <feather-icon icon="HeartIcon" svgClasses="h-4 w-4" class="mr-2 cursor-pointer"></feather-icon>
                                <feather-icon icon="MessageSquareIcon" svgClasses="h-4 w-4" class="cursor-pointer"></feather-icon>
                            </div>
                        </div>
                    </li>
                </ul>
                <span class="flex justify-end" v-if="likes_comment.length > 10">
                    <a class="inline-flex items-center text-sm" href=""><span>View All</span> <feather-icon :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'" svgClasses="h-4 w-4"></feather-icon></a>
                </span>
            </div>
            <div class="post-comment">
                <vs-textarea label="评论" class="mb-2" v-model="commentbox" />
                <vs-button @click="postMsg" size="small">发表评论</vs-button>
            </div>
        </div>
        </div>
    </vx-card>

</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import activityAPI from '../../../http/requests/api/activity/index.js'

export default {
  data () {
    return {
      popupActivo: false,
      activity: null,
      like_post: [],
      commentbox: '',
      like_user: []
    }
  },
  computed: {
    likes () {
      return this.like_post.filter(val => {
        return val.like_flag === true
      })
    },
    likes_comment () {
      return this.like_post.filter(val => {
        return val.like_flag !== null
      })
    },
    isLiked () {
      if (this.like_user.find(val => {
        return val.user_id === this.$store.state.AppActiveUser.user_id
      }) !== undefined) return true 
      else return false
    }
  },  
  methods: {
    async changeLiked () {
      await activityAPI.changeLiked(this.$route.params.activityId, this.$store.state.AppActiveUser.user_id)
      this.fetchLikePost()
    },
    // 获取likeflag
    async fetchLikePost () {
      await activityAPI.getLikePostByActivityId(this.$route.params.activityId).then(response => {
        this.like_user = response.data
      })
    },
    postMsg () {
      if (!this.commentbox) {
        this.$vs.notify({
          title: '错误消息',
          text: '评论失败，评论内容不能为空',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
        return
      }
      activityAPI.postMsg(this.$route.params.activityId, this.$store.state.AppActiveUser.user_id, this.commentbox).then(() => {
        this.getComment()
        this.popupActivo = true

      })
    },
    async getComment () {
      await activityAPI.getCommentByActivityId(this.$route.params.activityId).then(response => {
        this.like_post = response.data
      })
    }
  },
  async created () {
    if (this.$store.state.activity.activityList.length === 0) {
      await this.$store.dispatch('activity/getActivityByCompany', this.$store.state.AppActiveUser.user_company).catch(err => { console.error(err) })
    }
    this.activity = this.$store.state.activity.activityList.find(val => {
      return val.id === this.$route.params.activityId
    })
    this.getComment()
    this.fetchLikePost()
  }
}
</script>
