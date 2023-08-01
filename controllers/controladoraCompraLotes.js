const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");

const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { Loteprovedor } = require("../models/Loteprovedor");
const { DepositoNacion } = require("../models/DepositoNacion");
const { Compralote } = require("../models/compralote");
const { Localidad } = require("../models/Localidad");

module.exports = {
  mostrarCompraLotes: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
      const compralotes = await Compralote.findAll({
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
          },
        ],
      });
      const resultado = compralotes.map((compra) => {
        // console.log(compra.Loteprovedor.Deposito.Localidad.provincia);
        return {
          idCompra: compra.idCompra,
          idLote: compra.Loteprovedor.idLote,
          tipoVacuna: compra.Loteprovedor.Vacuna.tipoVacuna,
          nombreLaboratorio: compra.Loteprovedor.Vacuna.Laboratorio.nombre,
          nombreComercial: compra.Loteprovedor.Vacuna.nombreComercial,
          paisOrigen: compra.Loteprovedor.Vacuna.paisOrigen,
          fechaFabricacion: compra.Loteprovedor.fechaFabricacion,
          fechaVencimiento: compra.Loteprovedor.fechaVencimiento,
          estado: compra.Loteprovedor.estado,
          fechaAdquisicion: compra.Loteprovedor.fechaAdquisicion,
          idDepoNacion: compra.Loteprovedor.idDepoNacion,
          deposito: `${compra.Loteprovedor.idDepoNacion}-${compra.Loteprovedor.Deposito.Localidad.provincia} - ${compra.Loteprovedor.Deposito.Localidad.ciudad}`,
          cantVacunasCompradas: compra.cantVacunas,
          cantVacunas: compra.Loteprovedor.cantVacunas,

          fechaCompra: compra.fechaCompra,
        };
      });

      res.render("modCompra", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultado,
        resultadoTodos: null,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },

  filtrarCompras: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

   
    console.log(req.query);
    const fechaInicio = req.query.fechainicio;
    const fechaFin = req.query.fechafin;
    const laboratorio = req.query.laboratorios;
   
    try {
      const compralotesTodos = await Compralote.findAll({
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
          },
        ],
      });
      const resultadoTodos = compralotesTodos.map((compra) => {
        // console.log(compra.Loteprovedor.Deposito.Localidad.provincia);
        return {
          idCompra: compra.idCompra,
          idLote: compra.Loteprovedor.idLote,
          tipoVacuna: compra.Loteprovedor.Vacuna.tipoVacuna,
          nombreLaboratorio: compra.Loteprovedor.Vacuna.Laboratorio.nombre,
          nombreComercial: compra.Loteprovedor.Vacuna.nombreComercial,
          paisOrigen: compra.Loteprovedor.Vacuna.paisOrigen,
          fechaFabricacion: compra.Loteprovedor.fechaFabricacion,
          fechaVencimiento: compra.Loteprovedor.fechaVencimiento,
          estado: compra.Loteprovedor.estado,
          fechaAdquisicion: compra.Loteprovedor.fechaAdquisicion,
          idDepoNacion: compra.Loteprovedor.idDepoNacion,
          deposito: `${compra.Loteprovedor.idDepoNacion}-${compra.Loteprovedor.Deposito.Localidad.provincia} - ${compra.Loteprovedor.Deposito.Localidad.ciudad}`,
          cantVacunas: compra.cantVacunas,
          fechaCompra: compra.fechaCompra,
        };
      });

      const compralotes = await Compralote.findAll({
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
          },
        ],
      });
      
      if (compralotes.length > 0) {
        const resultadoAux = compralotes.map((compra) => {
          // console.log(compra.Loteprovedor.Deposito.Localidad.provincia);     
            return {
              idCompra: compra.idCompra,
              idLote: compra.Loteprovedor.idLote,
              tipoVacuna: compra.Loteprovedor.Vacuna.tipoVacuna,
              nombreLaboratorio: compra.Loteprovedor.Vacuna.Laboratorio.nombre,
              nombreComercial: compra.Loteprovedor.Vacuna.nombreComercial,
              paisOrigen: compra.Loteprovedor.Vacuna.paisOrigen,
              fechaFabricacion: compra.Loteprovedor.fechaFabricacion,
              fechaVencimiento: compra.Loteprovedor.fechaVencimiento,
              estado: compra.Loteprovedor.estado,
              fechaAdquisicion: compra.Loteprovedor.fechaAdquisicion,
              idDepoNacion: compra.Loteprovedor.idDepoNacion,
              deposito: `${compra.Loteprovedor.idDepoNacion}-${compra.Loteprovedor.Deposito.Localidad.provincia} - ${compra.Loteprovedor.Deposito.Localidad.ciudad}`,
              cantVacunas: compra.cantVacunas,
              fechaCompra: compra.fechaCompra,
            };
          
        });
        
    console.log("===================")
    console.log("===================")
    console.log("RESULTADO AUX")
    console.log(resultadoAux)
    console.log("===================")
    console.log("===================")
        const resultado = resultadoAux.filter((resu) => {
          console.log(resu)
          if (laboratorio!=="-"&&fechaFin===""&&fechaInicio==="") {
            console.log("entroooooooooooooooo")
            return resu.nombreLaboratorio === laboratorio
          }else if(laboratorio==="-"&&fechaFin&&fechaInicio){
            return resu.fechaCompra >= fechaInicio && resu.fechaCompra <= fechaFin
          }else if(laboratorio!=="-"&&fechaFin&&fechaInicio){
            return resu.fechaCompra >= fechaInicio && resu.fechaCompra <= fechaFin&&resu.nombreLaboratorio === laboratorio
          }
        })
        
        console.log("===================");
        console.log(resultado);
        console.log("===================");
        if (resultado.length > 0) {
          res.render("modCompra", {
            userName,
            loginlogoutLink,
            loginlogoutName,
            resultado,
            resultadoTodos,
          });
        } else {
          res.render("modCompra", {
            alert: true,
            alertTitle: "Error al filtrar",
            alertMessage: `No se encontraron compras que coincidan con los filtros`,
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "modCompra",
            resultado: ["a"],
          });
        }
      } else {
        res.render("modCompra", {
          alert: true,
          alertTitle: "Error al filtrar",
          alertMessage: `No se encontraron compras que coincidan con los filtros`,
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "modCompra",
          resultado: ["a"],
        });
      }
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
};
