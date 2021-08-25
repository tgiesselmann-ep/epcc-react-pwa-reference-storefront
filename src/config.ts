const splitCompareKeys = (keyStr: string) =>
  keyStr
    .split(';')
    .filter(Boolean)
    .map(subStr => subStr.split(','));

export const config = {
  clientId: process.env.REACT_APP_CLIENT_ID || 'iDcHhzof3PqOUuF0n9QPaaSFIoIUBms7H0yPaC2bkj',
  stripeKey: process.env.REACT_APP_STRIPE_KEY || 'pk_test_51JF0h5HRPByY3apSA9TY5BGD8eT3E3LafKcTdZD22GmRto6a4qXcS4QrYqp1Lx1nY59pAurPO7vTzewekIbFMXiw006GqdU7nc',
  categoryPageSize: 52,
  maxCompareProducts: 4,
  algoliaAppId: process.env.REACT_APP_ALGOLIA_APP_ID || '6MAFUOD23U',
  algoliaApiKey: process.env.REACT_APP_ALGOLIA_API_KEY || '7d829396bbf202b30bfe7ad52120bbac',
  algoliaPlacesAppId: process.env.REACT_APP_ALGOLIA_PLACES_APP_ID || 'plEPUZAA2D2L',
  algoliaPlacesApiKey: process.env.REACT_APP_ALGOLIA_PLACES_API_KEY || '4c9f0832a65f800e31b0d50f44670b1f',
  algoliaIndexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME || 'product',
  compareKeys: process.env.REACT_APP_COMPARE_KEYS ? splitCompareKeys(process.env.REACT_APP_COMPARE_KEYS) : [],
  endpointURL: process.env.REACT_APP_ENDPOINT_URL || 'api.moltin.com',
  b2b: process.env.REACT_APP_B2B_ENABLE || false,
  supportedLocales: process.env.REACT_APP_SUPPORTED_LOCALES?.split(',').map(el => JSON.parse(el)) || [
    {
      "key": "en",
      "name": "english"
    },
    {
      "key": "fr",
      "name": "french"
    }
  ],
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || "en",
  defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY || "USD",
  coveoOrg: process.env.REACT_APP_COVEO_ORG || '',
  coveoApiKey: process.env.REACT_APP_COVEO_API_KEY || '',
  coveoSourceName: process.env.REACT_APP_COVEO_SOURCE_NAME || '',
  searchProvider: process.env.REACT_APP_SEARCH_PROVIDER|| 'algolia'
};
