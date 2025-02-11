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
  const container = document.querySelector(".columna-izquierda");
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

async function cargarFiltros() {
  try {
      // Cargar precios
      const preciosResponse = await fetch('http://localhost:3000/filtros/precios');
      const precios = await preciosResponse.json();
      const precioSelect = document.getElementById('precioSelect');
      precios.forEach(precio => {
          const option = document.createElement('option');
          option.value = precio;
          option.textContent = precio;
          precioSelect.appendChild(option);
      });

      // Cargar dietas
      const dietasResponse = await fetch('http://localhost:3000/filtros/dietas');
      const dietas = await dietasResponse.json();
      const dietaSelect = document.getElementById('dietaSelect');
      dietas.forEach(dieta => {
          const option = document.createElement('option');
          option.value = dieta;
          option.textContent = dieta;
          dietaSelect.appendChild(option);
      });

      // Cargar alérgenos
      const alergenosResponse = await fetch('http://localhost:3000/filtros/alergenos');
      const alergenos = await alergenosResponse.json();
      const alergenoSelect = document.getElementById('alergenoSelect');
      alergenos.forEach(alergeno => {
          const option = document.createElement('option');
          option.value = alergeno;
          option.textContent = alergeno;
          alergenoSelect.appendChild(option);
      });

  } catch (error) {
      console.error('Error al cargar los filtros:', error);
  }
}

cargarFiltros()

// Añade el evento al botón de filtrar
document.getElementById("filterButton").addEventListener("click", async () => {
  const precio = document.getElementById("precioSelect").value;
  const dieta = document.getElementById("dietaSelect").value;
  const alergeno = document.getElementById("alergenoSelect").value;

  // Obtén el zonaId de la URL
  const params = new URLSearchParams(window.location.search);
  const zonaId = params.get("zonaId");

  if (!zonaId) {
    console.error("No se encontró zonaId en la URL");
    return;
  }

  // Construir los parámetros de consulta para la solicitud al backend
  const queryParams = new URLSearchParams();
  if (precio) queryParams.append("precioId", precio);
  if (dieta) queryParams.append("dietaId", dieta);
  if (alergeno) queryParams.append("alergenosId", alergeno);

  try {
    // Llama al endpoint con los parámetros del filtro
    const response = await fetch(`http://localhost:3000/zonas/${zonaId}/establecimientos?${queryParams.toString()}`);
    if (response.ok) {
      const filteredEstablecimientos = await response.json();
      printEstablecimientos(filteredEstablecimientos); // Renderiza los resultados
    } else {
      console.error("Error al filtrar los establecimientos:", response.statusText);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de filtrado:", error);
  }
});
