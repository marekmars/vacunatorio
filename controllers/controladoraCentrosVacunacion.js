
const { CentroVacunacion } = require("../models/CentroVacunacion");
const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");

module.exports = {
  agregarCentro: async (req, res) => {
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

      res.render("agregarCentro", {
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
  agregarCentroPost: async (req, res) => {
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
        const centroVacunacionAux=await CentroVacunacion.findOne({where:{
            idLocalidad: idLocalidad,
            direccion: direccion,
            telefono: telefono,
        }})
        if(!centroVacunacionAux){
            const centroVacunacion = await CentroVacunacion.create({
                idLocalidad: idLocalidad,
                direccion: direccion,
                telefono: telefono,
              });
        }
        

        res.render("agregarCentro", {
          alert: true,
          alertTitle: "Confirmación de Agregado",
          alertMessage: "Se agregó el centro correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "agregarCentro",
          provincias:["a"]
        });
      } catch (error) {
        console.log(error);
        res.render("agregarCentro", {
          alert: true,
          alertTitle: "Error en el agregado del centro",
          alertMessage: "No se pudo agregar el centro de vacunación",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "agregarCentro",
          provincias:["a"]
        });
      }
    } else {
      res.render("agregarCentro", {
        alert: true,
        alertTitle: "Error en el agregado del centro",
        alertMessage: "Por favor complete todos los campos correctamente",
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "agregarCentro",
        provincias:["a"]
      });
    }
  },
};
