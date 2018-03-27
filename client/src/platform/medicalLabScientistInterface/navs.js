export default {
  header: 'Medical Laboratory Scientist Dashboard',
  default: 'interface',
  links: {
    interface: {
      url: '/MedicalLabScientist-interface', text: 'Medical lab scientist Interface'
    },
    appointment: {
      url: '/MedicalLabScientist-interface/appointment', text: 'Appointment', icon: 'icon ion-android-contacts'
    },
    updateProfile: {
      url: `/MedicalLabScientist-interface/${encodeURI('update profile')}`, text: 'Update Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/MedicalLabScientist-interface/profile', text: 'Medical laboratory Scientist Profile'
    }
  }
}
