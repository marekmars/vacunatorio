const express = require("express");
const router = express.Router();
const app = express();
const { isAuth, login, logout, register, logger } = require("./middlewares/auth");
const {
  compraVacuna,
  mostrarCompraVacuna,
  crearVacuna,
  crearVacunaPost,
} = require("./controllers/ControladoraVacuna");
const {
  mostrarCompraLotes,
  filtrarCompras,
} = require("./controllers/controladoraCompraLotes");
const {
  modificarEstado,
  envioVacunas,
  envioVacunasPost,
  envioVacunasCentro,
  envioVacunasPostCentro,
  chequeoVencimiento,
  mostrarLotesProvedor,
  editarLote,
  editarLotePost,
 
} = require("./controllers/controladoraLoteprovedor");
const {
  muestraStockProv,
  muestraStockProvRecep,
  editarLoteProv,
  editarLoteProvPost,
} = require("./controllers/controladoraDepoProvStock");
const {
  centrosStock,
  centrosStockPost,
  centrosStockReasignar,
  centrosStockReasignarPost,
  centrosAplicar,
  editarLoteCentro,
  editarLoteCentroPost,
} = require("./controllers/controladoraCentrosStock");
const {
  aplicacionVacuna,
  aplicacionVacunaPost,
  mostrarAplicaciones,
  filtrarAplicadas,
  borrarAplicacion,
} = require("./controllers/controladoraVacunasAplicadas");
const {
  descarteVacunas,
  descarteVacunasPost,
  descarteVacunasVencidas,
  vacunasDescartadas,
  filtrarVencidas,
  borrarDescarte,
} = require("./controllers/controladoraVacunasDescarte");
const {
  agregarCentro,
  agregarCentroPost,
} = require("./controllers/controladoraCentrosVacunacion");
const {
  agregarDepoNac,
  agregarDepoNacPost,
} = require("./controllers/controladoraDepoNac");
const {
  agregarDepoProv,
  agregarDepoProvPost,
} = require("./controllers/controladoraDepoProv");

let userName = "Anonimo";
let loginlogoutName = "Login";
let loginlogoutLink = "/login";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/", logger, async (req, res) => {
  if (req.session.user) {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";
  } else {
    // console.log("dsadsaddsdas");
    userName = "Anonimo";
    loginlogoutName = "Login";
    loginlogoutLink = "/login";
  }
  res.render("index", { loginlogoutLink, loginlogoutName, userName });
});
router.get("/login", async (req, res) => {
  userName = "";
  res.render("login", { alert: false, userName });
});
router.get("/register", async (req, res) => {
  res.render("register", { userName, loginlogoutLink, loginlogoutName });
});
router.post("/register", logger, register);
router.post("/login", login);
router.get("/logout", logout);
router.get(
  "/compra",
  isAuth,
  mostrarCompraVacuna,
  chequeoVencimiento,
  chequeoVencimiento
);
router.post("/compra", isAuth, compraVacuna);
router.get("/modCompra", isAuth, chequeoVencimiento, mostrarCompraLotes);
router.get("/filtrarCompras", isAuth, chequeoVencimiento, filtrarCompras);
router.get("/depositoProvinciaStock", isAuth, chequeoVencimiento, muestraStockProv);
router.post("/marcarRecepcion/:id", isAuth, muestraStockProvRecep);
router.post("/loteEstado/:id", isAuth, modificarEstado);
router.get("/envioVacunas", isAuth, chequeoVencimiento, envioVacunas);
router.post("/envioVacunas", isAuth, envioVacunasPost);
router.get("/centrosStock", isAuth, chequeoVencimiento, centrosStock);
router.get("/filtrarLotes", isAuth, chequeoVencimiento, centrosAplicar);
router.post("/centrosStockPost/:id", isAuth, centrosStockPost);
router.get("/aplicacionVacuna", isAuth, chequeoVencimiento, aplicacionVacuna);
router.post("/aplicacionVacunaPost", isAuth, aplicacionVacunaPost);
router.get("/vacunasAplicadas", isAuth, chequeoVencimiento, mostrarAplicaciones);
router.get("/vacunasDescarte", isAuth, chequeoVencimiento, descarteVacunas);
router.get("/vacunasDescartadas", isAuth, chequeoVencimiento, vacunasDescartadas);
router.post("/vacunasDescarte", isAuth, descarteVacunasPost);
router.post("/descartarVencidas", isAuth, descarteVacunasVencidas);
router.get("/envioVacunasCentros", isAuth, chequeoVencimiento, envioVacunasCentro);
router.get("/lotesProvedor", isAuth, chequeoVencimiento, mostrarLotesProvedor);
router.get("/filtrarAplicadas", isAuth, chequeoVencimiento, filtrarAplicadas);
router.get("/filtrarVencidas", isAuth, chequeoVencimiento, filtrarVencidas);
router.get("/agregarCentro", isAuth, agregarCentro);
router.post("/agregarCentro", isAuth, agregarCentroPost);
router.get("/agregarDepoProvincia", isAuth, agregarDepoProv);
router.post("/agregarDepoProvincia", isAuth, agregarDepoProvPost);
router.get("/agregarDepoNacion", isAuth, agregarDepoNac);
router.get("/editarLote/:id", isAuth, editarLote);
router.post("/editarLote/:id", isAuth, editarLotePost);
router.get("/editarLoteProv/:id", isAuth, editarLoteProv);
router.post("/editarLoteProvPost/:id", isAuth, editarLoteProvPost);
router.get("/editarLoteCentro/:id", isAuth, editarLoteCentro);
router.post("/editarLoteCentro/:id", isAuth, editarLoteCentroPost);
router.delete("/borrarAplicacion/:id", isAuth, borrarAplicacion);
router.delete("/borrarDescarte/:id", isAuth, borrarDescarte);
router.get("/crearVacuna", isAuth, crearVacuna);
router.post("/crearVacuna", isAuth, crearVacunaPost);
router.post("/agregarDepoNacion", isAuth, agregarDepoNacPost);
router.get("/reasignarLotes", isAuth, chequeoVencimiento, centrosStockReasignar);
router.post("/reasignarLotes", isAuth, centrosStockReasignarPost);
router.post("/envioVacunasCentros", isAuth, envioVacunasPostCentro);
router.use((req, res, next) => {
  res.status(404).render("404");
});

module.exports = router;
