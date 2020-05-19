<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-edit">

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Account" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-account class="mt-4" :data.sync="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Information" icon-pack="feather" icon="icon-info">
            <div class="tab-text">
              <user-edit-tab-information class="mt-4" :data.sync="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Social" icon-pack="feather" icon="icon-share-2">
            <div class="tab-text">
              <user-edit-tab-social class="mt-4" :data.sync="user_data" />
            </div>
          </vs-tab>
          <vs-tab label="Password" icon-pack="feather" icon="icon-lock">
            <div class="tab-text">
              <user-edit-tab-pass class="mt-4" :data="user_data" />
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import UserEditTabAccount     from './UserEditTabAccount.vue'
import UserEditTabInformation from './UserEditTabInformation.vue'
import UserEditTabSocial      from './UserEditTabSocial.vue'
import UserEditTabPass        from './UserSettingsChangePassword.vue'
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

export default {
  components: {
    UserEditTabAccount,
    UserEditTabInformation,
    UserEditTabSocial,
    UserEditTabPass
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0
    }
  },
  // watch: {
  //   activeTab () {
  //     //this.fetch_user_data(this.$route.params.userId)
  //     this.fetch_user_data(this.user_data.user_id)
  //   }
  // },
  methods: {
    fetch_user_data (userId) {
      this.$store.dispatch('userManagement/fetchUser', userId)
        .then(res => { this.user_data = res.data })
        .catch(err => {
          if (err.response.status === 404) {
            this.user_not_found = true
            return
          }
          console.error(err) 
        })
    }
  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    // 获取权限信息
    this.$store.dispatch('userManagement/fetchPermissions')
    // 如果是当前用户直接在localstorage中取数
    if (this.$route.params.userId === 'owner') {
      this.user_data = JSON.parse(localStorage.getItem('userInfo'))
    } else if (this.$store.state.userManagement.users) {
      // 在userlist中存储过的数据中查询
      this.user_data = this.$store.state.userManagement.users.find(val => {
        return val.user_id === this.$route.params.userId
      })
      if (!this.user_data) {
        this.fetch_user_data(this.$route.params.userId)
      }
    }
    // this.$store.commit('userManagement/SET_EDIT_USER', this.user_data)
  }
}  
</script>
