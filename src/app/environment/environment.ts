export const environment = {
  production: false,
  msalConfig: {
      auth: {
          clientId: 'ba5db62a-4802-4ba6-94fb-726fd8354973',
          // authority: 'https://login.microsoftonline.com/ba5db62a-4802-4ba6-94fb-726fd8354973'
          authority: 'https://login.microsoftonline.com/0ae51e19-07c8-4e4b-bb6d-648ee58410f4'
      }
  },
  apiConfig: {
      scopes: ['openid','email','profile'],
      uri: 'api://ba5db62a-4802-4ba6-94fb-726fd8354973/.default'
  },

  apiConfig1: {
    scopes: ["data.read"],
    uri: 'api://eb282c35-312e-4e60-abb6-a35acdaf23df'
}
};
