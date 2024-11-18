export default class Auth {
  constructor(config) {
    this.config = config;
  }

  login(data, headers = {}) {
    const url = `${this?.config?.authBaseUrl}/v2/login?project-id=${this.config.project_id}`;
    if (!data.project_id) data.project_id = this.config.project_id;
    return this.request(url, "POST", data, headers);
  }

  multiCompany(data, headers = {}) {
    const url = `${this?.config?.authBaseUrl}/v2/multi-company/one-login?project-id=${this.config.project_id}`;
    if (!data.project_id) data.project_id = this.config.project_id;
    return this.request(url, "POST", data, headers);
  }

  forgotPassword(data, headers = {}) {
    const url = `${this?.config?.authBaseUrl}/v2/forgot-password?project-id=${this.config.project_id}`;
    return this.request(url, "POST", data, headers);
  }

  loginWithOption(data, headers = {}) {
    const url = `${this?.config?.authBaseUrl}/v2/login/with-option?project-id=${this.config.project_id}`;
    return this.request(url, "POST", data, headers);
  }

  register(data, headers = {}) {
    const url = `${this.config.authBaseUrl}/v2/register?project-id=${this.config.projectId}`;
    return this.request(url, "POST", data, headers);
  }

  resetPassword(data, headers = {}) {
    const url = `${this.config.authBaseUrl}/v2/reset-password`;
    const defaultHeaders = {
      authorization: "API-KEY",
      "X-API-KEY": this.config.appId,
    };
    return this.request(url, "PUT", data, {
      ...defaultHeaders,
      ...headers,
    });
  }

  sendCode(data, headers = {}) {
    const url = `${this.config.authBaseUrl}/v2/send-code`;
    return this.request(url, "POST", data, headers);
  }

  async request(url, method, data, headers = {}) {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config?.token || ""}`,
    };

    const response = await fetch(url, {
      method,
      headers: {...defaultHeaders, ...headers},
      body: JSON.stringify(data),
    });

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
