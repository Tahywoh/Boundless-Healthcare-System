// import components for doctor interface

import navs from './navs'
import Index from './index'
import Profile from './profile'
import Appointment from './appointment'
import MedicalRecord from './medicalrecord'
import UpdateProfile from './updateprofile'

export default [
  {
    path: navs.links.interface.url,
    name: 'BHS | ' + navs.links.interface.text,
    component: Index,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  },
  {
    path: navs.links.profile.url,
    name: 'BHS | ' + navs.links.profile.text,
    component: Profile,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  },
  {
    path: navs.links.updateProfile.url,
    name: 'BHS | ' + navs.links.updateProfile.text,
    component: UpdateProfile,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  },
  {
    path: navs.links.medicalRecord.url,
    name: 'BHS | ' + navs.links.medicalRecord.text,
    component: MedicalRecord,
    meta: {
      requiresAuth: true,
      doctorAuth: true,
      patientAuth: true
    }
  },
  {
    path: navs.links.appointment.url,
    name: 'BHS | ' + navs.links.appointment.text,
    component: Appointment,
    meta: {
      requiresAuth: true,
      doctorAuth: true
    }
  }
]
