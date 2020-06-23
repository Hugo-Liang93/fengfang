<!-- =========================================================================================
    File Name: FormWizardIconTab.vue
    Description: Form wizard with numbers in tabs
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card title="Form wizard with icon tabs" code-toggler>

        <div class="mt-5">
            <form-wizard color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" finishButtonText="提交" @on-complete="formSubmitted">
                <tab-content title="基本信息" class="mb-5" icon="feather icon-home">

                    <!-- tab 1 content -->
                    <div class="vx-row">
                      <div class="vx-col w-full">
                        <div class="flex items-start flex-col sm:flex-row">
                          <!-- <img :src="data.avatar" class="mr-8 rounded h-24 w-24" /> -->
                          <img :src="require('@/assets/images/portrait/small/avatar-s-11.jpg')" class="mr-8 rounded h-24 w-24" />
                          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                          <div>
<!--                            <input type="file" class="hidden" ref="update_avatar_input" @change="update_avatar" accept="image/*"> -->
                    
                            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                            <vs-button class="mr-4 mb-4">更换头像</vs-button>
                            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->
                    
                            <!-- <vs-button type="border" color="danger">Remove Avatar</vs-button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Content Row -->
                    <div class="vx-row">
                      <div class="vx-col md:w-1/2 w-full">
                        <vs-input class="w-full mt-4" label="用户ID" v-model="userInfo.user_id" v-validate="'required'" name="userId" />
                        <span class="text-danger text-sm"  v-show="errors.has('userId')">{{ errors.first('userId') }}</span>
                        
                        <vs-input class="w-full mt-4" label="姓名" v-model="userInfo.name" v-validate="'required'" name="name" />
                        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>
                    
                        <vs-input class="w-full mt-4" label="邮箱" v-model="userInfo.email" type="email" v-validate="'required|email'" name="email" />
                        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
                        
                        <vs-input class="w-full mt-4" label="部门" v-model="userInfo.user_dept" v-validate="'required'" name="department" />
                        <span class="text-danger text-sm"  v-show="errors.has('department')">{{ errors.first('department') }}</span>
                        
                        <vs-input class="w-full mt-4" label="公司地址(打卡地址)" v-model="userInfo.user_office" v-validate="'required'" name="office" />
                        <span class="text-danger text-sm"  v-show="errors.has('office')">{{ errors.first('office') }}</span>
                      </div>
                    
                      <div class="vx-col md:w-1/2 w-full">
                    
                        <div class="mt-4 w-full">
                          <vs-select label="角色" v-model="userInfo.role_id"  :clearable="false" v-validate="'required'" name="role" class="w-full select-large mt-5">
                             <vs-select-item :key="index" :value="item.value" :text="item.label" v-for="(item,index) in roleOptions" />
                          </vs-select>
                          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
                        </div>
                        
                        <!-- v-validate="'alpha_spaces'" -->
                        <vs-input class="w-full mt-4" label="公司" v-model="userInfo.user_company"  name="company" />
                        <span class="text-danger text-sm"  v-show="errors.has('company')">{{ errors.first('company') }}</span>
                        
                        <vs-input class="w-full mt-4" label="职位" v-model="userInfo.user_position" v-validate="'required'" name="position" />
                        <span class="text-danger text-sm"  v-show="errors.has('position')">{{ errors.first('position') }}</span>
                        
                        <vs-input class="w-full mt-4" label="手机" v-model="userInfo.user_phone" v-validate="'required'" name="phone" />
                        <span class="text-danger text-sm"  v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                        
                        <div class="mt-4">
                          <label class="text-sm">入职日期</label>
                          <!-- Y-m-d -->
                          <flat-pickr v-model="userInfo.user_hiredate" :config="{altFormat: 'Y-m-d', dateFormat: 'Y-m-d', maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob1" />
                          <span class="text-danger text-sm"  v-show="errors.has('dob1')">{{ errors.first('dob1') }}</span>
                        </div>
                      </div>
                    </div>
                </tab-content>


                <!-- tab 2 content -->
                <tab-content title="个人信息" class="mb-5" icon="feather icon-briefcase">
                  <div class="vx-row">
                    <div class="vx-col w-full md:w-1/2">
                      <!-- Col Header -->
                      <div class="flex items-end">
                        <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
                        <span class="leading-none font-medium">个人用户信息</span>
                      </div>
                      <!-- Col Content -->
                      <div>
                        <!-- DOB -->
                        <div class="mt-4">
                          <label class="text-sm">生日日期</label>
                          <!-- Y-m-d -->
                          <flat-pickr v-model="userInfo.user_birthday" :config="{altFormat: 'Y-m-d', dateFormat: 'Y-m-d', maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob" />
                          <span class="text-danger text-sm"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span>
                        </div>
              
                        <vs-input class="w-full mt-4" label="身份证号" v-model="userInfo.user_idcard" v-validate="{regex: '^\\+?([0-9]+)$' }" name="idcard" />
                        <span class="text-danger text-sm"  v-show="errors.has('idcard')">{{ errors.first('idcard') }}</span>
              
              
                        <!-- Gender -->
                        <div class="mt-4">
                          <label class="text-sm">性别</label>
                          <div class="mt-2">
                            <vs-radio v-model="userInfo.user_gender" vs-value="男" class="mr-4">男</vs-radio>
                            <vs-radio v-model="userInfo.user_gender" vs-value="女" class="mr-4">女</vs-radio>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Address Col -->
                    <div class="vx-col w-full md:w-1/2">
              
                        <!-- Col Header -->
                        <div class="flex items-end md:mt-0 mt-base">
                          <feather-icon icon="MapPinIcon" class="mr-2" svgClasses="w-5 h-5" />
                          <span class="leading-none font-medium">籍贯信息</span>
                        </div>
              
                        <!-- Col Content -->
                        <div>
                          <vs-input class="w-full mt-4" label="地址" v-model="userInfo.nativePlace.native_address" v-validate="'required'" name="addd_line_1" />
                          <span class="text-danger text-sm"  v-show="errors.has('addd_line_1')">{{ errors.first('addd_line_1') }}</span>
              
              
                          <vs-input class="w-full mt-4" label="城市" v-model="userInfo.nativePlace.native_city" v-validate="'required'" name="city" />
                          <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>
              
                          <vs-input class="w-full mt-4" label="省份" v-model="userInfo.nativePlace.native_province" v-validate="'required'" name="state" />
                          <span class="text-danger text-sm"  v-show="errors.has('state')">{{ errors.first('state') }}</span>
                        </div>
                    </div>
                  </div>
                </tab-content>

            </form-wizard>
        </div>
    </vx-card>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import userAPI from '../../../../http/requests/api/user/index.js'

export default {
  data () {
    return {
      userInfo: {
        user_id: '',
        name: '',
        email: '',
        user_dept: '',
        user_office: '',
        role_id: 1,
        user_company: '',
        user_position: '',
        user_hiredate: '',
        user_birthday: '',
        user_idcard: '',
        user_gender: '男',
        nativePlace: {
          native_address: '',
          native_city: '',
          native_province: ''
        },
        user_phone: ''
      },
      roleOptions: [
        { label: '超级管理员',  value: 1 },
        { label: '公司管理员',  value: 2 },
        { label: '部门管理员',  value: 3 },
        { label: '员工',  value: 4 }
      ]
    }
  },
  methods: {
    formSubmitted () {
      userAPI.addUser(this.userInfo)
        .then(() => { 
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
    TabContent,
    flatPickr
  }
}
</script>
