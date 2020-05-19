<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">
    <!-- .sync 语法糖允许子组件传递参数到父组件 default false-->
    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'app-user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Account" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="require('@/assets/images/portrait/small/avatar-s-11.jpg')" class="rounded w-full" />
            </div>
          </div>

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ user_data.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Email</td>
                <td>{{ user_data.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Position</td>
                <td>{{ user_data.user_position }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Role</td>
                <td>{{ user_data.permission.role_name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Company</td>
                <td>{{ user_data.user_company }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Department</td>
                <td>{{ user_data.user_dept }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'app-user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div>

        </div>

      </vx-card>

      <div class="vx-row">
        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Information" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Birth Date</td>
                <td>{{ user_data.user_birthday }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <td>{{ user_data.user_phone }}</td>
              </tr>
              <tr>
                <td class="font-semibold">IDCard</td>
                <td>{{ user_data.user_idcard }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Gender</td>
                <td>{{ user_data.user_gender }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Province</td>
                <td>{{ user_data.nativePlace.native_province }}</td>
              </tr>
              <tr>
                <td class="font-semibold">City</td>
                <td>{{ user_data.nativePlace.native_city }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Address</td>
                <td>{{ user_data.nativePlace.native_address }}</td>
              </tr>
            </table>
          </vx-card>
        </div>

        <div class="vx-col lg:w-1/2 w-full">
          <vx-card title="Social Links" class="mb-base">
            <table>
              <tr>
                <td class="font-semibold">Wechat</td>
                <td>{{ user_data.social.user_wechat }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Weibo</td>
                <td>{{ user_data.social.user_weibo }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Mobile</td>
                <td>{{ user_data.social.user_mobile }}</td>
              </tr>
            </table>
          </vx-card>
        </div>
      </div>

      <!-- Permissions -->
      <vx-card>

        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="flex items-end px-3">
              <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
              <span class="font-medium text-lg leading-none">Permissions</span>
            </div>
            <vs-divider />
          </div>
        </div>
        
              <!--
                You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
                our data structure. You just have to loop over above variable to get table headers.
                Below we made it simple. So, everyone can understand.
               -->
<!--        <div class="block overflow-x-auto">
          <table class="w-full permissions-table">
            <tr>
              
              <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']" :key="heading">{{ heading }}</th>
            </tr>

            <tr v-for="(val, name) in user_data.permissions" :key="name">
              <td class="px-3 py-2">{{ name }}</td>
              <td v-for="(permission, name) in val" class="px-3 py-2" :key="name+permission">
                <vs-checkbox v-model="val[name]" class="pointer-events-none" />
              </td>
            </tr>
          </table>
        </div> -->
        
        <div class="block overflow-x-auto">
          <table class="w-full permissions-table">
            <template v-for="(val, moduleName) in this.permissionType">
              <tr :key="moduleName+val.header">
                <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in val.header" :key="moduleName+heading">{{ heading }}</th>
              </tr>
              <tr :key="moduleName+val.name">
                <td class="px-3 py-2">{{ val.name }}</td>
                <template v-for="permissionName in Object.keys(user_data.permission)">
                  <td v-if="permissionName.indexOf(moduleName)!= -1" class="px-3 py-2" :key="user_data.permission[permissionName]+permissionName">
                      <vs-checkbox v-model="user_data.permission[permissionName]" class="pointer-events-none" />
                  </td>
                </template>
              </tr>
            </template>
          </table>
        </div>

      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

export default {
  data () {
    return {
      user_data: null,
      user_not_found: false,
      permissionType: {
        'active': {
          'name': '活动/公告/社区',
          'header': ['模块', '发布', '删除', '查看', '修改', '审核']
        },
        'user': {
          'name': '用户管理', 
          'header': ['', '添加', '删除', '查看', '修改']
        },
        'clockin': {
          'name': '打卡',
          'header': ['', '导出', '删除', '查看', '修改']
        },
        'schedule': {
          'name': '日程表',
          'header': ['', '添加', '删除', '查看', '修改']
        }
      }
    }
  },
  computed: {
    userAddress () {
      let str = ''
      for (const field in this.user_data.location) {
        str += `${field  } `
      }
      return str
    }
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({name:'app-user-list'})
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    },
    fetch_user_data (userId) {
      console.log('handle')
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

    //const userId = this.$route.params.userId
    
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
    
    // this.$store.dispatch('userManagement/fetchUser', userId)
    //   .then(res => {
    //     this.user_data = res.data
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     if (err.response.status === 404) {
    //       this.user_not_found = true
    //       return
    //     }
    //     console.error(err) 
    //   })
  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>
