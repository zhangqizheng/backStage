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
  path: '/fundSearch',
  component: ForRouter,
  name: 'fundSearch',
  redirect: '/fundSearch',
  hidden: false,
  meta: {
    title: '消息',
    icon: 'menu'
  },
  children: [
    {
      path: '/fundSearch/index',
      component: () => import('@/views/business/modules/fundSearch/index'),
      name: '/fundSearch/index',
      meta: { title: '资助考核管理', icon: 'menuSon' }
    }
  ]
}

export default jypx
