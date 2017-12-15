// import Components  over here
import navs from './navs'
import Index from './index'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHCS | ' + navs.links.interface.url,
    component: Index
  }
]
