import authService from '../auth/authService'

export default {
  // use调用时实现install
  install (Vue) {
    Vue.prototype.$auth = authService
    // 全局混入
    Vue.mixin({
      created () {
        if (this.handleLoginEvent) {
          authService.addListener('loginEvent', this.handleLoginEvent)
        }
      },

      destroyed () {
        if (this.handleLoginEvent) {
          authService.removeListener('loginEvent', this.handleLoginEvent)
        }
      }
    })
  }
}