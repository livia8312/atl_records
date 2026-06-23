const modalEventos = document.getElementById("modalEvento");
const btnExplorar = document.getElementById("explorarEventos");
const fecharEventos = document.getElementById("fecharEventos");

btnExplorar.addEventListener("click", (e) => {
    e.preventDefault();
    modalEventos.classList.add("ativo");
});

fecharEventos.addEventListener("click", () => {
    modalEventos.classList.remove("ativo");
});