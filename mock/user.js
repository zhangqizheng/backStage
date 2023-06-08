/*
 * @Author: your name
 * @Date: 2021-05-17 17:47:22
 * @LastEditTime: 2021-07-06 14:41:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-scene-monitoring/mock/user.js
 */
// 测试动态路由数据
const menu_list = [
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
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // 用户登录
  {
    url: '/Tamil-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock 错误
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取用户信息
  {
    url: '/Tamil-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock 误差
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },
  {
    url: '/Tamil-admin/user/getRouters',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: menu_list
      }
    }
  },
  // 用户注销
  {
    url: '/Tamil-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
