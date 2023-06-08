// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/* 全局过滤空字段*/
export function FilterEmpty(res) {
  const obj = res
  if (!Array.isArray(obj)) {
    let arr
    // 默认判断字段里是否包含值 可过滤空 null undefined
    if ((arr = Object.keys(obj).filter(v => !obj[v])).length <= 0) {
      // 全部有值
    } else {
      for (var i in arr) {
        res[arr[i]] = '--'
      }
      console.log(res)
      return res
    }
    return res
  }
}
// 递归地址划区字段
// 递归参数
export function TranslateDataToTree(array) {
  // 第一层数据
  const parents = array.filter(item => item.admdvsLv === '1')
  // 有父节点的数据
  const childrens = array.filter(item => item.admdvsLv !== '1')
  function translator(parents, childrens) {
    parents.forEach(parent => {
      childrens.forEach((children, index) => {
        // 找到子层的父层
        if (children.prntAdmdvs === parent.admdvs) {
          // temp 这步不是必须
          // 对子节点数据进行深复制
          const temp = JSON.parse(JSON.stringify(childrens))
          // 让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1)
          // 判断是否有children属性 有就直接push 没有就增加children属性
          parent.children ? parent.children.push(children) : parent.children = [children]
          // 不用temp 传childrens也可
          translator([children], temp)
        }
      })
    })
  }
  translator(parents, childrens)
  // 返回最终结果
  return parents
}
// 全局字典过滤
