const routes = [
  {
    path: '/', name: 'Dashboard', redirect: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/Dashboard', name: 'Dashboard', component: () => import('pages/Dashboard.vue')},
      {path: '/Dashboard2', name: 'Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', name: 'Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/Map', name: 'Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', name: 'MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/TreeTable', name: 'TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/StreetView', name: 'StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/Cards', name: 'Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', name: 'Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', name: 'Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', name: 'Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Ecommerce', name: 'Ecommerce', component: () => import('pages/ProductCatalogues.vue')},
      {path: '/Pagination', name: 'Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Charts', name: 'Charts', component: () => import('pages/Charts.vue')},
      {path: '/Calendar', name: 'Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Directory', name: 'Directory', component: () => import('pages/Directory.vue')},
      {path: '/Footer', name: 'Footer', component: () => import('pages/Footer.vue')},
      {path: '/CardHeader', name: 'CardHeader', component: () => import('pages/CardHeader.vue')},

      {path: '/Users', name: 'Users', component: () => import('pages/Users.vue')},
      {path: '/Projects', name: 'Projects', component: () => import('pages/Projects.vue')},
      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/Mail', name: 'Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Maintenance', name: 'Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing', name: 'Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/Login', name: 'Login',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/Lock', name: 'Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Lock-2', name: 'Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

export default routes
