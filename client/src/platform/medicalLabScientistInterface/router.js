// importing the required components for Medical Lab scientist dashboard

import navs from './navs'
import Index from './index'
import Profile from './profile'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index
  },
  {
    path: navs.links.profile.url,
    name: 'BHS | ' + navs.links.profile.text,
    component: Profile,
    meta: {
      requiresAuth: true,
      medicalLabScientistAuth: true
    }
  }
]
