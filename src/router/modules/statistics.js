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
  path: '/statistics',
  component: ForRouter,
  name: 'statistics',
  redirect: '/statistics',
  hidden: false,
  meta: {
    title: '统计分析',
    icon: 'menu'
  },
  children: [
    {
      path: '/statistics/index',
      component: () => import('@/views/business/modules/statistics/index'),
      name: '/statistics/index',
      meta: { title: '承训机构统计', icon: 'menuSon' }

    },
    {
      path: '/studentChat/index',
      component: () => import('@/views/business/modules/statistics/studentChat/index'),
      name: '/studentChat/index',
      meta: { title: '学员统计', icon: 'menuSon' }

    },
    {
      path: '/fundChat/index',
      component: () => import('@/views/business/modules/statistics/fundChat/index'),
      name: '/fundChat/index',
      meta: { title: '资金资助统计', icon: 'menuSon' }

    },
    {
      path: '/examineChat/index',
      component: () => import('@/views/business/modules/statistics/examineChat/index'),
      name: '/examineChat/index',
      meta: { title: '审批事项统计', icon: 'menuSon' }

    },
    {
      path: '/EducationChat/index',
      component: () => import('@/views/business/modules/statistics/EducationChat/index'),
      name: '/EducationChat/index',
      meta: { title: '教育培训统计', icon: 'menuSon' }

    }
  ]
}

export default jypx
