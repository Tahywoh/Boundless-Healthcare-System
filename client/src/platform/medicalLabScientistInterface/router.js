// importing the required components for Medical Lab scientist dashboard

import navs from './navs'
import Index from './index'
import Profile from './profile'
import UpdateProfile from './updateprofile'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      medicalLabScientistAuth: true
    }
  },
  {
    path: navs.links.updateProfile.url,
    name: 'BHS | ' + navs.links.updateProfile.text,
    component: UpdateProfile,
    meta: {
      requiresAuth: true,
      medicalLabScientistAuth: true
    }
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
