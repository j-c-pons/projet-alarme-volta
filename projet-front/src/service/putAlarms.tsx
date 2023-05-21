const UsePutAlarmService = (id: number, active:boolean) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("alarm_id", id.toString());
    urlencoded.append("active", active.toString());

    return new Promise((resolve, reject) => {
    const urlPost = "http://127.0.0.1:8000/update_alarm";

      fetch(urlPost, {
        method: 'PUT',
        body: urlencoded,
        headers
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

export default UsePutAlarmService;