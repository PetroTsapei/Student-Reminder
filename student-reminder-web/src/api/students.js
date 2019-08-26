import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class StudentApi {
  static getByGroupId({ token, groupId }) {
    const request = new Request(`${apiUrl}/students/${groupId}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static delete(token, id) {
    const request = new Request(`${apiUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static update(token, id, data) {
    const request = new Request(`${apiUrl}/users/${id}`, {
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