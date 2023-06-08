/*
 * @Author: your name
 * @Date: 2021-07-02 11:06:09
 * @LastEditTime: 2021-07-05 16:59:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-Tamil-Web-UI/src/router/modules/home.js
 */
import Layout from '@/layout'

const home = {
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    title: '主页',
    icon: 'menu'
  },
  children: [
    {
      path: 'home',
      component: () => import('@/views/business/home/index'),
      name: 'Home',
      meta: { title: '主页', icon: 'menuSon' }

    }
  ]

}

export default home
