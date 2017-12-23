// import components for doctor interface

import navs from './navs'
import Index from './index'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  }
]
