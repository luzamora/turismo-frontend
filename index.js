const zonaHTML = document.getElementById('zonas');
const zona = zonaHTML.textContent;

const movie = {
    name: name,
    year: year
};


const getZonas = (zonaId) => {
  return fetch('http://localhost:3000/zonas')
      .then((response) => {
          if (!response.ok) {
              throw new Error('Error en la solicitud: ' + response.status);
          }
          return response.json();
      })
      .catch((error) => {
          console.error('Ocurrió un error:', error.message);
          throw new Error('Error al cargar las página');
      });
  };

  

  const getEstablecimientos = (id) => {
  return fetch(`http://localhost:3000/zonas/${id}/establecimientos`)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Error en la solicitud: ' + response.status);
          }
          return response.json();
      })
      .catch((error) => {
          console.error('Ocurrió un error:', error.message);
          throw new Error('Error al cargar las página');
      });
  };
