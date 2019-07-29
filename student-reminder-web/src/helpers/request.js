export default function fetchRequest(request) {
  return new Promise(async (resolve, reject) => {
    
    try {
      const response = await fetch(request);
      console.log(response);

      // if (!response.ok) return response.json().finally(resp => reject(resp));

      // if (response.status !== 401) {
      //   return resolve(response.json().finally(resp => resp));
      // }

    } catch(error) {
      reject(error);
    }

  });
}