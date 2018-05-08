// import Components  over here
import navs from './navs'
import Index from './index'
import Appointment from './appointment'
import MedicalRecord from './medicalrecord'
import Profile from './profile'
import UpdateProfile from './updateprofile.vue'
import Doc from '@/components/features/eachDoc'
import Carts from './carts'

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
      patientAuth: true
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
  },
  {
    path: navs.links.updateProfile.url,
    name: 'BHS | ' + navs.links.updateProfile.text,
    component: UpdateProfile,
    meta: {
      requiresAuth: true,
      patientAuth: true
    }
  },
  {
    path: navs.links.cart.url,
    name: 'BHS | ' + navs.links.cart.text,
    component: Carts,
    meta: {
      requiresAuth: true,
      patientAuth: true
    }
  },
  {
    path: '/patient/view-doctor/*',
    name: 'BHS | view doctor',
    component: Doc,
    meta: {
      requiresAuth: true,
      patientAuth: true
    }
  }
]
