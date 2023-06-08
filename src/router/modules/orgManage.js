/*
 * @Author: haomiaomiao
 * @Date:2023年2月27 17:37:45
 * @LastEditTime: 2023年2月27 17:37:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath:
 */
/**
 * 首页
 */
import ForRouter from '@/layout'
const jypx = {
  path: '/orgManage',
  component: ForRouter,
  name: 'orgManage',
  redirect: '/orgManage',
  hidden: false,
  meta: {
    title: '机构遴选管理',
    icon: 'menu'
  },
  children: [
    {
      path: '/apply/index',
      component: () => import('@/views/business/modules/orgManage/apply/index'),
      name: '/apply/index',
      meta: { title: '机构申请审核', icon: 'menuSon' }

    },
    {
      path: '/appoint/index',
      component: () => import('@/views/business/modules/orgManage/appoint/index'),
      name: '/appoint/index',
      meta: { title: '机构续解约审核', icon: 'menuSon' }

    },
    {
      path: '/logout/index',
      component: () => import('@/views/business/modules/orgManage/logout/index'),
      name: '/logout/index',
      meta: { title: '机构注销审核', icon: 'menuSon' }

    },
    {
      path: '/messageManage/index',
      component: () => import('@/views/business/modules/orgManage/messageManage/index'),
      name: '/messageManage/index',
      meta: { title: '机构信息管理', icon: 'menuSon' }

    }
  ]
}

export default jypx
