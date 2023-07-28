const { Loteprovedor } = require("../models/Loteprovedor");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepositoProvincia } = require("../models/DepositoProv");
const { DepoProvinciaStock } = require("../models/DepoProvinciaStock");
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

      console.log(resultado);
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
        if(depoProvStock.estado!=="descartado"){
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
};
