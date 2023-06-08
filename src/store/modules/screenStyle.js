/*
 * @Author: your name
 * @Date: 2020-06-29 11:44:46
 * @LastEditTime: 2020-11-05 16:01:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /后端服务对接/src/store/modules/user.js
 */
import Cookies from 'js-cookie'
const state = {
  theme: '',
  drag: []
}

const mutations = {
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  SET_DRAG: (state, drag) => {
    state.drag = drag
  }
}

const actions = {
  // 赋值主题数据
  SetThemeData({ commit }, themeData) {
    return new Promise((resolve, reject) => {
      if (themeData) {
        Cookies.set('themeData', themeData)
        commit('SET_THEME', themeData)
        resolve()
      } else {
        reject('error')
      }
    })
  },
  // 赋值拖拽布局数据
  SetDragData({ commit }, dragList) {
    return new Promise((resolve, reject) => {
      if (dragList) {
        commit('SET_DRAG', dragList)
        resolve()
      } else {
        reject('error')
      }
    })
  },

  // 退出系统
  LogOut({ commit }) {
    return new Promise(resolve => {
      Cookies.remove('themeData')
      commit('SET_THEME', '')
      commit('SET_DRAG', [])
      resolve()
    })
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      Cookies.remove('themeData')
      commit('SET_THEME', '')
      commit('SET_DRAG', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
