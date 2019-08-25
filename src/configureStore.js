import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  const user = {
    id: 1,
    username: 'limyandi@gmail.com',
    email: 'limyandi@gmail.com',
    roles: ['Customer', 'Driver'],
    // Initial role is always customer
    role: 'Customer'
  };

  const deliveries = [];

  setGlobal({ user, deliveries });
}
