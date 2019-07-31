export default request => {
  const errorStatuses = [400, 401, 403, 404, 413, 429, 500];

  return fetch(request).then(response => {
    if(response.status === 204) return {}

    return response.json().then(resp => {
      if (errorStatuses.includes(response.status)) {
        const message = resp.error || (resp.nonFieldErrors && resp.nonFieldErrors[0]);
        const errorObj = {
          status: response.status,
          ...(message ? {message} : {fieldsErrors: resp}),
        };

        return Promise.reject(errorObj)
      }

      return resp
    }).catch(error => {
      if(error) throw error;

      const errorObj = {
        status: response.status,
        message: response.statusText
      };

      throw errorObj;
    })

  }).catch(error => Promise.reject(error))
}