/*
 * @Author: your name
 * @Date: 2021-07-06 13:40:32
 * @LastEditTime: 2021-07-06 14:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-Tamil-Web-UI/src/store/modules/menuDataDemo.js
 */
/*
 * @Author: your name
 * @Date: 2021-07-06 11:34:10
 * @LastEditTime: 2021-07-06 11:35:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-Tamil-Web-UI/src/store/modules/menuDataDemo.js
 */

export const menu_list = [
  {
    'path': '/',
    'component': 'Layout',
    'redirect': '/home',
    'meta': {
      'title': '概览展示模板',
      'icon': 'menu'
    },
    'children': [
      {
        'path': 'home',
        'component': 'views/business/StatisticalAnalysis/Equipment',
        'name': 'Home',
        'meta': { 'title': '模板1', 'icon': 'menuSon' }
      }, {
        'path': '/TaskStatisticsAnalysis',
        'component': 'views/business/StatisticalAnalysis/TaskStatistics',
        'name': 'TaskStatisticsAnalysis',
        'meta': { 'title': '模板2', 'icon': 'menuSon' }
      }
    ]
  }
]
