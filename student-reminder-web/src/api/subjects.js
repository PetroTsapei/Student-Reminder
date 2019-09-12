import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class SubjectApi {
  static getSubjects(token, page) {
    const request = new Request(`${apiUrl}/subjects?page=${page}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static createSubject(token, data) {
    const request = new Request(`${apiUrl}/subjects`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static updateSubject(token, { id, name }) {
    const request = new Request(`${apiUrl}/subjects/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    });

    return fetchRequest(request);
  }

  static deleteSubject(token, id) {
    const request = new Request(`${apiUrl}/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return fetchRequest(request);
  }
}