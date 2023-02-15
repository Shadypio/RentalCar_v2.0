export default {

  oidc: {
    clientId: '0oa8cb2gzwPPXgDWJ5d7',
    issuer: 'https://dev-76613192.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
    /** profile is user's profile: first name, last name, phone etc */
  }
}
