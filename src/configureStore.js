import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  // mock user data.
  // TODO: Delete later
  const user = {
    ID: 2,
    email: 'Y6896',
    deliveries: [
      {
        ID: 4,
        date: '1992-08-09',
        time: '10:11:53Z',
        fromAddress: 'G5856',
        pickupLocation: 'M3342',
        status: true
      }
    ],
    communities: [
      {
        dispatchCentres: ['8', '1', '11', '3', '17', '19', '18', '10']
      },
      {
        dispatchCentres: ['11', '7', '4', '7', '15', '14']
      },
      {
        dispatchCentres: ['10', '17', '20', '14', '9', '17', '4']
      },
      {
        dispatchCentres: ['9', '9', '10']
      }
    ],
    driverDetails: {
      availability: 'Specific Times',
      notifcation: true
    },
    role: 'Customer'
  };

  const deliveries = [];

  setGlobal({ user, deliveries });
}
