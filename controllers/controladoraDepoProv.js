const { Loteprovedor } = require("../models/Loteprovedor");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepoProvinciaStock } = require("../models/DepoProvinciaStock");
const { CentroVacunacion } = require("../models/CentroVacunacion");
const { CentroVacunacionStock } = require("../models/CentroVacunacionStock");
const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");
const { DepositoProvincia } = require("../models/DepositoProv");

module.exports = {
  agregarDepoProv: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";
    try {
      const localidades = await Localidad.findAll();
      const provincias = Array.from(
        new Set(
          localidades.map((aux) => aux.provincia).sort((a, b) => a.localeCompare(b))
        )
      );

      res.render("agregarDepoProv", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        provincias,
      });
    } catch (error) {
      console.error("Error al obtener los datos", error);
      res.sendStatus(500);
    }
  },
  agregarDepoProvPost: async (req, res) => {
    let idLocalidad;
    const provincia = req.body.provinciaSelect;
    const ciudad = req.body.ciudad;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    if (
      provincia !== "-" &&
      ciudad.trim().length !== 0 &&
      direccion.trim().length !== 0 &&
      telefono.trim().length !== 0
    ) {
      try {
        const localidadBusc = await Localidad.findOne({
          where: { provincia: provincia, ciudad: ciudad },
        });

        if (!localidadBusc) {
          const localidad = await Localidad.create({
            provincia: provincia,
            ciudad: ciudad,
          });
          idLocalidad = localidad.idLocalidad;
        } else {
          idLocalidad = localidadBusc.idLocalidad;
        }
        const depoProvAux = await DepositoProvincia.findOne({
          where: {
            idLocalidad: idLocalidad,
            direccion: direccion,
            telefono: telefono,
          },
        });
        console.log(depoProvAux)
        if (!depoProvAux) {
          const depoProv = await DepositoProvincia.create({
            idLocalidad: idLocalidad,
            direccion: direccion,
            telefono: telefono,
          });
        }

        res.render("agregarDepoProv", {
          alert: true,
          alertTitle: "Confirmación de Agregado",
          alertMessage: "Se agregó el Deposito correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "agregarDepoProvincia",
          provincias:["a"],
        });
      } catch (error) {
        console.log(error);
        res.render("agregarDepoProv", {
          alert: true,
          alertTitle: "Error en el agregado del Deposito",
          alertMessage: "No se pudo agregar el Deposito de vacunación",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "agregarDepoProvincia",
          provincias:["a"],
        });
      }
    } else {
      res.render("agregarDepoProv", {
        alert: true,
        alertTitle: "Error en el agregado del Deposito",
        alertMessage: "Por favor complete todos los campos correctamente",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "agregarDepoProvincia",
        provincias:["a"],
      });
    }
  },
};
