/* eslint-disable import/extensions */
import { lazy } from 'react';

import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';
import Home from "@/pages/Home"
const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/login', // 路由路径
        name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
        icon: 'setting', // 菜单图标
        component: lazy(() => import('@/pages/Login')), // 懒加载 路由组件
      },
      {
        path: '/register', // 路由路径
        name: '注册页', // 菜单名称 (不设置,则不展示在菜单栏中）
        icon: 'setting', // 菜单图标
        component: lazy(() => import('@/pages/Register')), // 懒加载 路由组件
      },
      // {
      //   path: '/invite', // 路由路径
      //   name: '邀请码', // 菜单名称 (不设置,则不展示在菜单栏中）
      //   icon: 'setting', // 菜单图标
      //   component: lazy(() => import('@/pages/Invite')), // 懒加载 路由组件
      // },
      {
        path: '/',
        // exact: true,
        component: BasicLayout, // 基本布局
        childRoutes: [
          {
            path: '/home',
            name: '数据动态',
            icon: 'home',
            // component: lazy(() => import('@/pages/Home')),
            component:Home
          },
          {
            path: '/welcome',
            name: '报警信息',
            icon: 'alert',
            component: lazy(() => import('@/pages/Welcome')),
          },
          {
            path: '/invite',
            name: '邀请码',
            icon: 'setting',
            component: lazy(() => import('@/pages/Invite')),
          },


          { path: '/', exact: true, redirect: '/login' },
          { path: '*', exact: true, redirect: '/exception/404' },
        ],
      },
    ],
  },
];

export default config;
