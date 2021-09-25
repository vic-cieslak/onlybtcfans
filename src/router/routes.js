const routes = [
  {
    path: '/',
    component: () => import('src/layouts/Main.vue'),
    meta: {
      requiresAuth: true,
      toolbarTitle: 'HOME'
    },
    children: [
      {
        path: '/feed',
        component: () => import('pages/Feed.vue'),
      },
      {
        path: '/my/notifications',
        component: () => import('pages/Notifications.vue'),
        meta: { toolbarTitle: 'NOTIFICATIONS' }
      },
      {
        path: '/my/chats',
        component: () => import('pages/Chats.vue'),
        meta: { toolbarTitle: 'MESSAGES' }
      },
      {
        path: '/bookmarks',
        component: () => import('pages/Bookmarks.vue'),
        meta: { toolbarTitle: 'BOOKMARKS' }
      },
      {
        path: '/my/lists',
        component: () => import('pages/Lists.vue'),
        meta: { toolbarTitle: 'LISTS' }
      },
      {
        path: '/my/subscriptions',
        component: () => import('pages/Subscriptions.vue'),
        meta: { toolbarTitle: 'SUBSCRIPTIONS' }
      },
      {
        path: '/posts/create',
        component: () => import('pages/CreatePost.vue'),
        meta: { toolbarTitle: 'ADD POST' }
      },
      {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('pages/user/Profile.vue'),
      }
    ]
  },
  {
    path: '/social_auth',
    component: () => import('layouts/Empty.vue'),
    children: [
      { path: '', component: () => import('pages/SocialAuth.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/Basic.vue'),
    children: [
      {
        path: 'forgotPassword',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Auth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Auth.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
