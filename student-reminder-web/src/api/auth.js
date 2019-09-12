import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class AuthApi {
  static signUp(data, token) {
    const request = new Request(`${apiUrl}/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static signIn(data) {
    const request = new Request(`${apiUrl}/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static getTeachers(token) {
    const request = new Request(`${apiUrl}/teachers`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static getCurators(token, type, group) {
    const request = new Request(`${apiUrl}/curators?type=${type}&group=${group}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static updateSetting(token, data) {
    const request = new Request(`${apiUrl}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }
}