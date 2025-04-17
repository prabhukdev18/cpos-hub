import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['openid', 'profile', 'email'],
        attributeMapping: {
          email: 'email',
          givenName: 'given_name',
          familyName: 'family_name',
        },
      },
      callbackUrls: [
        process.env.HUB_CALLBACK_URL || 'http://localhost:5173/callback'
      ],
      logoutUrls: [process.env.HUB_LOGOUT_URL || 'http://localhost:5173/'],
    },
  },
  userAttributes: {
    email: { required: true, mutable: true },
  },
});
