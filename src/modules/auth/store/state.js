import { v4 as uuidv4 } from 'uuid';

export default () => ({
   status: 'authenticating',
   user: null,
   idToken: null,
   refreshToken: null
})