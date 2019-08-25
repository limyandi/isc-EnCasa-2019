import { setGlobal } from 'reactn';

// export default function configureStore()

export default function configureStore() {
  const user = {
    username: 'limyandi@gmail.com',
    email: 'limyandi@gmail.com',
    roles: ['Customer', 'Driver']
  };

  const delivery = {
    toAddress: '383 Kent St',
    fromAddress: '34 George St'
  };

  setGlobal({ user, delivery });
}
