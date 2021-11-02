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
        name: 'HomeFeed',
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
        name: 'CreatePost',
        component: () => import('pages/CreatePost.vue'),
        meta: { toolbarTitle: 'NEW POST' }
      },
      {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('pages/user/Profile.vue'),
      },
      {
        path: '/user/settings',
        name: 'UserSettings',
        component: () => import('pages/user/Settings.vue'),
        meta: { toolbarTitle: 'SETTINGS' },
        children: [
          { path: 'account', name: 'SettingsAccount', component: () => import('pages/user/Account.vue') },
          { path: 'profile', name: 'SettingsProfile', component: () => import('pages/user/ProfileEdit.vue') },
          { path: 'privacy', name: 'SettingsPrivacy', component: () => import('pages/user/Privacy.vue') },
          { path: 'NewFeatures', name: 'SettingsNewFeatures', component: () => import('pages/user/NewFeatures.vue') },
          { path: 'display', name: 'SettingsDisplay', component: () => import('pages/user/Display.vue') },
          { path: 'notifications', name: 'SettingsNotifications', component: () => import('pages/user/Notifications.vue') },
          // { path: 'account', component: () => import('pages/user/account.vue') },
        ]
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
