export default () => ({
  UserAuth: {
    apikey(obj) {
      return obj;
    }
  },
  ApikeyAuth: {
    apikey(obj) {
      return obj.apikey;
    }
  }
});
