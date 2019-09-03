import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  // mock user data.
  // TODO: Delete later
  const isAuthenticated = true;
  const user = {
    ID: 12,
    email: 'limyandi.com',
    name: 'Sorenson,Dan K.',
    role: 'Customer',
    deliveries: [
      {
        ID: 1,
        date: '1985-06-24',
        time: '03:35:17Z',
        timeTo: '08:45:01Z',
        status: true,
        pickupLocation: 'S2593',
        fromAddress: 'M1905'
      },
      {
        ID: 8,
        date: '1948-06-05',
        time: '09:56:09Z',
        timeTo: '21:49:45Z',
        status: true,
        pickupLocation: 'S6282',
        fromAddress: 'T4642'
      },
      {
        ID: 15,
        date: '1943-01-28',
        time: '06:05:24Z',
        timeTo: '15:14:44Z',
        status: false,
        pickupLocation: 'P380',
        fromAddress: 'H2268'
      }
    ],
    pickups: [
      {
        ID: 17,
        date: '1995-02-26',
        time: '13:20:08Z',
        timeTo: '02:27:07Z',
        status: false,
        pickupLocation: 'G4768'
      }
    ],
    communities: [
      {
        ID: 20,
        name: 'Mastrolito,Andrew D.',
        dispatchCentres: ['6']
      },
      {
        ID: 8,
        name: 'Kovalev,Martin W.'
      }
    ],
    driverDetails: {
      availabilities: {
        Monday: {
          from: '11:42:33Z',
          to: '18:49:12Z'
        },
        Tuesday: {
          from: '11:36:42Z',
          to: '13:16:54Z'
        },
        Wednesday: {
          from: '09:28:06Z',
          to: '15:37:49Z'
        },
        Thursday: {
          from: '11:06:15Z',
          to: '14:32:06Z'
        },
        Friday: {
          from: '11:41:57Z',
          to: '15:39:17Z'
        },
        Saturday: {
          from: '07:25:21Z',
          to: '17:25:53Z'
        },
        Sunday: {
          from: '08:09:53Z',
          to: '20:54:51Z'
        }
      },
      appNotification: true,
      emailNotification: true,
      smsNotification: false
    }
  };

  const communities = [];

  setGlobal({ user, isAuthenticated, communities });
}
