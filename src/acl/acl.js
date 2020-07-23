import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'staff'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.permission.role_name_en) initialRole = userInfo.permission.role_name_en

console.log(initialRole)

export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    admin  : new AclRule('admin').generate(),
    editor : new AclRule('editor').or('admin').generate(),
    isPublic : new AclRule('admin').or('com_admin').or('dept_admin').or('staff').generate(),
    isAdmin: new AclRule('admin').or('com_admin').or('dept_admin').generate()
  }
})
