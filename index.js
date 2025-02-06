const getZonas = () => {
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


//   const getEstablecimientos = (id) => {
//   return fetch(`http://localhost:3000/zonas/${id}/establecimientos`)
//       .then((response) => {
//           if (!response.ok) {
//               throw new Error('Error en la solicitud: ' + response.status);
//           }
//           return response.json();
//       })
//       .catch((error) => {
//           console.error('Ocurrió un error:', error.message);
//           throw new Error('Error al cargar las página');
//       });
//   };

  const getEstablecimientos = (id, precioId = '', dietaId = '', alergenosId = '') => {
    // Construir la URL directamente en el fetch
    return fetch(`http://localhost:3000/zonas/${id}/establecimientos` + 
      (precioId || dietaId || alergenosId ? 
        `?${[precioId && `precioId=${precioId}`, dietaId && `dietaId=${dietaId}`, alergenosId && `alergenosId=${alergenosId}`]
          .filter(Boolean).join('&')}` : ''))
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        return response.json();
    })
    .catch((error) => {
        console.error('Ocurrió un error:', error.message);
        throw new Error('Error al cargar los establecimientos');
    });
  };