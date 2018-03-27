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
    medicalRecord: {
      url: '/Doctor-interface/medical-record', text: 'Patient Medical Record', icon: 'icon ion-ios-paper'
    },
    patient: {
      url: '/Doctor-interface/patients', text: 'Patients', icon: 'icon ion-person'
    },
    message: {
      url: '/Doctor-interface/:id', text: 'Message', icon: 'icon ion-chatbox-working'
    },
    updateProfile: {
      url: `/Doctor-interface/${encodeURI('update profile')}`, text: 'Update Doctor Profile', icon: 'icon ion-edit'
    },
    profile: {
      url: '/Doctor-interface/profile', text: 'Doctor Profile'
    }
  }
}
