<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">

    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <!-- <img :src="data.avatar" class="mr-8 rounded h-24 w-24" /> -->
          <img :src="data_local.user_pic" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data.name  }}</p>
            <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*">
            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">更换头像</vs-button>
            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->

            <!-- <vs-button type="border" color="danger">Remove Avatar</vs-button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" label="姓名" v-model="data_local.name" v-validate="'required'" name="name" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input class="w-full mt-4" label="邮箱" v-model="data_local.email" type="email" v-validate="'required|email'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

        <vs-input class="w-full mt-4" label="部门" v-model="data_local.user_dept" v-validate="'required'" name="department" />
        <span class="text-danger text-sm"  v-show="errors.has('department')">{{ errors.first('department') }}</span>

        <vs-input class="w-full mt-4" label="公司地址(打卡地址)" v-model="data_local.user_office" v-validate="'required'" name="office" />
        <span class="text-danger text-sm"  v-show="errors.has('office')">{{ errors.first('office') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">

        <div class="mt-4">
          <label class="vs-input--label">角色</label>
          <v-select v-model="role_local"  :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
        </div>

        <!-- v-validate="'alpha_spaces'" -->
        <vs-input class="w-full mt-4" label="公司" v-model="data_local.user_company"  name="company" />
        <span class="text-danger text-sm"  v-show="errors.has('company')">{{ errors.first('company') }}</span>

        <vs-input class="w-full mt-4" label="职位" v-model="data_local.user_position" v-validate="'required'" name="position" />
        <span class="text-danger text-sm"  v-show="errors.has('position')">{{ errors.first('position') }}</span>

        <div class="mt-4">
          <label class="text-sm">入职日期</label>
          <!-- Y-m-d -->
          <flat-pickr v-model="data_local.user_hiredate" :config="{altFormat: 'Y-m-d', dateFormat: 'Y-m-d', defaultDate: data_local.user_birthday, maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob" />
          <span class="text-danger text-sm"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span>
        </div>
      </div>
    </div>

    <!-- Permissions -->
    <vx-card class="mt-base" no-shadow card-border>

      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
            <span class="font-medium text-lg leading-none">用户权限</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto">
        <table class="w-full">
          <template v-for="(val, moduleName) in this.permissionType">
            <tr :key="moduleName+val.header">
              <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in val.header" :key="moduleName+heading">{{ heading }}</th>
            </tr>
            <tr :key="moduleName+val.name">
              <td class="px-3 py-2">{{ val.name }}</td>
              <template v-for="permissionName in Object.keys(data_local.permission)">
                <td v-if="permissionName.indexOf(moduleName)!= -1" class="px-3 py-2" :key="data_local.permission[permissionName]+permissionName">
                    <vs-checkbox v-model="data_local.permission[permissionName]" />
                </td>
              </template>
            </tr>
          </template>
        </table>
      </div>

    </vx-card>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import userAPI from '../../../../http/requests/api/user/index.js'

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),

      companyOptions: [
        { label: '蜂旅假期', value:'蜂旅假期'},
        { label: '蜂房商旅', value:'广州市蜂房商旅服务有限公司'},
        { label: '展厅', value:'展厅'},
        { label: '驻场', value:'驻场'},
        { label: '蜂房集团', value:'蜂房集团'}
      ],
      roleOptions: [
        { label: '超级管理员',  value: 1 },
        { label: '公司管理员',  value: 2 },
        { label: '部门管理员',  value: 3 },
        { label: '员工',  value: 4 }
      ],
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
    validateForm () {
      return !this.errors.any()
    },
    role_local: {
      get () {
        return this.roleOptions.find(arr => {
          return arr.value === this.data_local.permission.role_id
        })
      },
      set (obj) {
        this.data_local.permission = this.$store.state.userManagement.permissions.find(arr => {
          return arr.role_id === obj.value
        })
      }
    }
  },
  methods: {
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      this.$vs.loading()
      this.$store.dispatch('userManagement/saveAccountInfo', this.data_local)
        .then(() => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: '保存成功',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          if (this.$route.params.userId === 'owner') {
            this.$store.commit('UPDATE_USER_INFO', this.data_local)
          }
          this.$emit('update:data',this.data_local)
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
      /* eslint-enable */
    },
    reset_data () {
      this.data_local = JSON.parse(JSON.stringify(this.data))
    },
    update_avatar (event) {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
      const file = event.target.files[0]  //获取input的图片file值
      const param = new FormData()
      param.append('file', file)
      userAPI.uploadAvatar(param, this.data_local.user_id).then(response => {
        this.data_local.user_pic = response.data
        this.$vs.notify({
          title: 'Success',
          text: '头像上传成功',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
