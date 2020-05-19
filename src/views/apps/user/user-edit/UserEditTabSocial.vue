<!-- =========================================================================================
  File Name: UserEditTabSocial.vue
  Description: User Edit Social Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">

      <!-- Col 1 -->
      <div class="vx-col w-full md:w-1/2">
        <vs-input
          class="w-full"
          v-model="data_local.social.user_weibo"
          icon-pack="feather"
          icon="icon-twitter"
          label="weibo"
          icon-no-border
          v-validate="'url:require_protocol'"
          name="twitter" />
          <span class="text-danger text-sm"  v-show="errors.has('twitter')">{{ errors.first('twitter') }}</span>

        <vs-input
          class="w-full mt-4"
          v-model="data_local.social.user_wechat"
          icon-pack="feather"
          icon="icon-facebook"
          label="WechatID"
          icon-no-border
          v-validate="'url:require_protocol'"
          name="facebook" />
          <span class="text-danger text-sm"  v-show="errors.has('facebook')">{{ errors.first('facebook') }}</span>

<!--        <vs-input
          class="w-full mt-4"
          v-model="data_local.social_links.instagram"
          icon-pack="feather"
          icon="icon-instagram"
          label="Instagram"
          icon-no-border
          v-validate="'url:require_protocol'"
          name="instagram" />
          <span class="text-danger text-sm"  v-show="errors.has('instagram')">{{ errors.first('instagram') }}</span>
 -->
      </div>

      <!-- Col 2 -->
      <div class="vx-col w-full md:w-1/2">
        <vs-input
          class="w-full mt-4 md:mt-0"
          v-model="data_local.social.user_mobile"
          icon-pack="feather"
          icon="icon-github"
          label="Photo"
          icon-no-border
          v-validate="{regex: '^\\+?([0-9]+)$' }"
          name="github" />
          <span class="text-danger text-sm"  v-show="errors.has('github')">{{ errors.first('github') }}</span>

 <!--       <vs-input
          class="w-full mt-4"
          v-model="data_local.social_links.codepen"
          icon-pack="feather"
          icon="icon-codepen"
          label="CodePen"
          icon-no-border
          v-validate="'url:require_protocol'"
          name="codepen" />
          <span class="text-danger text-sm"  v-show="errors.has('codepen')">{{ errors.first('codepen') }}</span>

        <vs-input
          class="w-full mt-4"
          v-model="data_local.social_links.slack"
          icon-pack="feather"
          icon="icon-slack"
          label="Slack"
          icon-no-border
          v-validate="'url:require_protocol'"
          name="slack" />
          <span class="text-danger text-sm"  v-show="errors.has('slack')">{{ errors.first('slack') }}</span>
 -->
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
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data_local: JSON.parse(JSON.stringify(this.data))
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

      // Here will go your API call for updating data (Also remvoe eslint-disable)
      // You can get data in "this.data_local"
      this.$vs.loading()
      this.$store.dispatch('userManagement/saveUserSocialInfo', this.data_local)
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
