/*
 * @Author: your name
 * @Date: 2019-12-23 17:37:45
 * @LastEditTime: 2021-07-12 10:07:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/router/modules/screen.js
 */
/**
 * 首页
 */
import screenLayout from '@/views/screen/screenLayout'
const screen = {
  path: '/screen',
  component: screenLayout,
  name: 'screenLayout',
  redirect: '/screenMain',
  hidden: false,
  meta: {
    title: '可视化管理',
    icon: 'menu'
  },
  children: [
    {
      path: '/screenMain',
      component: () => import('@/views/screen/main'),
      meta: { title: '可视化管理', icon: 'menuSon' },
      name: 'screenMain'
    }
  ]
}

export default screen
