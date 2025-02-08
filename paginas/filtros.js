// carga los productos automáticamente al cargar la página

document.addEventListener('DOMContentLoaded', async () => {
  const establecimientos = await getEstablecimientos();
  if(establecimientos) {
    printEstablecimientos(establecimientos);
  }
});



// para llamar al 1 endpoint
const getEstablecimientos = async () => {
  try {
    const response = await fetch('http://localhost:3000/zonas/${id}/establecimientos');
    if(response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('ocurrió un error: ', error.message);
    throw new Error ('Error al cargar los establecimientos');
  }
  throw new Error('Error en la solicitud');
};


//HTML

const printEstablecimientos = (establecimientos) => {
  const container = document.querySelector(".left-column");
  container.innerHTML = ""; // Limpiamos antes de agregar nuevos

  establecimientos.forEach((establecimiento) => {
      const card = document.createElement("div");
      card.classList.add("elementos-targeta1");

      card.innerHTML =
          <img src="${establecimiento.imagen || '../images/default.jpg'}" alt="Imagen de ${establecimiento.nombre}" class="imagen-target" />
          <div class="contenedor-cajitas">
              <div>
                  <a href="paginadetalle.html?id=${establecimiento.id}" style="color: #FEF7E7">
                      <h3>${establecimiento.nombre}</h3>
                  </a>
              </div>
              <div class="cajita">${establecimiento.descripcion || 'Sin descripción'}</div>
              <div class="cajita">Precio: ${establecimiento.precio || 'N/A'}</div>
              <div class="cajita">Tipo: ${establecimiento.tipo || 'N/A'}</div>
          </div>
      ;
      container.appendChild(card);
  });
};
