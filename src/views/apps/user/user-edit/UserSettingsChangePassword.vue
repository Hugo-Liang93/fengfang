<template>
  <vx-card no-shadow>
    <span class="text-danger">{{ errors.first('old_password') }}</span>
    <vs-input class="w-full mb-base" label-placeholder="原密码" data-vv-validate-on="blur" v-validate="'required|min:6|max:10'" name="old_password" v-model="old_password" />
    
    <span class="text-danger">{{ errors.first('new_password') }}</span>
    <vs-input class="w-full mb-base" label-placeholder="新密码" data-vv-validate-on="blur" name="new_password" v-validate="'required|min:6|max:10'" v-model="new_password" />
    
    <span class="text-danger">{{ errors.first('confirm_new_password') }}</span>
    <vs-input class="w-full mb-base" label-placeholder="再次确认" data-vv-validate-on="blur" name="confirm_new_password" v-validate="'required|min:6|max:10'" v-model="confirm_new_password" />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" @click="changePass" :disabled="!validateForm">Save Changes</vs-button>
    </div>
  </vx-card>
</template>

<script>
import axios from '../../../../http/requests/auth/jwt/index.js'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    validateForm () {
      return !this.errors.any() && this.old_password !== '' && this.new_password !== '' && this.confirm_new_password !== ''
    }
  },
  methods: {
    changePass () {
      if (this.new_password !== this.confirm_new_password) {
        this.$vs.notify({
          title: 'Error',
          text: '输入密码不一致',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      } else {
        this.$vs.loading()
        axios.resetPass({
          user_id: this.activeUserInfo.user_id,
          oldPass: this.old_password, 
          newPass: this.confirm_new_password})
          .then(response => { 
            const res = response.data
            this.$vs.loading.close()
            if (res.status) {
              this.$vs.notify({
                title: 'Success',
                text: '保存成功',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
              })
            } else {
              this.$vs.notify({
                title: 'Error',
                text: res.errorMsg,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            }
            
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
    }
  }
}
</script>
