import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class AuthApi {
  static signUp(data) {
    const request = new Request(`${apiUrl}/api/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

}