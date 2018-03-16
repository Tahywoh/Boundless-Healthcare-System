// import components for pharmacist interface

import navs from './navs'
import Index from './index'
import Profile from './profile'
import Eachdrug from '@/components/features/eachDrug'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      pharmacistAuth: true
    }
  },
  {
    path: navs.links.profile.url,
    name: 'BHS | ' + navs.links.profile.text,
    component: Profile,
    meta: {
      requiresAuth: true,
      pharmacistAuth: true
    }
  },
  {
    path: `/pharmacy/drug-description/current-drug-*`,
    name: 'BHS | Drug description',
    component: Eachdrug,
    meta: {
      requiresAuth: true
    }
  }
]
