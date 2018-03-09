export default {
  header: 'Doctor Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/Doctor-interface', text: 'Doctor Interface'
    },
    appointment: {
      url: '/Doctor-interface/appointment', text: 'Doctor-Appointment', icon: 'icon ion android-contacts'
    },
    patient: {
      url: '/Doctor-interface/patients', text: 'Patients', icon: 'icon ion-person'
    },
    message: {
      url: '/Doctor-interface/:id', text: 'Message', icon: 'icon ion-chatbox-working'
    },
    updateProfile: {
      url: '/Doctor-interface/update-profile', text: 'Update Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/Doctor-interface/profile', text: 'Doctor Profile'
    }
  }
}
