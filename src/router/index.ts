const routes = [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: '../pages/Home',
    },
    {
      name: 'Collapse 折叠面板',
      path: '/collapse',
      component: '../pages/Collapse',
    },
    {
      name: 'Flex 弹性布局',
      path: '/flex',
      component: '../pages/Flex',
    },
    {
      name: 'AnchorTitle 锚点表头',
      path: '/anchorTitle',
      component: '../pages/AnchorTitle',
    },
    {
      name: 'Tabs 标签页',
      path: '/tabs',
      component: '../pages/Tabs',
    },
    {
      name: 'Test 测试页',
      path: '/test',
      component: '../pages/Test',
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: '../pages/Table',
    },
  ];
  
  export default routes;