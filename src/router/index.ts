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
      name: 'CRUD 示例',
      path: '/table',
      component: '../pages/Table',
    },
  ];
  
  export default routes;