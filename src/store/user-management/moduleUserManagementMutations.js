/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_USERS (state, users) {
    state.users = users
  },
  // 需要修改
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
  },
  SET_PERMISSIONS (state, permissions) {
    state.permissions = permissions
  },
  REMOV_USER (state, userId) {
    const userIndex = state.users.findIndex((u) => u.user_id === userId)
    state.users.splice(userIndex, 1)
  }
}
