// import Components  over here
import navs from './navs'
import Index from './index'
import Appointment from './appointment'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index
  },
  {
    path: navs.links.appointment.url,
    name: 'BHS | ' + navs.links.appointment.text,
    component: Appointment
  }
]
