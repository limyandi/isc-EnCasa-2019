import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  // mock user data.
  // TODO: Delete later
  const isAuthenticated = true;
  const user = {
    ID: 11,
    email: 'V812',
    name: 'Tweed,Zelda D.',
    phoneNumber: 'G8209',
    appNotification: false,
    emailNotification: false,
    smsNotification: true,
    deliveries: [
      {
        ID: 3,
        date: '1944-11-02',
        time: '14:38:18Z',
        timeTo: '22:29:15Z',
        status: false,
        pickupAddress: 'M9363',
        deliveryAddress: 'I7346'
      }
    ],
    pickups: [
      {
        ID: 6,
        date: '2007-07-07',
        time: '10:06:48Z',
        timeTo: '17:33:26Z',
        status: false,
        pickupAddress: 'S511'
      }
    ],
    communities: [
      {
        ID: 3,
        name: 'West,Filomena D.',
        dispatchCentres: ['20', '7', '9', '3', '5', '11', '14', '20', '17']
      },
      {
        ID: 12,
        name: 'Gomez,Maria A.'
      }
    ],
    driverDetails: {
      availabilities: {
        Monday: {
          from: '08:48:28Z',
          to: '20:44:00Z'
        },
        Tuesday: {
          from: '10:28:59Z',
          to: '16:28:29Z'
        },
        Wednesday: {
          from: '07:01:27Z',
          to: '22:44:37Z'
        },
        Thursday: {
          from: '06:35:47Z',
          to: '20:20:48Z'
        },
        Friday: {
          from: '06:40:39Z',
          to: '13:38:01Z'
        },
        Saturday: {
          from: '11:43:16Z',
          to: '16:31:58Z'
        },
        Sunday: {
          from: '06:19:43Z',
          to: '18:21:39Z'
        }
      },
      appNotification: true,
      emailNotification: true,
      smsNotification: false,
      communities: [
        {
          ID: 16,
          name: 'Smyth,Quigley Y.',
          dispatchCentres: ['1', '2', '12', '7', '19', '20']
        },
        {
          ID: 10,
          name: 'Ragon,Chris U.'
        },
        {
          ID: 17,
          name: 'Quigley,Quigley K.'
        },
        {
          ID: 16,
          name: 'Smyth,Quigley Y.',
          dispatchCentres: ['1', '2', '12', '7', '19', '20']
        },
        {
          ID: 19,
          name: 'Tesla,Nellie W.',
          dispatchCentres: ['4', '13', '4', '15', '3', '18', '16', '10', '8']
        },
        {
          ID: 7,
          name: 'Ironhorse,Alfred I.',
          dispatchCentres: ['15']
        },
        {
          ID: 6,
          name: 'Wells,Alice C.',
          dispatchCentres: ['16', '5', '10', '7', '14', '12', '5', '7']
        },
        {
          ID: 17,
          name: 'Quigley,Quigley K.'
        },
        {
          ID: 17,
          name: 'Quigley,Quigley K.'
        }
      ]
    },
    role: 'Customer'
  };

  const communities = [];

  setGlobal({ user, isAuthenticated, communities });
}
