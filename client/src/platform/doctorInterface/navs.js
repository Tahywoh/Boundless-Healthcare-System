export default {
  header: 'Doctor Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/doctor-interface', text: 'doctor Interface'
    },
    appointment: {
      url: '/doctor-interface/appointment', text: 'Appointment', icon: 'icon ion android-contacts'
    },
    patient: {
      url: '/doctor-interface/patients', text: 'Patients', icon: 'icon ion-person'
    },
    message: {
      url: '/doctor-interface/:id', text: 'Message', icon: 'icon ion-chatbox-working'
    },
    updateProfile: {
      url: '/doctor-interface/update-profile', text: 'Update Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/doctor-interface/profile', text: 'Profile'
    }
  }
}
