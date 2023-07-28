const { Loteprovedor } = require("../models/Loteprovedor");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepoProvinciaStock } = require("../models/DepoProvinciaStock");
const { CentroVacunacion } = require("../models/CentroVacunacion");
const { CentroVacunacionStock } = require("../models/CentroVacunacionStock");
const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");

module.exports = {
  centrosStock: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
      const centroStock = await CentroVacunacionStock.findAll({
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
          {
            model: CentroVacunacion,
            include: [
              {
                model: Localidad,
                attributes: ["provincia", "ciudad"],
              },
            ],
          },
        ],
      });
      const resultado = centroStock.map((stock) => {
        return {
          idLoteCentro: stock.id,
          idSublote: stock.idSublote,
          idCentro: stock.idCentro,
          idLote: stock.DepoProvinciaStock.Loteprovedor.idLote,
          tipoVacuna: stock.DepoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: stock.DepoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
          nombreLaboratorio:
            stock.DepoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
          fechaFabricacion: stock.DepoProvinciaStock.Loteprovedor.fechaFabricacion,
          fechaVencimiento: stock.DepoProvinciaStock.Loteprovedor.fechaVencimiento,
          vencida: stock.DepoProvinciaStock.Loteprovedor.vencida,
          ciudad: stock.Centrovacunacion.Localidad.ciudad,
          provincia: stock.Centrovacunacion.Localidad.provincia,
          direccion: stock.Centrovacunacion.direccion,
          cantVacunas: stock.cantVacunas,
          estado: stock.estado,
          fechaRecepcion: stock.fechaRecepcion,
        };
      });
      const provSet = new Set(resultado.map((resu) => resu.provincia));
      const tipoVacSet = new Set(resultado.map((resu) => resu.tipoVacuna));

      const prov = [...provSet];
      const tipoVac = [...tipoVacSet];

      console.log(resultado);
      res.render("centrosVacunacionStock", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultado,
        tipoVac,
        prov,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
  centrosStockPost: async (req, res) => {
    if (req.body !== undefined) {
      const id = req.params.id;
      const fechaRecepcion = req.body.fechaRecepcion;

      try {
        const centrosStock = await CentroVacunacionStock.findOne({ where: { id: id } });
        console.log(centrosStock);
        centrosStock.fechaRecepcion = fechaRecepcion;
        if(centrosStock.estado!=="descartado"){
          centrosStock.estado = "enStock";
        }
        
        await centrosStock.save();
        res.render("centrosVacunacionStock", {
          alert: true,
          alertTitle: "Recepcion Exitosa",
          alertMessage: "Se realizo la recepcion Correctamente",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1800,
          ruta: "centrosStock",
          resultado: ["a"],
          prov: ["a"],
          tipoVac: ["a"],
        });
      } catch (error) {
        res.render("centrosVacunacionStock", {
          alert: true,
          alertTitle: "No de pudo hacer la recepcion",
          alertMessage: "No se pudo hacer la Recepcion",
          alertIcon: "error",
          showConfirmButton: true,
          ruta: "centrosStock",
          resultado: ["a"],
          prov: ["a"],
          tipoVac: ["a"],
        });
      }
    } else {
      res.render("centrosVacunacionStock", {
        alert: true,
        alertTitle: "No de pudo hacer la recepcion",
        alertMessage: "Debe completar el campo de la fecha",
        alertIcon: "error",
        showConfirmButton: true,
        ruta: "centrosStock",
        resultado: ["a"],
        prov: ["a"],
        tipoVac: ["a"],
      });
    }
  },
  centrosStockReasignar: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";
    const idsCentros = [];
    const idLocalidades = [];

    try {
      const centroStock = await CentroVacunacionStock.findAll({
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
          {
            model: CentroVacunacion,
            include: [
              {
                model: Localidad,
                attributes: ["provincia", "ciudad"],
              },
            ],
          },
        ],
        where: {
          estado: "enStock",
        },
      });
      const resultadoAux = centroStock.map((stock) => {
        idsCentros.push(stock.idCentro);
        return {
          id: stock.id,
          idDepoProv: stock.DepoProvinciaStock.id,
          idCentro: stock.idCentro,
          idLote: stock.DepoProvinciaStock.Loteprovedor.idLote,
          tipoVacuna: stock.DepoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: stock.DepoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
          nombreLaboratorio:
            stock.DepoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
          vencida: stock.DepoProvinciaStock.Loteprovedor.vencida,
          ciudad: stock.Centrovacunacion.Localidad.ciudad,
          provincia: stock.Centrovacunacion.Localidad.provincia,
          direccion: stock.Centrovacunacion.direccion,
          cantVacunas: stock.cantVacunas,
          fechaRecepcion: stock.fechaRecepcion,
          estado: stock.estado,
        };
      });

      if (resultadoAux.length > 0) {
        const resultados = resultadoAux.filter((item) => item !== undefined);

        const centrosVacunacion = await CentroVacunacion.findAll({
          where: {
            idCentro: idsCentros, // Filtramos por el idCentro igual a 1
          },
          include: [
            {
              model: Localidad,
              attributes: ["idLocalidad", "provincia", "ciudad"],
            },
          ],
        });

        centrosVacunacion.forEach((centro) => {
          idLocalidades.push(centro.idLocalidad);
        });

        const localidadesAux = await Localidad.findAll({
          where: {
            idLocalidad: idLocalidades, // Filtramos por el idCentro igual a 1
          },
        });

        localidadesOrdenadas = localidadesAux.sort((a, b) =>
          a.provincia.localeCompare(b.provincia)
        );
        const localidades = localidadesOrdenadas.map((localidad) => {
          return {
            idLocalidad: localidad.idLocalidad,
            provincia: localidad.provincia,
            ciudad: localidad.ciudad,
          };
        });

        console.log("===============");
        console.log(centrosVacunacion.length);

        const centrosVacunacionTodos = await CentroVacunacion.findAll({
          include: [
            {
              model: Localidad,
              attributes: ["provincia", "ciudad"],
            },
          ],
        });
        const resultadoCentrosTodos = centrosVacunacionTodos.map((aux) => {
          return {
            idCentro: aux.idCentro,
            idLocalidad: aux.idLocalidad,
            provincia: aux.Localidad.provincia,
            ciudad: aux.Localidad.ciudad,
            direccion: aux.direccion,
            telefono: aux.telefono,
          };
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

        res.render("reasignarLotes", {
          userName,
          loginlogoutLink,
          loginlogoutName,
          resultados,
          localidades,
          resultadoCentros,
          resultadoCentrosTodos,
        });
      } else {
        res.render("reasignarLotes", {
          alert: true,
          alertTitle: "No hay compras en ningun centro de distribucion",
          alertMessage: `No se puede realizar aplicacion de vacunas por que no hay vacunas en ningun centro`,
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "reasignarLotes",
          resultado: ["a"],
          resultadoDepo: ["a"],
        });
      }
    } catch (error) {
      console.error("Error al obtener los datos", error);
      res.sendStatus(500);
    }
  },
  centrosStockReasignarPost: async (req, res) => {
    try {
      const body = req.body;
      console.log(body);
      if (
        body.provinciaSelect !== "-" &&
        body.vacunas !== "-" &&
        body.centro !== "-" &&
        body.lote !== "-" &&
        body.sublote !== "-" &&
        body.centroReceptor !== "-" &&
        body.provinciaSelect.trim().length !== 0 &&
        body.vacunas.trim().length !== 0 &&
        body.centro.trim().length !== 0 &&
        body.lote.trim().length !== 0 &&
        body.sublote.trim().length !== 0 &&
        body.centroReceptor.trim().length !== 0
      ) {
        console.log(req.body);
        const idCentroReceptor = req.body.centroReceptor;
        const idCentroStock = req.body.sublote;
        const centroStockAux = await CentroVacunacionStock.findByPk(idCentroStock);
        await CentroVacunacionStock.create({
          idCentro: idCentroReceptor,
          idSublote: centroStockAux.idSublote,
          cantVacunas: centroStockAux.cantVacunas,
          estado: "EnViaje",
        });
        centroStockAux.cantVacunas = 0;
        centroStockAux.estado = "sinStock";
        await centroStockAux.save();
        res.render("reasignarLotes", {
          alert: true,
          alertTitle: "Reasignacion Correcta",
          alertMessage: `Se reasigno el lote correctamente`,
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "reasignarLotes",
          localidades: [""],
        });
      } else {
        throw new Error("Error en el envio");
      }
    } catch (error) {
      console.log(error);
      res.render("reasignarLotes", {
        alert: true,
        alertTitle: "Error en el envio",
        alertMessage: `Todos Los Campos debes estar completos`,
        alertIcon: "error",
        showConfirmButton: true,
        timer: false,
        ruta: "reasignarLotes",
        localidades: [""],
      });
    }

    // let flag = true;
    // console.log(req.body);

    // if (idCentro !== "-" && idDeposito !== "-" && req.body.provincia !== "-") {
    //   for (const key in body) {
    //     const cantVacunasEnviadas = Number(body[key]);
    //     const idSublote = Number(key);

    //     if (!isNaN(idSublote)) {
    //       if (cantVacunasEnviadas > 0) {
    //         try {
    //           const depositoProvStock = await DepoProvinciaStock.findOne({
    //             where: { id: idSublote },
    //           });

    //           if (cantVacunasEnviadas <= depositoProvStock.cantVacunas) {
    //             console.log(`ANTES: ${depositoProvStock.cantVacunas}`);
    //             depositoProvStock.cantVacunas =
    //               depositoProvStock.cantVacunas - cantVacunasEnviadas;
    //             console.log(`DESPUES: ${depositoProvStock.cantVacunas}`);

    //             if (depositoProvStock.cantVacunas == 0) {
    //               depositoProvStock.estado = "sinStock";
    //             }
    //             await depositoProvStock.save();
    //             const centroVacunacionStock = await CentroVacunacionStock.create({
    //               idCentro: idCentro,
    //               idSublote: idSublote,
    //               cantVacunas: cantVacunasEnviadas,
    //               fechaRecepcion: null,
    //             });
    //           } else {
    //             flag = false;
    //             console.log("==============");
    //             console.log("PASO 6");
    //             console.log("==============");
    //           }
    //         } catch (error) {
    //           console.error(
    //             "Error al crear los elementos de centrovacunacionstock:",
    //             error
    //           );
    //           res.sendStatus(500);
    //         }
    //       }
    //     }
    //   }

    //   if (!flag) {
    //     res.render("envioVacunasCentros", {
    //       alert: true,
    //       alertTitle: "Error en el envio",
    //       alertMessage: `Una o mas vacunas no pudieron enviarse por falta de stock o por que estan vencidas. Recuerde descartar todas las vacunas vencidas`,
    //       alertIcon: "error",
    //       showConfirmButton: true,
    //       timer: false,
    //       ruta: "envioVacunasCentros",
    //       resultado: ["a"],
    //       resultadoDepoProv: ["a"],
    //       localidades,
    //     });
    //   } else {
    //     res.render("envioVacunasCentros", {
    //       alert: true,
    //       alertTitle: "Envio Correcto",
    //       alertMessage: "Se realizo el envio de todas las vacunas correctamente",
    //       alertIcon: "success",
    //       showConfirmButton: false,
    //       timer: 1500,
    //       ruta: "envioVacunasCentros",
    //       resultado: ["a"],
    //       resultadoDepoProv: ["a"],
    //       localidades,
    //     });
    //   }
    // } else {
    //   res.render("envioVacunasCentros", {
    //     alert: true,
    //     alertTitle: "Error en el envio",
    //     alertMessage: `Todos Los Campos debes estar completos`,
    //     alertIcon: "error",
    //     showConfirmButton: true,
    //     timer: false,
    //     ruta: "envioVacunasCentros",
    //     resultado: ["a"],
    //     resultadoDepoProv: ["a"],
    //     localidades,
    //   });
    // }
  },
  centrosAplicar: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";
    const provincia = req.query.provincia;
    const tipoVacuna = req.query.tipoVacuna;
    const disponibleVac = req.query.disponibleVac;
    if (disponibleVac) {
      console.log("QUERY");
      console.log("QUERY");
      console.log("QUERY");
      console.log("QUERY");
      console.log("QUERY");
      console.log("QUERY");
      console.log("QUERY");
      console.log(disponibleVac);
    }

    try {
      if (provincia.trim().length > 0 && tipoVacuna.trim().length > 0) {
        const centroStock = await CentroVacunacionStock.findAll({
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
            {
              model: CentroVacunacion,
              include: [
                {
                  model: Localidad,
                  attributes: ["provincia", "ciudad"],
                },
              ],
            },
          ],
        });
        const resultadoAux = centroStock.map((stock) => {
          return {
            idLoteCentro: stock.id,
            idSublote: stock.idSublote,
            idCentro: stock.idCentro,
            idLote: stock.DepoProvinciaStock.Loteprovedor.idLote,
            tipoVacuna: stock.DepoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
            nombreComercial: stock.DepoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
            nombreLaboratorio:
              stock.DepoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
            fechaFabricacion: stock.DepoProvinciaStock.Loteprovedor.fechaFabricacion,
            fechaVencimiento: stock.DepoProvinciaStock.Loteprovedor.fechaVencimiento,
            vencida: stock.DepoProvinciaStock.Loteprovedor.vencida,
            ciudad: stock.Centrovacunacion.Localidad.ciudad,
            provincia: stock.Centrovacunacion.Localidad.provincia,
            direccion: stock.Centrovacunacion.direccion,
            cantVacunas: stock.cantVacunas,
            estado: stock.estado,
            fechaRecepcion: stock.fechaRecepcion,
          };
        });

        const provSet = new Set(resultadoAux.map((resu) => resu.provincia));
        const tipoVacSet = new Set(resultadoAux.map((resu) => resu.tipoVacuna));

        const prov = [...provSet];
        const tipoVac = [...tipoVacSet];
        const resultado = resultadoAux.filter((resu) => {
          if (provincia !== "-" && tipoVacuna !== "-") {
            if (disponibleVac) {
              return (
                resu.provincia === provincia &&
                resu.tipoVacuna === tipoVacuna &&
                resu.estado === "enStock"
              );
            } else {
              return resu.provincia === provincia && resu.tipoVacuna === tipoVacuna;
            }
          } else if (tipoVacuna === "-" && provincia === "-" && disponibleVac) {
            return resu.estado === "enStock";
          } else if (provincia === "-" && tipoVacuna !== "-") {
            if (disponibleVac) {
              return resu.tipoVacuna === tipoVacuna && resu.estado === "enStock";
            } else {
              return resu.tipoVacuna === tipoVacuna;
            }
          } else if (tipoVacuna === "-" && provincia !== "-") {
            if (disponibleVac) {
              return resu.provincia === provincia && resu.estado === "enStock";
            } else {
              return resu.provincia === provincia;
            }
          }
        });

        if (resultado.length > 0) {
          res.render("centrosVacunacionStock", {
            userName,
            loginlogoutLink,
            loginlogoutName,
            resultado,
            tipoVac,
            prov,
          });
        } else {
          res.render("centrosVacunacionStock", {
            alert: true,
            alertTitle: "Error al filtrar",
            alertMessage: `No se encontraron lotes que coincidan con los filtros`,
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "centrosStock",
            resultado: ["a"],
            tipoVac: ["a"],
            prov: ["a"],
          });
        }
      } else {
        res.render("centrosVacunacionStock", {
          alert: true,
          alertTitle: "Error al filtrar",
          alertMessage: `No se encontraron lotes que coincidan con los filtros`,
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "centrosStock",
          resultado: ["a"],
          tipoVac: ["a"],
          prov: ["a"],
        });
      }
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
};
