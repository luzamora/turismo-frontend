// Carga los productos automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const zonaId = params.get('zonaId');
  const zonaName = params.get('zonaName'); // Nombre de la zona desde el parámetro de URL

  if (zonaId) {
    try {
      // Actualiza el título del h1 dinámicamente
      const zonaTitle = document.getElementById("zona-title");
      if (zonaName && zonaTitle) {
        zonaTitle.textContent = zonaName.toUpperCase();
      }

      // Obtiene los establecimientos para la zona seleccionada
      const establecimientos = await getEstablecimientos(zonaId);
      printEstablecimientos(establecimientos);
    } catch (error) {
      console.error("Error al cargar los establecimientos:", error);
    }
  } else {
    console.error("No se recibió zonaId en la URL");
  }
});

// Llama al endpoint para obtener los establecimientos por zona
const getEstablecimientos = async (zonaId) => {
  try {
    const response = await fetch(`http://localhost:3000/zonas/${zonaId}/establecimientos`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Ocurrió un error: ', error.message);
    throw new Error('Error al cargar los establecimientos');
  }
  throw new Error('Error en la solicitud');
};

// Renderiza los establecimientos en el contenedor
const printEstablecimientos = (establecimientos) => {
  const container = document.querySelector(".left-column");
  container.innerHTML = ""; // Limpiamos antes de agregar nuevos

  establecimientos.forEach((establecimiento) => {
    const card = document.createElement("div");
    card.classList.add("elementos-targeta1");

    card.innerHTML = `
<img src="${establecimiento.imagen}" alt="Imagen de ${establecimiento.name}" class="imagen-target" /> 
      <div class="contenedor-cajitas">
        <div>
          <a href="paginadetalle.html?id=${establecimiento.id}" style="color: #FEF7E7">
            <h3>${establecimiento.name}</h3>
          </a>
        </div>
        <div class="cajita">${establecimiento.direccion || 'Sin descripción'}</div>
        <div class="cajita">Precio: ${establecimiento.precio || 'N/A'}</div>
        <div class="cajita">Tipo: ${establecimiento.dieta || 'N/A'}</div>
      </div>
    `;
    container.appendChild(card);
  });
};

