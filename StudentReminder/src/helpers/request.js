export default function fetchRequest(url, options) {
  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch(url, options);

      if (!response.ok) return response.json().finally(resp => {
        reject({
          ...resp,
          ...(response.status === 401 ? { status: 401 } : {})
        })
      });

      return resolve(response.json().finally(resp => resp));

    } catch(error) {
      reject(error);
    }

  });
}
