export default class Functions {
  constructor(config) {
    this.config = config;
  }

  InvokeFunction(data, params = null, headers = {}) {
    const url = `${this?.config?.baseURL}/v1/invoke_function`;

    if (params && typeof params === "object") {
      const queryParams = new URLSearchParams(params).toString();
      return this.request(`${url}?${queryParams}`, "POST", data, headers);
    }

    if (params && typeof params === "string") {
      return this.request(url, "POST", {...data, params}, headers);
    }

    return this.request(url, "POST", data, headers);
  }

  async request(url, method, data, headers = {}) {
    const defaultHeaders = {
      authorization: "API-KEY",
      "X-API-KEY": this.config.appId ?? undefined,
      "Resource-Id": this.config.resource_id ?? undefined,
      "Environment-Id": this.config?.env_id ?? undefined,
    };

    const options = {
      method,
      headers: {...defaultHeaders, ...headers},
    };

    if (method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: "error",
        data: {
          description: errorData,
          message: `Error ${method} ${url}`,
          error: response.statusText,
        },
      };
    }

    return {
      status: "done",
      data: await response.json(),
    };
  }
}
