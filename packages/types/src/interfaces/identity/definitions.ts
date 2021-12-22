
export default {
  types: {
    "IdentityInfo": {
      "additional": "Vec<(Data, Data)>",
      "legal": "Data",
      "web": "Data",
      "discord": "Data",
      "email": "Data",
      "pgp_fingerprint": "Option<[u8; 20]>",
      "image": "Data",
      "twitter": "Data"
    },
  },
};
