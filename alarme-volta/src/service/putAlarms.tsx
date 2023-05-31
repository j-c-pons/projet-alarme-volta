const UsePutAlarmService = (_id: number, _active?:boolean, _jours?:string[]) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    
    let json= JSON.stringify({ alarm_id: _id, jours:_jours,  active:_active})

    return new Promise((resolve, reject) => {
    const urlPost = "http://127.0.0.1:8000/update_alarm";

      fetch(urlPost, {
        method: 'PUT',
        body: json,
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