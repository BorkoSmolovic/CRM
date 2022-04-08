const routes = [
  {
    path: '/', name: 'Dashboard', auth: true,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/Dashboard', name: 'Dashboard', auth: true, component: () => import('pages/Dashboard.vue')},
      {path: '/Dashboard2', name: 'Dashboard2',auth: true, component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', name: 'Profile',auth: true, component: () => import('pages/UserProfile.vue')},
      {path: '/Map', name: 'Map',auth: true, component: () => import('pages/Map.vue')},
      {path: '/MapMarker', name: 'MapMarker',auth: true, component: () => import('pages/MapMarker.vue')},
      {path: '/TreeTable', name: 'TreeTable',auth: true, component: () => import('pages/TreeTable.vue')},
      {path: '/StreetView', name: 'StreetView',auth: true, component: () => import('pages/StreetView.vue')},
      {path: '/Cards', name: 'Cards',auth: true, component: () => import('pages/Cards.vue')},
      {path: '/Tables', name: 'Tables',auth: true, component: () => import('pages/Tables.vue')},
      {path: '/Contact', name: 'Contact',auth: true, component: () => import('pages/Contact.vue')},
      {path: '/Checkout', name: 'Checkout',auth: true, component: () => import('pages/Checkout.vue')},
      {path: '/Ecommerce', name: 'Ecommerce',auth: true, component: () => import('pages/ProductCatalogues.vue')},
      {path: '/Pagination', name: 'Pagination',auth: true, component: () => import('pages/Pagination.vue')},
      {path: '/Charts', name: 'Charts',auth: true, component: () => import('pages/Charts.vue')},
      {path: '/Calendar', name: 'Calendar',auth: true, component: () => import('pages/Calendar.vue')},
      {path: '/Directory', name: 'Directory',auth: true, component: () => import('pages/Directory.vue')},
      {path: '/Footer', name: 'Footer',auth: true, component: () => import('pages/Footer.vue')},
      {path: '/CardHeader', name: 'CardHeader',auth: true, component: () => import('pages/CardHeader.vue')},

      {path: '/Users', name: 'Users',auth: true, component: () => import('pages/Users.vue')},
      {path: '/Projects', name: 'Projects',auth: true, component: () => import('pages/Projects.vue')},
      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',auth: false,
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/Mail',auth: false, name: 'Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Maintenance', auth: false, name: 'Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing', auth: false, name: 'Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/Login', auth: false, name: 'Login',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/ResetPassword', auth: false, name: 'ResetPassword',
    component: () => import('pages/ResetPassword.vue')
  },
  {
    path: '/Lock', auth: false, name: 'Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Lock-2', auth: false, name: 'Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

export default routes
