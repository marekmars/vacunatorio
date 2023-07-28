const tipoVacuna = tipoVacunaSelect.value;
const laboratorios = [];
resultado.forEach((vacuna) => {
  conosle.log(vacuna);
});
console.log(laboratorios);
laboratorioSelect.innerHTML = "";
laboratorios.forEach((lab) => {
  const option = document.createElement("option");
  option.value = lab.idLaboratorio;
  option.textContent = lab.nombre;
  laboratorioSelect.appendChild(option);
});

resultados.forEach()
for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        
    }
}
laboratorioSelect.disabled = false;
