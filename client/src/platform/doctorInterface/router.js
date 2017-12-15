// import components for doctor interface

import navs from './navs'
import Index from './index'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHCS | ' + navs.links.interface.text,
    component: Index
  }
]
