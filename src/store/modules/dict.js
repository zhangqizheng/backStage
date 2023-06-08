// 请求字典的api
// import { queryDict } from '@/api/dict/dict.js'
const getDefaultState = () => {
  return {
    // 字典map
    dictMap: {},
    dictKeyMap: {}
  }
}
const state = getDefaultState()
const mutations = {
  // 保存字典项
  SAVE_DICT_ITEM: (state, data) => {
    // 需要拷贝一份，要不然数据变动监听不到
    state.dictMap = data
  },
  // 保存字典项
  SAVE_DICT_ITEM_KEY: (state, data) => {
    // 需要拷贝一份，要不然数据变动监听不到
    state.dictKeyMap = data
  }
}

const actions = {
  // 获取字典的action
  getByDictKey({ commit }, data) {
    // if(!data.dictKey) return
    return new Promise((resolve, reject) => {
      // 根据字典类型请求后台数据
      // 判断缓存是否存在，如果不存在则请求接口
      if (sessionStorage.getItem('DICTLIST') !== '' && sessionStorage.getItem('DICTLIST')) {
        const dictList = JSON.parse(sessionStorage.getItem('DICTLIST'))
        const keyMap = {}
        commit('SAVE_DICT_ITEM', dictList)
        this.dictMap = dictList
        Object.keys(dictList).forEach(item => {
          keyMap[item] = {}
          dictList[item].forEach(items => {
            keyMap[item][items.dictValue] = items.dictLabel
          })
          commit('SAVE_DICT_ITEM_KEY', keyMap)
          sessionStorage.setItem('SAVE_DICT_ITEM_KEY', JSON.stringify(keyMap))
          this.dictKeyMap = keyMap
        })
      } else {
        // queryDict().then((res) => {
        //   console.log(res)
        //   const keyMap = {}
        //   sessionStorage.setItem('DICTLIST', JSON.stringify(res.data))
        //   commit('SAVE_DICT_ITEM', res.data)
        //   Object.keys(res.data).forEach(item => {
        //     keyMap[item] = {}
        //     res.data[item].forEach(items => {
        //       keyMap[item][items.dictValue] = items.dictLabel
        //     })
        //     commit('SAVE_DICT_ITEM_KEY', keyMap)
        //     sessionStorage.setItem('SAVE_DICT_ITEM_KEY', JSON.stringify(keyMap))
        //   })
        //   resolve()
        // })
      }
    })
  }
}
export default {
  state,
  mutations,
  actions,
  getters: {
    dictMap(state) {
      return state.dictMap
    }
  }
}
