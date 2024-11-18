import UcodeSdk from "./UcodeSdk.js";

const loginData = {
  username: "",
  password: "",
  project_id: "f05fdd8d-f949-4999-9593-5686ac272993",
  client_type: "10debeef-b5b9-415d-bfe8-dbd8646e2fd4",
};

const config = {
  appId: "P-kL7M9h0NarpDfsSTzBPhDGOE4H9rUPl5",
  baseURL: "https://admin-api.ucode.run",
  env_id: "ad41c493-8697-4f23-979a-341722465748",
  resource_id: "05df5e41-1066-474e-8435-3781e0841603",
  project_id: "462baeca-37b0-4355-addc-b8ae5d26995d",
};

const sdk = new UcodeSdk(config);
