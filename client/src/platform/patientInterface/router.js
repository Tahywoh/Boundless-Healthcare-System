// import Components  over here
import navs from './navs'
import Index from './index'
import Appointment from './appointment'
import MedicalRecord from './medicalrecord'
import Profile from './profile'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      patientAuth: true
    }
  },
  {
    path: navs.links.appointment.url,
    name: 'BHS | ' + navs.links.appointment.text,
    component: Appointment,
    meta: {
      requiresAuth: true,
      patientAuth: true
    }
  },
  {
    path: navs.links.medicalRecord.url,
    name: 'BHS | ' + navs.links.medicalRecord.text,
    component: MedicalRecord,
    meta: {
      requiresAuth: true,
      patientAuth: true,
      doctorAuth: true
    }
  },
  {
    path: navs.links.profile.url,
    name: 'BHS | ' + navs.links.profile.text,
    component: Profile,
    meta: {
      requiresAuth: true,
      patientAuth: true
    }
  }
]
