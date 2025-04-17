import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

export const backend = defineBackend({
  auth,
  data,
});

// const HUB_ENVIRONMENT = process.env.HUB_ENVIRONMENT || process.env.USER;

// const cfnDomain = backend.auth.resources.userPool

// cfnDomain.addDomain('cpos-hub-cognito-domain', {
//   cognitoDomain: {
//     domainPrefix: ['cpos', 'hub', HUB_ENVIRONMENT].join('-')
//   }
// })