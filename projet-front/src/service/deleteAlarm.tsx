const UseDeleteAlarmService = (id: number) => {

    return new Promise((resolve, reject) => {
    const urlPost = process.env.REACT_APP_URL_BACK+"delete_alarm?alarm_id="+id.toString();

      fetch(urlPost, {
        method: 'DELETE',
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