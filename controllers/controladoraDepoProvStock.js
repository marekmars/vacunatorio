const { Loteprovedor } = require("../models/Loteprovedor");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepositoProvincia } = require("../models/DepositoProv");
const { DepoProvinciaStock } = require("../models/DepoProvinciaStock");
const { DepositoNacion } = require("../models/DepositoNacion");
const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");

module.exports = {
  muestraStockProv: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
      const depoProvinciaStock = await DepoProvinciaStock.findAll({
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
          {
            model: DepositoProvincia,
            include: [
              {
                model: Localidad,
                attributes: ["provincia", "ciudad"],
              },
            ],
          },
        ],
      });
      const resultado = depoProvinciaStock.map((stock) => {
        return {
          id: stock.id,
          idLote: stock.Loteprovedor.idLote,
          tipoVacuna: stock.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: stock.Loteprovedor.Vacuna.nombreComercial,
          nombreLaboratorio: stock.Loteprovedor.Vacuna.Laboratorio.nombre,
          fechaFabricacion: stock.Loteprovedor.fechaFabricacion,
          fechaVencimiento: stock.Loteprovedor.fechaVencimiento,
          vencida: stock.Loteprovedor.vencida,
          idDepoProv: stock.DepositoProvincium.idDepoProv,
          ciudad: stock.DepositoProvincium.Localidad.ciudad,
          provincia: stock.DepositoProvincium.Localidad.provincia,
          direccion: stock.DepositoProvincium.direccion,
          cantVacunas: stock.cantVacunas,
          estado: stock.estado,
          fechaRecepcion: stock.fechaRecepcion,
        };
      });

      res.render("depositoProvinciaStock", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultado,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
  muestraStockProvRecep: async (req, res) => {
    if (req.body !== undefined) {
      const id = req.params.id;
      const fechaRecepcion = req.body.fechaRecepcion;
      try {
        const depoProvStock = await DepoProvinciaStock.findOne({ where: { id: id } });
        console.log(depoProvStock.fechaRecepcion);
        depoProvStock.fechaRecepcion = fechaRecepcion;
        if (depoProvStock.estado !== "descartado") {
          depoProvStock.estado = "enStock";
        }

        await depoProvStock.save();
        res.render("depositoProvinciaStock", {
          alert: true,
          alertTitle: "Recepcion Exitosa",
          alertMessage: "Se realizo la recepcion Correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1800,
          ruta: "depositoProvinciaStock",
          resultado: ["a"],
          resultadoDepo: ["a"],
        });
      } catch (error) {
        res.render("depositoProvinciaStock", {
          alert: true,
          alertTitle: "No de pudo hacer la recepcion",
          alertMessage: "No se pudo hacer la Recepcion",
          alertIcon: "error",
          showConfirmButton: true,
          ruta: "depositoProvinciaStock",
          resultado: ["a"],
          resultadoDepo: ["a"],
        });
      }
    } else {
      res.render("depositoProvinciaStock", {
        alert: true,
        alertTitle: "No de pudo hacer la recepcion",
        alertMessage: "Debe completar el campo de la fecha",
        alertIcon: "error",
        showConfirmButton: true,
        ruta: "depositoProvinciaStock",
        resultado: ["a"],
        resultadoDepo: ["a"],
      });
    }
  },
  editarLoteProv: async (req, res) => {
    const idLote = req.params.id;
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";
    console.log(req.body);
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


      const depoProvinciaStock = await DepoProvinciaStock.findOne({
        where: { id: idLote },
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
          {
            model: DepositoProvincia,
            include: [
              {
                model: Localidad,
                attributes: ["provincia", "ciudad"],
              },
            ],
          },
        ],
      });
      console.log(depoProvinciaStock)
      const loteProvincia =  {
          idLote: depoProvinciaStock.Loteprovedor.idLote,
          tipoVacuna: depoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: depoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
          nombreLaboratorio: depoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
          fechaFabricacion: depoProvinciaStock.Loteprovedor.fechaFabricacion,
          fechaVencimiento: depoProvinciaStock.Loteprovedor.fechaVencimiento,
          idDepoProv: depoProvinciaStock.DepositoProvincium.idDepoProv,
          ciudad: depoProvinciaStock.DepositoProvincium.Localidad.ciudad,
          provincia: depoProvinciaStock.DepositoProvincium.Localidad.provincia,
          direccion: depoProvinciaStock.DepositoProvincium.direccion,
          cantVacunas: depoProvinciaStock.cantVacunas,
          estado: depoProvinciaStock.estado,
          origen:depoProvinciaStock.Loteprovedor.Vacuna.paisOrigen,
          fechaRecepcion: depoProvinciaStock.fechaRecepcion,
        };
        console.log(loteProvincia)
   



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
            fechaAdquisicion: lote.fechaAdquisicion,
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
      res.render("editarLotesProv", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultado,
        resultadoDepoProv,
        idLote,
        loteProvincia
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
  editarLoteProvPost: async (req, res) => {
    console.log("INICIA!!!!!!!!!!!!!!!");
    const idLoteProv = req.params.id;
    const idLote = req.body.loteSelect;
    const cantVacunas = req.body.cantidadVacunas;
    const idDeposito = req.body.deposito;
    const fechaRecepcion = req.body.fechaRecepcion;
    const devolverVacuna = req.body.devolverVacuna;
    console.log(req.body);
    console.log("idLoteProv");
    console.log(idLoteProv);
    console.log("cantVacunas");
    console.log(cantVacunas);
    console.log("idDeposito");
    console.log(idDeposito);
    console.log("fechaRecepcion");
    console.log(fechaRecepcion);

    console.log("idLote");
    console.log(idLote);
    try {
      const loteProvinciaOriginal = await DepoProvinciaStock.findByPk(idLoteProv, {
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
          {
            model: DepositoProvincia,
            include: [
              {
                model: Localidad,
              },
            ],
          },
        ],
      });
      if (
        loteProvinciaOriginal.estado !== "descarcado" &&
        loteProvinciaOriginal.estado !== "sinStock"
      ) {
        if (idLote !== "" && idLote !== "-") {
          const loteProvedorOriginal = await Loteprovedor.findByPk(
            loteProvinciaOriginal.idLote
          );
          const loteProvedorNuevo = await Loteprovedor.findByPk(idLote);
          if (devolverVacuna) {
            if (
              cantVacunas !== "" &&
              loteProvedorNuevo.cantVacunas >= Number(cantVacunas)
            ) {
              //dolviendo vacunas al lote original
              loteProvedorNuevo.cantVacunas =
                loteProvedorNuevo.cantVacunas - Number(cantVacunas);
              loteProvedorOriginal.cantVacunas =
                loteProvedorOriginal.cantVacunas + loteProvinciaOriginal.cantVacunas;

              loteProvinciaOriginal.cantVacunas = Number(cantVacunas);

              //estado a sin stock si luego de cambio de stock la cantidad de vacunas es 0
              if (loteProvedorNuevo.cantVacunas === 0) {
                loteProvedorNuevo.estado = "sinStock";
                console.log("==========");
                console.log("ENTRO 2");
                console.log("==========");
              }
              await loteProvedorNuevo.save();
              await loteProvedorOriginal.save();

              loteProvinciaOriginal.idLote = idLote;
            } else if (
              cantVacunas === "" &&
              loteProvedorNuevo.cantVacunas >= loteProvinciaOriginal.cantVacunas
            ) {
              console.log("==========");
              console.log("ENTRO 3");
              console.log("==========");
              loteProvedorNuevo.cantVacunas =
                loteProvedorNuevo.cantVacunas - loteProvinciaOriginal.cantVacunas;
              loteProvedorOriginal.cantVacunas =
                loteProvedorOriginal.cantVacunas + loteProvinciaOriginal.cantVacunas;
              if (loteProvedorNuevo.cantVacunas === 0) {
                loteProvedorNuevo.estado = "sinStock";
              }
              await loteProvedorNuevo.save();
              await loteProvedorOriginal.save();
              loteProvinciaOriginal.idLote = idLote;
            } else {
              return res.render("depositoProvinciaStock", {
                alert: true,
                alertTitle: "ERROR",
                alertMessage:
                  "No se realizo la Modificacion ya que el stock del nuevo lote es menor a la cantidad de vacunas",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: "depositoProvinciaStock",
                resultado: ["a"],
              });
            }
          } else {
            if (cantVacunas !== "") {
              loteProvinciaOriginal.idLote = idLote;
              loteProvinciaOriginal.cantVacunas = cantVacunas;
            } else {
              loteProvinciaOriginal.idLote = idLote;
            }
          }
        }

        if (idLote === "" || (idLote === "-" && cantVacunas !== "")) {
          loteProvinciaOriginal.cantVacunas = cantVacunas;
        }

        if (idDeposito !== "-" && idDeposito !== "") {
          loteProvinciaOriginal.idDepoNacion = idDeposito;
        }

        if (fechaRecepcion !== "") {
          loteProvinciaOriginal.fechaRecepcion = fechaRecepcion;
          console.log("ESTADOOOOOO");
          console.log(loteProvinciaOriginal.estado);
          if (loteProvinciaOriginal.estado !== "descartado") {
            loteProvinciaOriginal.estado = "enStock";
          }
        }

        await loteProvinciaOriginal.save();

        res.render("depositoProvinciaStock", {
          alert: true,
          alertTitle: "Modificacion del Lote Correcta",
          alertMessage: "Se realizo la Modificacion correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1200,
          ruta: "depositoProvinciaStock",
          resultado: ["a"],
        });
      } else {
        return res.render("depositoProvinciaStock", {
          alert: true,
          alertTitle: "ERROR",
          alertMessage: "No se realizo la Modificacion devido a un error",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "depositoProvinciaStock",
          resultado: ["a"],
        });
      }
    } catch (error) {
      console.log(error);
      res.render("depositoProvinciaStock", {
        alert: true,
        alertTitle: "ERROR",
        alertMessage: "No se realizo la Modificacion devido a un error",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "depositoProvinciaStock",
        resultado: ["a"],
      });
    }
  },
};
