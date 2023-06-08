import store from '../store'

store.dispatch('getByDictKey')

const dictMap = store.state.dict.dictMap
const dictKeyMap = store.state.dict.dictKeyMap

function getNewType(val) {
  if (val) {
    const arr = val.split(',')
    let str = ''
    arr.forEach(item => {
      str += dictKeyMap.YXPXLX[item] + ','
    })
    str = str.substr(0, str.length - 1)
    return str
  }
}
export default { dictMap, dictKeyMap, getNewType }
