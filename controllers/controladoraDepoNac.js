
const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");
const { DepositoNacion } = require("../models/DepositoNacion");

module.exports = {
  agregarDepoNac: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    res.render("agregarDepoNac", {
      userName,
      loginlogoutLink,
      loginlogoutName,
    });
  },
  agregarDepoNacPost: async (req, res) => {
    let idLocalidad;
    const provincia = "Buenos Aires";
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
        const depoNacAux = await DepositoNacion.findOne({
          where: {
            idLocalidad: idLocalidad,
            direccion: direccion,
            telefono: telefono,
          },
        });
        console.log(depoNacAux);
        if (!depoNacAux) {
          const depoNac = await DepositoNacion.create({
            idLocalidad: idLocalidad,
            direccion: direccion,
            telefono: telefono,
          });
        }

        res.render("agregarDepoNac", {
          alert: true,
          alertTitle: "Confirmación de Agregado",
          alertMessage: "Se agregó el Deposito correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "agregarDepoNacion",
        });
      } catch (error) {
        console.log(error);
        res.render("agregarDepoNac", {
          alert: true,
          alertTitle: "Error en el agregado del Deposito",
          alertMessage: "No se pudo agregar el Deposito de vacunación",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "agregarDepoNacion",
        });
      }
    } else {
      res.render("agregarDepoNac", {
        alert: true,
        alertTitle: "Error en el agregado del Deposito",
        alertMessage: "Por favor complete todos los campos correctamente",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "agregarDepoNacion",
      });
    }
  },
};
