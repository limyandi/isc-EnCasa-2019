import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  // mock user data.
  // TODO: Delete later
  const user = {
    ID: 10,
    email: 'I4943',
    communities: [
      {
        ID: 16,
        name: 'Ueckert,Dan K.'
      },
      {
        ID: 9,
        name: 'Mastrolito,Brenda J.'
      },
      {
        ID: 4,
        name: 'Hanson,Lydia X.',
        dispatchCentres: ['12', '2', '6', '3', '17', '19', '20', '15']
      },
      {
        ID: 15,
        name: "O'Brien,Lisa H.",
        dispatchCentres: ['2']
      },
      {
        ID: 19,
        name: 'Zevon,Joshua M.',
        dispatchCentres: ['4', '18', '17', '7']
      },
      {
        ID: 4,
        name: 'Hanson,Lydia X.',
        dispatchCentres: ['12', '2', '6', '3', '17', '19', '20', '15']
      },
      {
        ID: 6,
        name: 'Sverdlov,Buzz E.',
        dispatchCentres: ['8', '9', '19', '10', '12', '13', '14', '5', '4']
      },
      {
        ID: 12,
        name: 'Xavier,Jane Q.',
        dispatchCentres: ['16', '12', '18']
      }
    ],
    driverDetails: {
      availability: 'Specific Times',
      appNotification: true,
      emailNotification: false,
      smsNotification: true
    }
  };

  const deliveries = [];

  setGlobal({ user, deliveries });
}
