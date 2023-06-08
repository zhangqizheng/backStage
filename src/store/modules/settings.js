/*
 * @Author: your name
 * @Date: 2021-05-07 14:53:12
 * @LastEditTime: 2021-05-08 10:32:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /gitee-scene-monitoring/src/store/modules/settings.js
 */
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo, embedded, screenStyle } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  embedded: embedded,
  screenStyle: screenStyle
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

