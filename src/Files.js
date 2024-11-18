export default class Files {
  constructor(config) {
    this.config = config;
  }

  fileUpload(data, headers = {}) {
    const url = `${this?.config?.baseURL}/v1/files/folder_upload`;
    return this.request(url, "POST", data, headers);
  }

  imageUpload(data, headers = {}) {
    const url = `${this?.config?.baseURL}/v1/files/folder_upload?folder_name=Media`;
    return this.request(url, "POST", data, headers);
  }

  videoUpload(data, headers = {}) {
    const url = `${this?.config?.baseURL}/v1/files/folder_upload?project-id=${this.config.project_id}`;
    return this.request(url, "POST", data, headers);
  }

  fileDelete(id, headers = {}) {
    const url = `${this?.config?.baseURL}/v1/files/${id}`;
    return this.request(url, "DELETE", data, headers);
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

    const fileData = new FormData();
    fileData.append("file", data);

    if (method !== "GET" && method !== "HEAD") {
      options.body = fileData;
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
