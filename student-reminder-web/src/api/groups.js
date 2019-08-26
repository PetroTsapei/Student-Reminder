import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class GroupsApi {
  static getAll(token) {
    const request = new Request(`${apiUrl}/groups`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

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
    });

    return fetchRequest(request);
  }

  static delete(token, id) {
    const request = new Request(`${apiUrl}/groups/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return fetchRequest(request);
  }

  static getById({ token, id }) {
    const request = new Request(`${apiUrl}/groups/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return fetchRequest(request);
  }

  static updateById(token, groupId, data) {
    const request = new Request(`${apiUrl}/groups/${groupId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }
}