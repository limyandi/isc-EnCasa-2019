import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  // mock user data.
  // TODO: Delete later
  const isAuthenticated = true;
  const user = {
    ID: 1,
    email: 'limyandi@gmail.com',
    name: 'Limyandi Vicotrico',
    phoneNumber: '+61 427 399 979',
    appNotification: true,
    emailNotification: false,
    smsNotification: false,
    deliveries: [
      {
        ID: 1,
        date: '2019-09-09',
        time: '17:30:00Z',
        timeTo: '19:30:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 2,
        date: '2019-09-09',
        time: '12:22:00Z',
        timeTo: '13:22:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 3,
        date: '2019-09-09',
        time: '12:25:00Z',
        timeTo: '13:25:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 4,
        date: '2019-09-09',
        time: '12:27:00Z',
        timeTo: '13:27:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 5,
        date: '2019-09-09',
        time: '12:30:00Z',
        timeTo: '13:30:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 6,
        date: '2019-09-09',
        time: '12:31:00Z',
        timeTo: '13:31:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 7,
        date: '2019-09-09',
        time: '12:32:00Z',
        timeTo: '13:32:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      },
      {
        ID: 8,
        date: '2019-09-09',
        time: '12:33:00Z',
        timeTo: '13:33:00Z',
        status: true,
        pickupAddress: '383 Kent St',
        deliveryAddress: '1213/208 Coward St'
      }
    ],
    pickups: [
      {
        ID: 1,
        date: '2019-09-09',
        time: '13:30:00Z',
        timeTo: '16:30:00Z',
        status: true,
        pickupAddress: '1213/208 Coward St'
      },
      {
        ID: 4,
        date: '2019-09-09',
        time: '15:29:00Z',
        timeTo: '16:29:00Z',
        status: false,
        pickupAddress: '1213/208 Coward St',
        deliverySlipID: 22
      },
      {
        ID: 5,
        date: '2019-09-09',
        time: '15:30:00Z',
        timeTo: '16:30:00Z',
        status: false,
        pickupAddress: '1213/208 Coward St'
      },
      {
        ID: 6,
        date: '2019-09-09',
        time: '15:32:00Z',
        timeTo: '16:32:00Z',
        status: true,
        pickupAddress: '1213/208 Coward St',
        deliverySlipID: 23
      }
    ],
    communities: [
      {
        ID: 2,
        name: 'Armidale Regional',
        latitude: '-30.41247',
        longitude: '151.94013'
      },
      {
        ID: 20,
        name: 'Camden Council',
        latitude: '-34.0161',
        longitude: '150.72521'
      },
      {
        ID: 107,
        name: 'Sydney',
        latitude: '-33.86778',
        longitude: '151.20844'
      },
      {
        ID: 65,
        name: 'Lane Cove',
        latitude: '-33.82321',
        longitude: '151.17028'
      }
    ],
    driverDetails: {
      availabilities: {
        Monday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        },
        Tuesday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        },
        Wednesday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        },
        Thursday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        },
        Friday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        },
        Saturday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        },
        Sunday: {
          from: '08:30:00Z',
          to: '20:00:00Z'
        }
      },
      appNotification: true,
      emailNotification: true,
      smsNotification: true,
      communities: [
        {
          ID: 2,
          name: 'Armidale Regional',
          latitude: '-30.41247',
          longitude: '151.94013'
        },
        {
          ID: 20,
          name: 'Camden Council',
          latitude: '-34.0161',
          longitude: '150.72521'
        },
        {
          ID: 107,
          name: 'Sydney',
          latitude: '-33.86778',
          longitude: '151.20844'
        },
        {
          ID: 65,
          name: 'Lane Cove',
          latitude: '-33.82321',
          longitude: '151.17028'
        }
      ]
    },
    role: 'Customer'
  };

  const communities = [];

  setGlobal({ user, isAuthenticated, communities });
}
