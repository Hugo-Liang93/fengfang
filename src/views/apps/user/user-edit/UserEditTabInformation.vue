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
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">

        <!-- Col Header -->
        <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Personal Information</span>
        </div>

        <!-- Col Content -->
        <div>

          <!-- DOB -->
          <div class="mt-4">
            <label class="text-sm">生日日期</label>
            <!-- Y-m-d -->
            <flat-pickr v-model="data_local.user_birthday" :config="{altFormat: 'Y-m-d', dateFormat: 'Y-m-d', defaultDate: data_local.user_birthday, maxDate: new Date() }" class="w-full" v-validate="'required'" name="dob" />
            <span class="text-danger text-sm"  v-show="errors.has('dob')">{{ errors.first('dob') }}</span>
          </div>

          <vs-input class="w-full mt-4" label="身份证号" v-model="data_local.user_idcard" v-validate="{regex: '^\\+?([0-9]+)$' }" name="idcard" />
          <span class="text-danger text-sm"  v-show="errors.has('idcard')">{{ errors.first('idcard') }}</span>


          <!-- Gender -->
          <div class="mt-4">
            <label class="text-sm">性别</label>
            <div class="mt-2">
              <vs-radio v-model="data_local.user_gender" vs-value="男" class="mr-4">男</vs-radio>
              <vs-radio v-model="data_local.user_gender" vs-value="女" class="mr-4">女</vs-radio>
            </div>
          </div>

<!--          <div class="mt-6">
            <label>Contact Options</label>
            <div class="flex flex-wrap mt-1">
            <vs-checkbox v-model="data_local.contact_options" vs-value="email" class="mr-4 mb-2">Email</vs-checkbox>
            <vs-checkbox v-model="data_local.contact_options" vs-value="message" class="mr-4 mb-2">Message</vs-checkbox>
            <vs-checkbox v-model="data_local.contact_options" vs-value="Phone" class=" mb-2">Phone</vs-checkbox>
            </div>
          </div>
 -->
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
            <vs-input class="w-full mt-4" label="Address Line 1" v-model="data_local.nativePlace.native_address" v-validate="'required'" name="addd_line_1" />
            <span class="text-danger text-sm"  v-show="errors.has('addd_line_1')">{{ errors.first('addd_line_1') }}</span>


            <vs-input class="w-full mt-4" label="City" v-model="data_local.nativePlace.native_city" v-validate="'required'" name="city" />
            <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

            <vs-input class="w-full mt-4" label="State" v-model="data_local.nativePlace.native_province" v-validate="'required'" name="state" />
            <span class="text-danger text-sm"  v-show="errors.has('state')">{{ errors.first('state') }}</span>


          </div>
      </div>
    </div>

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
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'

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

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',  value: 'spanish'  },
        { label: 'French',   value: 'french'   },
        { label: 'Russian',  value: 'russian'  },
        { label: 'German',   value: 'german'   },
        { label: 'Arabic',   value: 'arabic'   },
        { label: 'Sanskrit', value: 'sanskrit' }
      ]
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return
      // Here will go your API call for updating data
      // You can get data in "this.data_local"
      this.$vs.loading()
      this.$store.dispatch('userManagement/saveUserInfo', this.data_local)
        .then(() => { this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: '保存成功',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
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
      this.data_local = Object.assign({}, this.data)
    }
  }
}
</script>
