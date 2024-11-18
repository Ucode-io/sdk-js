export default class Items {
  constructor(config) {
    this.config = config;
  }

  create(tableSlug, data, headers = {}) {
    const url = `${this?.config?.baseURL}/v2/items/${tableSlug}`;
    return this.request(url, "POST", data, headers);
  }

  update(tableSlug, data, headers = {}) {
    const url = `${this?.config?.baseURL}/v2/items/${tableSlug}`;
    return this.request(url, "PUT", data, headers);
  }

  delete(tableSlug, data, id = "", headers = {}) {
    let url;
    if (data?.ids) {
      url = `${this?.config?.baseURL}/v2/items/${tableSlug}/?project_id=${this?.config?.project_id}`;
    } else {
      url = `${this?.config?.baseURL}/v2/items/${tableSlug}/${id}`;
    }
    return this.request(url, "DELETE", data, headers);
  }

  getList(tableSlug, data, headers = {}) {
    const baseUrl = `${this.config.baseURL}/v2/object-slim/get-list/${tableSlug}`;

    const jsonData = JSON.stringify(data?.data);
    const encodedData = encodeURIComponent(jsonData);

    const url = `${baseUrl}?data=${encodedData}&offset=${data.data.offset}&limit=${data.data.limit}`;

    return this.request(url, "GET", null, headers);
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
