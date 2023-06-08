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
  path: '/funding',
  component: ForRouter,
  name: 'funding',
  redirect: '/funding',
  hidden: false,
  meta: {
    title: '消息',
    icon: 'menu'
  },
  children: [
    {
      path: '/funding/index',
      component: () => import('@/views/business/modules/funding/index'),
      name: '/funding/index',
      meta: { title: '教育资助管理', icon: 'menuSon' }

    }
  ]
}

export default jypx
