import Auth from "./Auth.js";
import Files from "./Files.js";
import Items from "./Items.js";

class UcodeSdk {
  constructor(config) {
    if (!config || !config.baseURL) {
      throw new Error(
        "UcodeSdk Error: 'baseURL' is required in the configuration."
      );
    }
    this.config = config;
  }

  Auth() {
    return new Auth(this.config);
  }

  Items() {
    return new Items(this.config);
  }

  Files() {
    return new Files(this.config);
  }
}

export default UcodeSdk;
