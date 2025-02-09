//cargar las zonas al cargar la página

document.addEventListener('DOMContentLoaded', async () => {
  const zonas = await getZonas();
  if (zonas) {
      printZonas(zonas);
  }
});

//funcion que llama al endpoint

const getZonas = async () => {
  try {
      const response = await fetch('http://localhost:3000/zonas');
      if (response.ok) {
          return await response.json();
      }
  } catch (error) {
      console.error('Ocurrió un error:', error.message);
      throw new Error('Error al cargar las zonas');
  }
  throw new Error('Error en la solicitud');
};

//HTML
const printZonas = (zonas) => {
  const list = document.getElementById('zona'); // Obtener el select

  if (!list) {
    console.error("No se encontró el elemento con ID 'zona'");
    return;
  }

  // Limpiar las opciones previas, excepto la primera (Elige la zona...)
  list.innerHTML = '<option selected disabled>Elige la zona de Alicante</option>';

  // Recorrer el array de zonas y agregarlas como opciones al select
  zonas.forEach(zona => {
    let option = document.createElement('option'); // Crear opción
    option.value = zona.id; // Puedes usar un ID si lo tienes en la BD
    option.textContent = zona.nombre; // Nombre visible de la zona
    list.appendChild(option); // Agregar al select
  });

  // Agregar el event listener después de que el select esté lleno
  list.addEventListener("change", function () {
    const selectedId = list.value; // Obtener el ID de la zona seleccionada
    if (selectedId) {
      window.location.href = `paginas/filtros.html?zonaId=${selectedId}`; // Redirigir correctamente
    }
  });
};

