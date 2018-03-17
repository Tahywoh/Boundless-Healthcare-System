export default {
  header: 'pharmacist Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/Pharmacist-interface', text: 'pharmacist Interface'
    },
    orders: {
      url: '/Pharmacist-interface/orders', text: 'Orders', icon: 'icon ion-ios-download'
    },
    addDrug: {
      icon: 'icon ion-ios-plus'
    },
    updateProfile: {
      url: `/Pharmacist-interface/${encodeURI('update profile')}`, text: 'Update Pharmacist Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/Pharmacist-interface/profile', text: 'Pharmacist Profile'
    }
  }
}
