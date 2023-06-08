/*
 * @Author: your name
 * @Date: 2021-04-28 09:51:45
 * @LastEditTime: 2021-05-08 10:55:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-scene-monitoring/src/store/getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  remark: state => state.user.remark,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  theme: state => state.screenStyle.theme,
  drag: state => state.screenStyle.drag,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
