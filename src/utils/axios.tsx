import axios, { AxiosRequestConfig } from "axios";

interface ObjectType {
  [key: string]: any;
}

export async function apiPost(url: string, data: ObjectType) {
  const config = {
    method: "POST",
    url: url,
    data: data,
    header: {
      "Content-Type": "application/json",
    },
  };

  const request = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      try {
        return e.response.data;
      } catch {
        return "Something went wrong : 500";
      }
    });

  return request;
}

export async function apiGet(
  url: string,
  data: ObjectType,
  username: string = "",
  password: string = ""
) {
  let request = null;
  try {
    const headers = {};
    const config: AxiosRequestConfig<any> = {
      method: "GET",
      url,
      headers,
      params: data,
    };
    if (username && password) {
      config.auth = { username, password };
    }
    request = await axios(config)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        try {
          return e.response.data;
        } catch {
          return {
            status: false,
            data: "Something went wrong : 500",
          };
        }
      });
    return request;
  } catch (e) {
    return { status: false, data: e };
  }
}

export async function apiPut(url: string, data: ObjectType) {
  let request = null;
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const config: AxiosRequestConfig<any> = {
      headers,
    };

    request = await axios
      .put(url, data, config)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        try {
          return e.response.data;
        } catch {
          return {
            status: false,
            data: "Something went wrong : 500",
          };
        }
      });
    return request;
  } catch (e) {
    return { status: false, data: e };
  }
}

export async function apiDelete(url: string) {
  let request = null;
  try {
    request = await axios
      .delete(url)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        try {
          return e.response.data;
        } catch {
          return {
            status: false,
            data: "Something went wrong : 500",
          };
        }
      });
    return request;
  } catch (e) {
    return { status: false, data: e };
  }
}
