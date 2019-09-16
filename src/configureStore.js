import { setGlobal } from 'reactn';

// export default function configureStore()

// Mock up Initial data.
export default function configureStore() {
  // mock user data.
  // TODO: Delete later
  const isAuthenticated = false;
  const user = {};

  const communities = [];

  setGlobal({ user, isAuthenticated, communities });
}
