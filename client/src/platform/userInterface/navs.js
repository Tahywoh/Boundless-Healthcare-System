export default {
  header: 'User Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/user-interface', text: 'Interface'
    },
    appointment: {
      url: '/user-interface/appointment', text: 'Appointment', icon: 'icon ion-android-contacts'
    },
    medicalRecord: {
      url: '/user-interface/medical-record', text: 'Medical Record', icon: 'icon ion-ios-paper'
    },
    message: {
      url: '/user-interface/:id', text: 'Message', icon: 'icon ion-chatbox-working'
    },
    cart: {
      url: '/user-interface/cart', text: 'Cart', icon: 'icon ion-ios-cart'
    },
    updateProfile: {
      url: '/user-interface/update-profile', text: 'Update Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/user-interface/profile', text: 'Profile'
    }
  }
}
