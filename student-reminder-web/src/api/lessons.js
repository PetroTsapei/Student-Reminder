import { apiUrl } from '../constants/apiConsts';
import fetchRequest from '../helpers/request';

export default class LessonApi {
  static getLessons(token) {
    const request = new Request(`${apiUrl}/lessons/all`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static createLesson(token, data) {
    const request = new Request(`${apiUrl}/lessons`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static getById(token, id) {
    console.log(new Date().getTimezoneOffset());
    const request = new Request(`${apiUrl}/lessons/${id}?timezone=${new Date().getTimezoneOffset()}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }

  static updateById(token, id, data) {
    const request = new Request(`${apiUrl}/lessons/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    return fetchRequest(request);
  }

  static deleteById(token, id) {
    const request = new Request(`${apiUrl}/lessons/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    return fetchRequest(request);
  }
}
