const routes = [
  {
    path: '/',
    component: () => import('src/layouts/Main.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/feed',
        component: () => import('pages/Feed.vue')
      },
      {
        path: '/my/notifications',
        component: () => import('pages/Notifications.vue')
      },
      {
        path: '/my/chats',
        component: () => import('pages/Chats.vue')
      },
      {
        path: '/bookmarks',
        component: () => import('pages/Bookmarks.vue')
      },
      {
        path: '/my/lists',
        component: () => import('pages/Lists.vue')
      },
      {
        path: '/my/subscriptions',
        component: () => import('pages/Subscriptions.vue')
      },
      {
        path: '/posts/create',
        component: () => import('pages/CreatePost.vue')
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
  // {
  //   path: '/user',
  //   component: () => import('layouts/User.vue'),
  //   children: [
  //     {
  //       path: 'profile',
  //       name: 'UserProfile',
  //       component: () => import('pages/user/Profile.vue'),
  //       meta: {
  //         requiresAuth: true
  //       }
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
