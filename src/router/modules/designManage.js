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
  path: '/deignManage',
  component: ForRouter,
  name: 'deignManage',
  redirect: '/deignManage',
  hidden: false,
  meta: {
    title: '规划设计管理',
    icon: 'menu'
  },
  children: [
    {
      path: '/equipment/index',
      component: () => import('@/views/business/modules/deignManage/equipment/index'),
      name: '/equipment/index',
      meta: { title: '设备清单', icon: 'menuSon' }

    },
    {
      path: '/reconnaissance/index',
      component: () => import('@/views/business/modules/deignManage/reconnaissance/index'),
      name: '/reconnaissance/index',
      meta: { title: '勘察信息', icon: 'menuSon' }

    },
    {
      path: '/putaway/index',
      component: () => import('@/views/business/modules/deignManage/putaway/index'),
      name: 'putaway',
      meta: { title: '上架管理', icon: 'menuSon' }

    },
    {
      path: '/device/index',
      component: () => import('@/views/business/modules/deignManage/device/index'),
      name: '/device/index',
      meta: { title: '设备库管理', icon: 'menuSon' }

    },
    {
      path: '/dissipation/index',
      component: () => import('@/views/business/modules/deignManage/dissipation/index'),
      name: '/dissipation/index',
      meta: { title: '机柜功耗管理', icon: 'menuSon' }

    },
    {
      path: '/cable/index',
      component: () => import('@/views/business/modules/deignManage/cable/index'),
      name: '/cable/index',
      meta: { title: '缆线管理', icon: 'menuSon' }

    },
    {
      path: '/port/index',
      component: () => import('@/views/business/modules/deignManage/port/index'),
      name: '/port/index',
      meta: { title: '端口管理', icon: 'menuSon' }

    },
    {
      path: '/role/index',
      component: () => import('@/views/business/modules/deignManage/role/index'),
      name: '/role/index',
      meta: { title: '角色关系管理', icon: 'menuSon' }

    }
  ]
}

export default jypx
