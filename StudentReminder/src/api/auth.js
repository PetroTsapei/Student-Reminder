import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class AuthApi {
  static signUp(data) {
    const request = fetch(`${apiUrl}/api/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static signIn(data) {
    return fetchRequest(`${apiUrl}/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
  }

  static pushToken({ pushToken, token }) {
    return fetchRequest(`${apiUrl}/push-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({pushToken})
    });
  }

}