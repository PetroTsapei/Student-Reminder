import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class GroupsApi {
  static getAll(token) {
    const request = new Request(`${apiUrl}/groups`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    })

    return fetchRequest(request);
  }

  static create({ token, ...rest }) {
    const request = new Request(`${apiUrl}/groups`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest)
    })

    return fetchRequest(request);
  }
}