/*
 * @Author: your name
 * @Date: 2021-04-20 14:43:52
 * @LastEditTime: 2021-05-24 10:02:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-ai-platform/src/settings.js
 */
var time = new Date()
module.exports = {
  title: '翼设计',
  /**
   * @type {boolean} true | false
   * @description 是否显示设置右侧面板
   */
  showSettings: true,
  /**
   * @type {boolean} true | false
   * @description 是否需要tags标签
   */
  tagsView: true,
  /**
   * @type {boolean} true | false
   * @description 是否修复头部
   */
  fixedHeader: true,
  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏中显示logo
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description 是否设置为嵌入模式
   */
  embedded: false,
  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示错误日志组件。
   * 默认值仅在生产环境中使用
   * 如果你也想在dev中使用它，你可以通过['production'， 'development']
   */
  errorLog: 'production',
  Time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() // 打包时间
}
