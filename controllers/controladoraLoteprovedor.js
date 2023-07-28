const { Loteprovedor } = require("../models/Loteprovedor");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepositoNacion } = require("../models/DepositoNacion");
const { DepositoProvincia } = require("../models/DepositoProv");
const { DepoProvinciaStock } = require("../models/DepoProvinciaStock");
const { CentroVacunacion } = require("../models/CentroVacunacion");
const { CentroVacunacionStock } = require("../models/CentroVacunacionStock");
const { VacunasAplicadas } = require("../models/VacunasAplicada");
const { VacunaDescarte } = require("../models/VacunasDescarte");

const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");
const { vacunasDescartadas } = require("./controladoraVacunasDescarte");

module.exports = {
  modificarEstado: async (req, res) => {
    if (req.body !== undefined) {
      try {
        const idLote = req.params.id;
        const fechaAdquisicion = req.body.fechaAdquisicion;

        const lote = await Loteprovedor.findOne({ where: { idLote: idLote } });
        if(lote.estado!=="descartado"){
          lote.estado = "enStock";
        }
        
        lote.fechaAdquisicion = fechaAdquisicion;
        await lote.save();
        res.render("modCompra", {
          alert: true,
          alertTitle: "Modificacion en el Estado",
          alertMessage: "Se realizo la recepcion correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1200,
          ruta: "modCompra",
          resultado: ["a"],
        });
      } catch (error) {
        res.render("modCompra", {
          alert: true,
          alertTitle: "No se pudo hacer la modificacion",
          alertMessage: `No se pudo realizar la modificacion Error: ${error}`,
          alertIcon: "error",
          showConfirmButton: true,
          ruta: "modCompra",
          resultado: ["a"],
        });
      }
    } else {
      res.render("modCompra", {
        alert: true,
        alertTitle: "No se pudo hacer la modificacion",
        alertMessage: "Debe completar el campo de la fecha",
        alertIcon: "error",
        showConfirmButton: true,
        ruta: "modCompra",
        resultado: ["a"],
      });
    }
  },
  envioVacunas: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
      const loteprovedor = await Loteprovedor.findAll({
        include: [
          {
            model: Vacuna,
            attributes: ["tipoVacuna", "nombreComercial", "paisOrigen"],
            include: [
              {
                model: Laboratorio,
                attributes: ["nombre"],
              },
            ],
          },
          {
            model: DepositoNacion,
            include: [
              {
                model: Localidad,
                attributes: ["provincia", "ciudad"],
              },
            ],
            as: "Deposito", // Actualiza el alias aquí
            attributes: ["direccion", "telefono"],
          },
        ],
      });
      const resultadoAux = loteprovedor.map((lote) => {
        if (lote.estado === "enStock" && lote.cantVacunas > 0) {
          return {
            idLote: lote.idLote,
            tipoVacuna: lote.Vacuna.tipoVacuna,
            nombreComercial: lote.Vacuna.nombreComercial,
            nombreLaboratorio: lote.Vacuna.Laboratorio.nombre,
            paisOrigen: lote.Vacuna.paisOrigen,
            fechaFabricacion: lote.fechaFabricacion,
            fechaVencimiento: lote.fechaVencimiento,
            deposito: `${lote.idDepoNacion}-${lote.Deposito.Localidad.provincia} - ${lote.Deposito.Localidad.ciudad}`,
            vencida: lote.vencida,
            cantVacunas: lote.cantVacunas,
          };
        } else {
          return;
        }
      });
      const resultado = resultadoAux.filter((item) => item !== undefined);

      //obtencion de depositosProvincia
      const depositosProvincia = await DepositoProvincia.findAll({
        include: [
          {
            model: Localidad,
            attributes: ["provincia", "ciudad"],
          },
        ],
      });

      const resultadoDepoProv = depositosProvincia.map((depo) => {
        return {
          idDepoProv: depo.idDepoProv,
          provincia: depo.Localidad.provincia,
          ciudad: depo.Localidad.ciudad,
          direccion: depo.direccion,
        };
      });

      // console.log(resultado);
      res.render("envioVacunas", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultado,
        resultadoDepoProv,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
  envioVacunasPost: async (req, res) => {
    const idDepoProv = req.body.deposito;
    const body = req.body;
    const alerta = {};
    const alertas = {
      envioCorrecto: {
        alert: true,
        alertTitle: "Envio Correcto",
        alertMessage: "Se realizo el envio de todas las vacunas correctamente",
        alertIcon: "success",
        showConfirmButton: false,
        timer: 1500,
        ruta: "envioVacunas",
        resultado: ["a"],
        resultadoDepoProv: ["a"],
      },
      envioIncorrecto: {
        alert: true,
        alertTitle: "Error en el envio",
        alertMessage: `Una o mas vacunas no pudieron enviarse por falta de stock o por que estan vencidas. Recuerde descartar todas las vacunas vencidas`,
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "envioVacunas",
        resultado: ["a"],
        resultadoDepoProv: ["a"],
      },
      errorDeposito: {
        alert: true,
        alertTitle: "Error en el envio",
        alertMessage: `Debe seleccionar un deposito`,
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "envioVacunas",
        resultado: ["a"],
        resultadoDepoProv: ["a"],
      },
    };
    let flag = true;

    if (idDepoProv !== "-") {
      for (const key in body) {
        if (!isNaN(Number(key))) {
          if (Number(body[key]) > 0) {
            try {
              const idLote = Number(key);
              const loteAux = await Loteprovedor.findOne({ where: { idLote: idLote } });
              if (loteAux.cantVacunas >= body[key] > 0) {
                if (loteAux.vencida !== true) {
                  loteAux.cantVacunas = loteAux.cantVacunas - Number(body[key]);
                  if (loteAux.cantVacunas === 0) {
                    loteAux.estado = "sinStock";
                  }
                  await loteAux.save();

                  const depoProvinciaStock = await DepoProvinciaStock.create({
                    idDepoProv: idDepoProv,
                    idLote: Number(key),
                    cantVacunas: body[key],
                  });
                } else {
                  flag = false;
                }
              } else {
                flag = false;
              }
            } catch (error) {
              console.error("Error al crear los elementos de depoprovinciastock:", error);
              res.sendStatus(500);
            }
          }
        }
      }
      console.log("===========");
      console.log(flag);
      console.log("===========");
      if (flag) {
        res.render("envioVacunas", alertas.envioCorrecto);
      } else {
        res.render("envioVacunas", alertas.envioIncorrecto);
      }
    } else {
      res.render("envioVacunas", alertas.errorDeposito);
    }
  },
  envioVacunasCentro: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

   

    try {
      const depoProvinciaStock = await DepoProvinciaStock.findAll({
        include: [
          {
            model: DepositoProvincia,
            attributes: ["direccion"],
            include: [
              {
                model: Localidad,
                attributes: ["idLocalidad", "provincia", "ciudad"],
              },
            ],
          },
          {
            model: Loteprovedor,
            include: [
              {
                model: Vacuna,
                include: [
                  {
                    model: Laboratorio,
                    attributes: ["nombre"],
                  },
                ],
                attributes: ["tipoVacuna", "nombreComercial"],
              },
            ],
            attributes: ["idLote", "fechaFabricacion", "fechaVencimiento", "vencida"],
          },
        ],
      });
      
      const resultadoAux = depoProvinciaStock.map((aux) => {
        if (aux.cantVacunas > 0 && aux.estado === "enStock") {
          
          return {
            idSublote: aux.id,
            idDepoProv: aux.idDepoProv,
            direccion: aux.DepositoProvincium.direccion,
            idLocalidad: aux.DepositoProvincium.Localidad.idLocalidad,
            provincia: aux.DepositoProvincium.Localidad.provincia,
            ciudad: aux.DepositoProvincium.Localidad.ciudad,
            idLote: aux.Loteprovedor.idLote,
            tipoVacuna: aux.Loteprovedor.Vacuna.tipoVacuna,
            vencida: aux.Loteprovedor.vencida,
            nombreComercial: aux.Loteprovedor.Vacuna.nombreComercial,
            nombreLaboratorio: aux.Loteprovedor.Vacuna.Laboratorio.nombre,
            fechaFabricacion: aux.Loteprovedor.fechaFabricacion,
            fechaVencimiento: aux.Loteprovedor.fechaVencimiento,
            cantVacunas: aux.cantVacunas,
          };
        }
      });
      const resultado = resultadoAux.filter((item) => item !== undefined);
      console.log("-------------");
      console.log(resultado);
      console.log("-------------");
      const centrosVacunacion = await CentroVacunacion.findAll({
        include: [
          {
            model: Localidad,
            attributes: ["provincia", "ciudad"],
          },
        ],
      });
      
      

      const resultadoCentros = centrosVacunacion.map((aux) => {
        return {
          idCentro: aux.idCentro,
          idLocalidad: aux.idLocalidad,
          provincia: aux.Localidad.provincia,
          ciudad: aux.Localidad.ciudad,
          direccion: aux.direccion,
          telefono: aux.telefono,
        };
      });

      res.render("envioVacunasCentros", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultado,

        resultadoCentros,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
  envioVacunasPostCentro: async (req, res, next) => {
    const body = req.body;
    const idDeposito = req.body.deposito;
    const idCentro = req.body.centro;

    let flag = true;
    console.log(req.body);

    if (idCentro !== "-" && idDeposito !== "-" && req.body.provincia !== "-") {
      for (const key in body) {
        const cantVacunasEnviadas = Number(body[key]);
        const idSublote = Number(key);

        if (!isNaN(idSublote)) {
          if (cantVacunasEnviadas > 0) {
            try {
              const depositoProvStock = await DepoProvinciaStock.findOne({
                where: { id: idSublote },
              });

              if (cantVacunasEnviadas <= depositoProvStock.cantVacunas) {
                console.log(`ANTES: ${depositoProvStock.cantVacunas}`);
                depositoProvStock.cantVacunas =
                  depositoProvStock.cantVacunas - cantVacunasEnviadas;
                console.log(`DESPUES: ${depositoProvStock.cantVacunas}`);

                if (depositoProvStock.cantVacunas == 0) {
                  depositoProvStock.estado = "sinStock";
                }
                await depositoProvStock.save();
                const centroVacunacionStock = await CentroVacunacionStock.create({
                  idCentro: idCentro,
                  idSublote: idSublote,
                  cantVacunas: cantVacunasEnviadas,
                  fechaRecepcion: null,
                });
              } else {
                flag = false;
                console.log("==============");
                console.log("PASO 6");
                console.log("==============");
              }
            } catch (error) {
              console.error(
                "Error al crear los elementos de centrovacunacionstock:",
                error
              );
              res.sendStatus(500);
            }
          }
        }
      }

      if (!flag) {
        res.render("envioVacunasCentros", {
          alert: true,
          alertTitle: "Error en el envio",
          alertMessage: `Una o mas vacunas no pudieron enviarse por falta de stock o por que estan vencidas. Recuerde descartar todas las vacunas vencidas`,
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "envioVacunasCentros",
          resultado: ["a"],
          resultadoDepoProv: ["a"],
        });
      } else {
        res.render("envioVacunasCentros", {
          alert: true,
          alertTitle: "Envio Correcto",
          alertMessage: "Se realizo el envio de todas las vacunas correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "envioVacunasCentros",
          resultado: ["a"],
          resultadoDepoProv: ["a"],
  
        });
      }
    } else {
      res.render("envioVacunasCentros", {
        alert: true,
        alertTitle: "Error en el envio",
        alertMessage: `Todos Los Campos debes estar completos`,
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "envioVacunasCentros",
        resultado: ["a"],
        resultadoDepoProv: ["a"],
 
      });
    }
  },
  chequeoVencimiento: async (req, res, next) => {
    try {
      const currentDate = new Date();
      console.log(`FechaActual: ${currentDate}`);

      const [numUpdated, updatedRows] = await Loteprovedor.update(
        { vencida: true },
        { where: { fechaVencimiento: { [Op.lt]: currentDate } } }
      );
      console.log(`numUpdated: ${numUpdated}`);
      console.log(`updatedRows: ${updatedRows}`);

      console.log(`${numUpdated} elementos actualizados correctamente`);
    } catch (error) {
      console.error("Error al cambiar el estado de vencida:", error);
    }
    next();
  },
  mostrarLotesProvedor: async (req, res, next) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
      const loteprovedorAux = await Loteprovedor.findAll({
        include: [
          {
            model: Vacuna,
            attributes: ["tipoVacuna", "nombreComercial", "paisOrigen"],
            include: [
              {
                model: Laboratorio,
                attributes: ["nombre"],
              },
            ],
          },
        ],
      });

      const lotesProvedor = loteprovedorAux.map((lote) => {
        return {
          idLote: lote.idLote,
          tipoVacuna: lote.Vacuna.tipoVacuna,
          nombreLaboratorio: lote.Vacuna.Laboratorio.nombre,
          nombreComercial: lote.Vacuna.nombreComercial,
          paisOrigen: lote.Vacuna.paisOrigen,
          fechaFabricacion: lote.fechaFabricacion,
          fechaVencimiento: lote.fechaVencimiento,
          estado: lote.estado,
          fechaAdquisicion: lote.fechaAdquisicion,
          cantVacunas: lote.cantVacunas,
        };
      });

      const depoProvStockAux = await DepoProvinciaStock.findAll({
        include: [
          {
            model: Loteprovedor,
            include: [
              {
                model: Vacuna,
                attributes: ["tipoVacuna", "nombreComercial", "paisOrigen"],
                include: [
                  {
                    model: Laboratorio,
                    attributes: ["nombre"],
                  },
                ],
              },
            ],
          },
        ],
      });

      const depoProvStock = depoProvStockAux.map((stock) => {
        return {
          idLoteProv: stock.id,
          idLote: stock.Loteprovedor.idLote,
          tipoVacuna: stock.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: stock.Loteprovedor.Vacuna.nombreComercial,
          nombreLaboratorio: stock.Loteprovedor.Vacuna.Laboratorio.nombre,
          vencida: stock.Loteprovedor.vencida,
          cantVacunas: stock.cantVacunas,
          estado: stock.estado,
          fechaRecepcion: stock.fechaRecepcion,
        };
      });

      const centroStockAux = await CentroVacunacionStock.findAll({
        include: [
          {
            model: DepoProvinciaStock,
            include: [
              {
                model: Loteprovedor,
                include: [
                  {
                    model: Vacuna,
                    attributes: ["tipoVacuna", "nombreComercial", "paisOrigen"],
                    include: [
                      {
                        model: Laboratorio,
                        attributes: ["nombre"],
                      },
                    ],
                  },
                ],
              },
            ],
            attributes: ["id", "idDepoProv"],
          },
        ],
      });

      const centroStock = centroStockAux.map((stock) => {
        return {
          idLoteCentro: stock.id,
          idSublote: stock.idSublote,
          idCentro: stock.idCentro,
          idLote: stock.DepoProvinciaStock.Loteprovedor.idLote,
          tipoVacuna: stock.DepoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: stock.DepoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
          nombreLaboratorio:
            stock.DepoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
          vencida: stock.DepoProvinciaStock.Loteprovedor.vencida,
          cantVacunas: stock.cantVacunas,
          estado: stock.estado,
          fechaRecepcion: stock.fechaRecepcion,
        };
      });

      const vacunasAplicadasAux = await VacunasAplicadas.findAll({
        include: [
          {
            model: CentroVacunacionStock,
            include: [
              {
                model: DepoProvinciaStock,
                include: [
                  {
                    model: Loteprovedor,
                    include: [
                      {
                        model: Vacuna,
                        include: [
                          {
                            model: Laboratorio,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      const vacunasAplicadas = {};

      vacunasAplicadasAux.forEach((item) => {
        const idLote = item.idLote;
        const cantidadElementos = vacunasAplicadas[idLote] || 0; // Si no existe, establecemos 0
        vacunasAplicadas[idLote] = cantidadElementos + 1; // Incrementamos la cantidad por "idLote"
      });
      console.log(vacunasAplicadas);

      /////////////
      const vacunasDescarte = await VacunaDescarte.findAll();
      const resultadosDescarte = [];

      for (const vacunaDescarte of vacunasDescarte) {
        let resultado;

        if (vacunaDescarte.tipoLote === "LoteNacion") {
          console.log("ENTRO LOTE COMPLETO");
          resultado = await Loteprovedor.findOne({
            where: {
              idLote: vacunaDescarte.idLote,
            },
            include: [
              {
                model: Vacuna,
                include: [
                  {
                    model: Laboratorio,
                    attributes: ["nombre", "pais"],
                  },
                ],
                attributes: ["tipoVacuna", "nombreComercial"],
              },
            ],
          });
        } else if (vacunaDescarte.tipoLote === "LoteProvincia") {
          console.log("ENTRO LOTE PROVINCIA");
          resultado = await DepoProvinciaStock.findOne({
            where: {
              id: vacunaDescarte.idLote,
            },
            include: [
              {
                model: Loteprovedor,
                include: [
                  {
                    model: Vacuna,
                    include: [
                      {
                        model: Laboratorio,
                        attributes: ["nombre", "pais"],
                      },
                    ],
                    attributes: ["tipoVacuna", "nombreComercial"],
                  },
                ],
              },
            ],
          });
        } else if (vacunaDescarte.tipoLote === "LoteCentro") {
          console.log("ENTRO LOTE CENTRO");
          resultado = await CentroVacunacionStock.findOne({
            where: {
              id: vacunaDescarte.idLote,
            },
            include: [
              {
                model: DepoProvinciaStock,
                include: [
                  {
                    model: Loteprovedor,
                    include: [
                      {
                        model: Vacuna,
                        include: [
                          {
                            model: Laboratorio,
                            attributes: ["nombre", "pais"],
                          },
                        ],
                        attributes: ["tipoVacuna", "nombreComercial"],
                      },
                    ],
                  },
                ],
              },
            ],
          });
        }

        if (resultado) {
          resultadosDescarte.push({
            idLote: vacunaDescarte.idLote,
            tipoLote: vacunaDescarte.tipoLote,
            cantVacunas: vacunaDescarte.cantVacunas,
          });
        }
      }
      console.log("RESULTADOS DESCARTE");
      console.log(resultadosDescarte);

      ////////////////

      const resultadoFinal = [];

      // Combinar los datos de los diferentes objetos y obtener las cantidades
      lotesProvedor.forEach((loteProvedor) => {
        const idLote = loteProvedor.idLote;

        const nuevoObjeto = {
          idLote,
          tipoVacuna: loteProvedor.tipoVacuna,
          nombreLaboratorio: loteProvedor.nombreLaboratorio,
          nombreComercial: loteProvedor.nombreComercial,
          paisOrigen: loteProvedor.paisOrigen,
          fechaFabricacion: loteProvedor.fechaFabricacion,
          fechaVencimiento: loteProvedor.fechaVencimiento,
          estado: loteProvedor.estado,
          fechaAdquisicion: loteProvedor.fechaAdquisicion,
          cantVacunasNacion: loteProvedor.cantVacunas,
          cantVacunasDistribucion: 0,
          cantVacunasProvincia: 0,
          cantVacunasCentroVac: 0,
          cantVacunasAplicadas: vacunasAplicadas[idLote] || 0,
          cantVacunasDescartadas: 0, // Agregar aquí la cantidad de vacunas descartadas por lote
          cantVacunasVencidas: 0, // Agregar aquí la cantidad de vacunas vencidas por lote
        };

          if (loteProvedor.estado === "descartado") {
            const descartesNacion = resultadosDescarte.filter(
              (descartes) => (descartes.tipoLote === "LoteNacion")
            );
            console.log("DESCARTE NACION");
            console.log(descartesNacion);
            descartesNacion.forEach((descarte) => {
              if (descarte.idLote === loteProvedor.idLote) {
                nuevoObjeto.cantVacunasDescartadas += descarte.cantVacunas;
              }
            });
          }
       

        depoProvStock.forEach((stockDepoProv) => {
          if (stockDepoProv.idLote === idLote) {
            if (stockDepoProv.estado === "enStock") {
              nuevoObjeto.cantVacunasProvincia += stockDepoProv.cantVacunas;
            }
            if (stockDepoProv.vencida) {
              nuevoObjeto.cantVacunasVencidas += stockDepoProv.cantVacunas;
            }
            if (stockDepoProv.estado === "descartado") {
              const descartesProv = resultadosDescarte.filter(
                (descartes) => (descartes.tipoLote === "LoteProvincia")
              );
              console.log("DESCARTE PROVINCIA");
              console.log(descartesProv);
              descartesProv.forEach((descarte) => {
                if (descarte.idLote === stockDepoProv.idLoteProv) {
                  nuevoObjeto.cantVacunasDescartadas += descarte.cantVacunas;
                }
              });
            }
            if (stockDepoProv.estado === "enViaje") {
              nuevoObjeto.cantVacunasDistribucion += stockDepoProv.cantVacunas;
            }
          }
        });

        centroStock.forEach((stockCentro) => {
          if (stockCentro.idLote === idLote) {
            if (stockCentro.estado === "enStock") {
              nuevoObjeto.cantVacunasCentroVac += stockCentro.cantVacunas;
            }
            if (stockCentro.estado === "descartado") {
              const descartesCentro = resultadosDescarte.filter(
                (descartes) => (descartes.tipoLote === "LoteCentro")
              );
              console.log("DESCARTE Centro");
              console.log(descartesCentro);
              descartesCentro.forEach((descarte) => {
                if (descarte.idLote === stockCentro.idLoteCentro) {
                  nuevoObjeto.cantVacunasDescartadas += descarte.cantVacunas;
                }
              });
            }
            if (stockCentro.estado === "enViaje") {
              nuevoObjeto.cantVacunasDistribucion += stockCentro.cantVacunas;
            }
          }
        });

        resultadoFinal.push(nuevoObjeto);
      });
      console.log("RESULTADOFINAL");

      console.log(resultadoFinal);

      res.render("lotesProvedor", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultadoFinal,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
};
