/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'
import userAPI from '../../http/requests/api/user/index.js'

export default {
  // addItem({ commit }, item) {
  //   return new Promise((resolve, reject) => {
  //     axios.post("/api/data-list/products/", {item: item})
  //       .then((response) => {
  //         commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  fetchUsers ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/user-management/users')
        .then((response) => {
          //调用在获取所有用户数据的时候
          commit('SET_USERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchPermissions ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/user-management/permissions')
        .then((response) => {
          //调用在获取所有用户数据的时候
          commit('SET_PERMISSIONS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUser (context, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/user-management/users/${userId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/user-management/users/${userId}`)
        .then((response) => {
          commit('REMOVE_RECORD', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  
  saveAccountInfo (context, user) {
    return new Promise((resolve, reject) => {
      userAPI.saveAccountInfo(user)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  saveUserInfo (context, user) {
    return new Promise((resolve, reject) => {
      userAPI.saveUserInfo(user)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  saveUserSocialInfo (context, user) {
    return new Promise((resolve, reject) => {
      userAPI.saveUserSocialInfo(user)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeUser ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      userAPI.removeUser(userId).then((response) => {
        commit('REMOV_USER', userId)
        resolve(response)
      }).catch((error) => { reject(error) })
    })
  }
}
