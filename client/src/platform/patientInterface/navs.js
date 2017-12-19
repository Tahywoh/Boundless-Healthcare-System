export default {
  header: 'Patient Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/patient-interface', text: 'patient Interface'
    },
    appointment: {
      url: '/patient-interface/appointment', text: 'Appointment', icon: 'icon ion-android-contacts'
    },
    medicalRecord: {
      url: '/patient-interface/medical-record', text: 'Medical Record', icon: 'icon ion-ios-paper'
    },
    message: {
      url: '/patient-interface/:id', text: 'Message', icon: 'icon ion-chatbox-working'
    },
    cart: {
      url: '/patient-interface/cart', text: 'Cart', icon: 'icon ion-ios-cart'
    },
    updateProfile: {
      url: '/patient-interface/update-profile', text: 'Update Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/patient-interface/profile', text: 'Profile'
    }
  }
}
