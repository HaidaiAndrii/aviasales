export function getId() {
    return fetch("https://front-test.beta.aviasales.ru/search")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, 'data0')
        return data;
      });
  }


  
  export function getTickets(id) {
    return fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data, 'data')
        return data;
      });
  }
