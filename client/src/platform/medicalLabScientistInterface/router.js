// importing the required components for Medical Lab scientist dashboard

import navs from './navs'
import Index from './index'
import Profile from './profile'
import UpdateProfile from './updateprofile'
import Appointment from './appointment'
import Viewlab from '@/components/features/each-lab-scientist'

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
    path: `/${encodeURI('medical laboratory')}/user/view-*`,
    name: 'BHS | View laboratories',
    component: Viewlab,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: navs.links.appointment.url,
    name: 'BHS | ' + navs.links.appointment.text,
    component: Appointment,
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
