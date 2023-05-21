const UseDeleteAlarmService = (id: number) => {

    // const headers = new Headers();
    // headers.append("Content-Type", "application/x-www-form-urlencoded");
    return new Promise((resolve, reject) => {
    const urlPost = "http://127.0.0.1:8000/delete_alarm?alarm_id="+id.toString();

      fetch(urlPost, {
        method: 'DELETE',
        // body: urlencoded,
        // headers
      })
        .then(response => response.json())
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

export default UseDeleteAlarmService;