import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class AuthApi {
  static signIn(data) {
    return fetchRequest(`${apiUrl}/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }

  static pushToken({ pushToken, token }) {
    return fetchRequest(`${apiUrl}/push-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({pushToken})
    })
  }

  static deletePushToken(token) {
    return fetchRequest(`${apiUrl}/push-token`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  static validateDeepLink(userId) {
    return fetchRequest(`${apiUrl}/deep-link-validate/${userId}`, {
      method: "GET"
    })
  }

  static finishRegistration(id, data) {
    return fetchRequest(`${apiUrl}/finish-registration/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }

  static getSetting(token) {
    return fetchRequest(`${apiUrl}/settings`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  static getUserInfo(token) {
    return fetchRequest(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  static updateUserInfo(id, data, token) {
    return fetchRequest(`${apiUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }

}
