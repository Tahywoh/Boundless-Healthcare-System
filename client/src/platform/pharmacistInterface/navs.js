export default {
  header: 'Pharmacist Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/pharmacist-interface', text: 'Interface'
    },
    orders: {
      url: '/pharmacist-interface/orders', text: 'Orders', icon: 'icon ion-ios-download'
    },
    addDrug: {
      icon: 'icon ion-ios-plus'
    },
    updateProfile: {
      url: '/doctor-interface/update-profile', text: 'Update Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/doctor-interface/profile', text: 'Profile'
    }
  }
}
