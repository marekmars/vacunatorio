const { Loteprovedor } = require("../models/Loteprovedor");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepoProvinciaStock } = require("../models/DepoProvinciaStock");
const { CentroVacunacionStock } = require("../models/CentroVacunacionStock");
const { Localidad } = require("../models/Localidad");
const { sequelize, Sequelize, DataTypes, QueryTypes, Op } = require("../dataBase/bd.js");
const { VacunaDescarte } = require("../models/VacunasDescarte");
const { CentroVacunacion } = require("../models/CentroVacunacion");
const { Usuario } = require("../models/usuario");

module.exports = {
  descarteVacunas: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
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
                attributes: ["fechaFabricacion", "fechaVencimiento", "fechaAdquisicion"],
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
        attributes: ["id", "idSublote", "idCentro", "fechaRecepcion", "estado"],
      });

      const resultadoCentroStockAux = centroStockAux.map((lotes) => {
        if (lotes.estado === "enStock") {
          return {
            idCentroStock: lotes.id,
            idSublote: lotes.idSublote,
            vacuna: lotes.DepoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
            nombreComercial: lotes.DepoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
            origen: lotes.DepoProvinciaStock.Loteprovedor.Vacuna.paisOrigen,
            laboratorio: lotes.DepoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
            fechaFabricacion: lotes.DepoProvinciaStock.Loteprovedor.fechaFabricacion,
            fechaVencimiento: lotes.DepoProvinciaStock.Loteprovedor.fechaVencimiento,
            fechaAquisicion: lotes.fechaRecepcion,
            idCentro: lotes.Centrovacunacion.idCentro,
            provincia: lotes.Centrovacunacion.Localidad.provincia,
            ciudad: lotes.Centrovacunacion.Localidad.ciudad,
            direccion: lotes.Centrovacunacion.direccion,
          };
        }
      });
      console.log(resultadoCentroStockAux);
      const provStockAux = await DepoProvinciaStock.findAll({
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
            attributes: [
              "idLote",
              "fechaFabricacion",
              "fechaVencimiento",
              "fechaAdquisicion",
            ],
          },
        ],
        attributes: ["id", "idDepoProv", "fechaRecepcion", "estado"],
      });
      const resultadoProvStockAux = provStockAux.map((lotes) => {
        if (lotes.estado === "enStock") {
          return {
            idProvStock: lotes.id,
            idLote: lotes.Loteprovedor.idLote,
            vacuna: lotes.Loteprovedor.Vacuna.tipoVacuna,
            nombreComercial: lotes.Loteprovedor.Vacuna.nombreComercial,
            origen: lotes.Loteprovedor.Vacuna.paisOrigen,
            laboratorio: lotes.Loteprovedor.Vacuna.Laboratorio.nombre,
            fechaFabricacion: lotes.Loteprovedor.fechaFabricacion,
            fechaVencimiento: lotes.Loteprovedor.fechaVencimiento,
            fechaAquisicion: lotes.fechaRecepcion,
          };
        }
      });

      const loteProvedorAux = await Loteprovedor.findAll({
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
        attributes: [
          "idLote",
          "fechaFabricacion",
          "fechaVencimiento",
          "fechaAdquisicion",
          "estado",
          "vencida",
        ],
      });
      const todosDepos = provStockAux.map((lotes) => {
        return {
          idProvStock: lotes.id,
          idLote: lotes.Loteprovedor.idLote,
          vacuna: lotes.Loteprovedor.Vacuna.tipoVacuna,
          nombreComercial: lotes.Loteprovedor.Vacuna.nombreComercial,
          origen: lotes.Loteprovedor.Vacuna.paisOrigen,
          laboratorio: lotes.Loteprovedor.Vacuna.Laboratorio.nombre,
          fechaFabricacion: lotes.Loteprovedor.fechaFabricacion,
          fechaVencimiento: lotes.Loteprovedor.fechaVencimiento,
          fechaAquisicion: lotes.fechaRecepcion,
        };
      });

      const resultadoLoteProvedorAux = loteProvedorAux.map((lotes) => {
        if (lotes.estado === "enStock" || lotes.estado === "sinStock") {
          return {
            idLote: lotes.idLote,
            vacuna: lotes.Vacuna.tipoVacuna,
            nombreComercial: lotes.Vacuna.nombreComercial,
            origen: lotes.Vacuna.paisOrigen,
            laboratorio: lotes.Vacuna.Laboratorio.nombre,
            fechaFabricacion: lotes.fechaFabricacion,
            fechaVencimiento: lotes.fechaVencimiento,
            fechaAquisicion: lotes.fechaAdquisicion,
            vencida: lotes.vencida,
          };
        } else {
        }
      });
      const resultadoLoteProvedor = resultadoLoteProvedorAux.filter(
        (item) => item !== undefined
      );

      const resultadoProvStock = resultadoProvStockAux.filter(
        (item) => item !== undefined
      );
      const resultadoCentroStock = resultadoCentroStockAux.filter(
        (item) => item !== undefined
      );
      console.log("==========================");
      console.log(resultadoCentroStock);
      console.log("==========================");

      const vencidas = [];
      const lotesVencidos = resultadoLoteProvedor.filter((lote) => lote.vencida);
      // Filtrar los lotes vencidos
      lotesVencidos.forEach((lote) => {
        console.log("lotes");
        console.log(lote);
        todosDepos.forEach((depo) => {
          if (lote.idLote === depo.idLote) {
            console.log("depo");
            console.log(depo);
            resultadoCentroStock.forEach((centro) => {
              if (centro.idSublote === depo.idProvStock) {
                console.log("centro");
                console.log(centro);
                const vencida = {
                  idLote: lote.idLote,
                  vacuna: lote.vacuna,
                  laboratorio: lote.laboratorio,
                  nombreComercial: lote.nombreComercial,
                  fechaFabricacion: lote.fechaFabricacion,
                  fechaVencimiento: lote.fechaVencimiento,
                  idCentro: centro.idCentroStock,
                  ciudad: centro.ciudad,
                  provincia: centro.provincia,
                  direccion: centro.direccion,
                };

                vencidas.push(vencida);
              }
            });
          }
        });
      });

      console.log("VENCIDAS");
      console.log(vencidas);

      // vencidas.forEach(vencidas=>{
      //   vencidas.centroVacunacion.forEach(centro=>console.log(centro))
      // })

      console.log("FINALIZO");

      const provSet = new Set(resultadoCentroStock.map((resu) => resu.provincia));
      const tipoVacSet = new Set(resultadoLoteProvedor.map((resu) => resu.vacuna));
      const centrosVacSet = new Set(
        resultadoCentroStock.map((resu) => {
          return JSON.stringify({
            idCentro: resu.idCentro,
            ciudad: resu.ciudad,
            provincia: resu.provincia,
            direccion: resu.direccion,
          });
        })
      );

      const prov = [...provSet];
      const tipoVac = [...tipoVacSet];
      const centroVac = Array.from(centrosVacSet).map((jsonString) =>
        JSON.parse(jsonString)
      );

      res.render("vacunasDescarte", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultadoCentroStock,
        resultadoProvStock,
        resultadoLoteProvedor,
        prov,
        tipoVac,
        centroVac,
        vencidas,
      });
    } catch (error) {
      console.error("Error al obtener los datos", error);
      res.sendStatus(500);
    }
  },
  descarteVacunasPost: async (req, res) => {
    if (
      req.body.lote !== undefined &&
      req.body.loteSelect !== "-" &&
      req.body.motivo !== "" &&
      req.body.fechaDescarte !== ""
    ) {
      const lote = req.body.lote;
      const loteSelect = req.body.loteSelect;
      const motivo = req.body.motivo;
      const fechaDescarte = req.body.fechaDescarte;
      const eliminarLotesInf = req.body.lotesInferiores;
      console.log(eliminarLotesInf);
      console.log(req.body);
      try {
        if (lote === "loteNacion") {
          const loteAux = await Loteprovedor.findByPk(loteSelect);
          console.log(loteAux);
          const vacunaDescarte = await VacunaDescarte.create({
            idLote: loteSelect,
            motivo: motivo,
            fechaDescarte: fechaDescarte,
            personaACargo: req.session.user.id,
            tipoLote: "LoteNacion",
            cantVacunas: loteAux.cantVacunas,
          });
          loteAux.estado = "descartado";
          loteAux.cantVacunas = 0;
          await loteAux.save();
          if (eliminarLotesInf) {
            console.log("==========");
            console.log("ENTROOOO PROV");
            console.log("==========");
            const provStock = await DepoProvinciaStock.findAll({
              where: { idLote: loteSelect },
            });
            if (provStock) {
              console.log("PASO 3");
              for (const lote2 of provStock) {
                const vacunaDescarte = await VacunaDescarte.create({
                  idLote: lote2.id,
                  motivo: motivo,
                  fechaDescarte: fechaDescarte,
                  personaACargo: req.session.user.id,
                  tipoLote: "LoteProvincia",
                  cantVacunas: lote2.cantVacunas,
                });
                lote2.estado = "descartado";
                lote2.cantVacunas = 0;
                await lote2.save();
                const centroStock = await CentroVacunacionStock.findAll({
                  where: { idSublote: lote2.id },
                });
                if (centroStock) {
                  console.log("PASO 4");
                  for (const lote3 of centroStock) {
                    const vacunaDescarte = await VacunaDescarte.create({
                      idLote: lote3.id,
                      motivo: motivo,
                      fechaDescarte: fechaDescarte,
                      personaACargo: req.session.user.id,
                      tipoLote: "LoteCentro",
                      cantVacunas: lote3.cantVacunas,
                    });
                    lote3.estado = "descartado";
                    lote3.cantVacunas = 0;
                    await lote3.save();
                  }
                }
              }
            }
          }
        } else if (lote === "loteProvincia") {
          const loteAux = await DepoProvinciaStock.findByPk(loteSelect);
          console.log(loteAux);
          const vacunaDescarte = await VacunaDescarte.create({
            idLote: loteSelect,
            motivo: motivo,
            fechaDescarte: fechaDescarte,
            personaACargo: req.session.user.id,
            tipoLote: "LoteProvincia",
            cantVacunas: loteAux.cantVacunas,
          });
          loteAux.estado = "descartado";
          loteAux.cantVacunas = 0;
          await loteAux.save();
          if (eliminarLotesInf) {
            const centroStock = await CentroVacunacionStock.findAll({
              where: { idSublote: loteSelect },
            });
            if (centroStock) {
              console.log("PASO 4");
              for (const lote3 of centroStock) {
                const vacunaDescarte = await VacunaDescarte.create({
                  idLote: lote3.id,
                  motivo: motivo,
                  fechaDescarte: fechaDescarte,
                  personaACargo: req.session.user.id,
                  tipoLote: "LoteCentro",
                  cantVacunas: lote3.cantVacunas,
                });
                lote3.estado = "descartado";
                lote3.cantVacunas = 0;
                await lote3.save();
              }
            }
          }
        } else if (lote === "loteCentro") {
          const loteAux = await CentroVacunacionStock.findByPk(loteSelect);
          console.log(loteAux);
          const vacunaDescarte = await VacunaDescarte.create({
            idLote: loteSelect,
            motivo: motivo,
            fechaDescarte: fechaDescarte,
            personaACargo: req.session.user.id,
            tipoLote: "LoteCentro",
            cantVacunas: loteAux.cantVacunas,
          });
          console.log(loteAux.estado);
          loteAux.estado = "descartado";
          loteAux.cantVacunas = 0;
          await loteAux.save();
        }

        res.render("vacunasDescarte", {
          alert: true,
          alertTitle: "Lote Descartadado Correctamente",
          alertMessage: `Se realizo el descarte del lote correctamente`,
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "vacunasDescarte",
          prov: ["a"],
          tipoVac: ["a"],
          centroVac: ["a"],
          vencidas: ["a"],
        });
      } catch (error) {
        console.log(error);
        res.render("vacunasDescarte", {
          alert: true,
          alertTitle: "Error en el Descarte",
          alertMessage: `No realizo el descarte, ERROR: ${error}`,
          alertIcon: "warning",
          showConfirmButton: true,
          timer: false,
          ruta: "vacunasDescarte",
          prov: ["a"],
          tipoVac: ["a"],
          centroVac: ["a"],
          vencidas: ["a"],
        });
      }
    } else {
      res.render("vacunasDescarte", {
        alert: true,
        alertTitle: "No se realizo descarte",
        alertMessage: `No realizo el descarte, debe completar todos los campos`,
        alertIcon: "warning",
        showConfirmButton: true,
        timer: false,
        ruta: "vacunasDescarte",
        prov: ["a"],
        tipoVac: ["a"],
        centroVac: ["a"],
        vencidas: ["a"],
      });
    }
  },
  descarteVacunasVencidas: async (req, res) => {
    console.log("ENTRO DESCARTE VENCIDAS");
    let flag = false; // Inicializar el flag como false
    try {
      const loteProvedor = await Loteprovedor.findAll();
      if (loteProvedor) {
        console.log("PASO 1");
        for (const lote of loteProvedor) {
          if (lote.vencida && lote.estado !== "descartado") {
            console.log("PASO 2");

            const vacunaDescarte = await VacunaDescarte.create({
              idLote: lote.idLote,
              motivo: "Vencida",
              fechaDescarte: new Date(),
              personaACargo: req.session.user.id,
              tipoLote: "LoteNacion",
              cantVacunas: lote.cantVacunas,
            });
            lote.estado = "descartado";
            lote.cantVacunas = 0;
            await lote.save();
            const provStock = await DepoProvinciaStock.findAll({
              where: { idLote: lote.idLote },
            });
            if (provStock) {
              console.log("PASO 3");
              for (const lote2 of provStock) {
                const vacunaDescarte = await VacunaDescarte.create({
                  idLote: lote2.id,
                  motivo: "Vencida",
                  fechaDescarte: new Date(),
                  personaACargo: req.session.user.id,
                  tipoLote: "LoteProvincia",
                  cantVacunas: lote2.cantVacunas,
                });
                lote2.cantVacunas = 0;
                lote2.estado = "descartado";
                await lote2.save();
                const centroStock = await CentroVacunacionStock.findAll({
                  where: { idSublote: lote2.id },
                });
                if (centroStock) {
                  console.log("PASO 4");
                  for (const lote3 of centroStock) {
                    const vacunaDescarte = await VacunaDescarte.create({
                      idLote: lote3.id,
                      motivo: "Vencida",
                      fechaDescarte: new Date(),
                      personaACargo: req.session.user.id,
                      tipoLote: "LoteCentro",
                      cantVacunas: lote3.cantVacunas,
                    });
                    lote3.estado = "descartado";
                    lote3.cantVacunas = 0;
                    await lote3.save();
                  }
                }
              }
            }
            flag = true;
            console.log("FLAG=================>");
          }
        }
      }
      console.log(flag);
      if (flag) {
        res.render("vacunasDescarte", {
          alert: true,
          alertTitle: "Lotes Descartadados Correctamente",
          alertMessage: `Se realizo el descarte de todas los lotes vencidos al dia de la fecha`,
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "vacunasDescarte",
        });
      } else {
        res.render("vacunasDescarte", {
          alert: true,
          alertTitle: "No hay lotes Vencidas",
          alertMessage: `No realizo el descarte de ningun lote, ya que no hay lotes vencidos al dia de la fecha`,
          alertIcon: "warning",
          showConfirmButton: true,
          timer: false,
          ruta: "vacunasDescarte",
        });
      }
    } catch (error) {}
  },
  vacunasDescartadas: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    try {
      const vacunasDescarte = await VacunaDescarte.findAll({
        include: [{ model: Usuario }],
      });
      const resultados = [];

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
          resultados.push({
            idLote: vacunaDescarte.idLote,
            tipoLote: vacunaDescarte.tipoLote,
            tipoVacuna:
              resultado.DepoProvinciaStock?.Loteprovedor?.Vacuna.tipoVacuna ||
              resultado.Loteprovedor?.Vacuna.tipoVacuna ||
              resultado.Vacuna.tipoVacuna,
            nombreComercial:
              resultado.DepoProvinciaStock?.Loteprovedor?.Vacuna.nombreComercial ||
              resultado.Loteprovedor?.Vacuna.nombreComercial ||
              resultado.Vacuna.nombreComercial,
            laboratorio:
              resultado.DepoProvinciaStock?.Loteprovedor?.Vacuna.Laboratorio.nombre ||
              resultado.Loteprovedor?.Vacuna.Laboratorio.nombre ||
              resultado.Vacuna.Laboratorio.nombre,
            origen:
              resultado.DepoProvinciaStock?.Loteprovedor?.Vacuna.Laboratorio.pais ||
              resultado.Loteprovedor?.Vacuna.Laboratorio.pais ||
              resultado.Vacuna.Laboratorio.pais,
            fechaFabricacion:
              resultado.DepoProvinciaStock?.Loteprovedor?.fechaFabricacion ||
              resultado.Loteprovedor?.fechaFabricacion ||
              resultado.fechaFabricacion,
            fechaVencimiento:
              resultado.DepoProvinciaStock?.Loteprovedor?.fechaVencimiento ||
              resultado.Loteprovedor?.fechaVencimiento ||
              resultado.fechaVencimiento,
            motivoDescarte: vacunaDescarte.motivo,
            idPersonaACargo: vacunaDescarte.personaACargo,
            personaACargoApellido: vacunaDescarte.Usuario.apellido, // Usar operador opcional '?' para evitar undefined
            personaACargoNombre: vacunaDescarte.Usuario.nombre, // Usar operador opcional '?' para evitar undefined
          });
        }
      }

      res.render("vacunasDescartadas", {
        userName,
        loginlogoutLink,
        loginlogoutName,
        resultados,
      });
    } catch (error) {
      console.error("Error al obtener las compras", error);
      res.sendStatus(500);
    }
  },
  filtrarVencidas: async (req, res) => {
    userName = req.session.user.correo;
    loginlogoutName = "Logout";
    loginlogoutLink = "/logout";

    const provincia = req.query.provincia;
    const tipoVacuna = req.query.tipoVacuna;
    const centroId = req.query.centroId;
    console.log("QUERY!!!!");
    console.log(req.query);

    try {
      if (
        provincia.trim().length > 0 &&
        tipoVacuna.trim().length > 0 &&
        centroId.trim().length > 0
      ) {
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
                  attributes: [
                    "fechaFabricacion",
                    "fechaVencimiento",
                    "fechaAdquisicion",
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
          attributes: ["id", "idSublote", "idCentro", "fechaRecepcion", "estado"],
        });

        const resultadoCentroStockAux = centroStockAux.map((lotes) => {
          if (lotes.estado !== "descartado" && lotes.estado === "enStock") {
            return {
              idCentroStock: lotes.id,
              idSublote: lotes.idSublote,
              vacuna: lotes.DepoProvinciaStock.Loteprovedor.Vacuna.tipoVacuna,
              nombreComercial:
                lotes.DepoProvinciaStock.Loteprovedor.Vacuna.nombreComercial,
              origen: lotes.DepoProvinciaStock.Loteprovedor.Vacuna.paisOrigen,
              laboratorio:
                lotes.DepoProvinciaStock.Loteprovedor.Vacuna.Laboratorio.nombre,
              fechaFabricacion: lotes.DepoProvinciaStock.Loteprovedor.fechaFabricacion,
              fechaVencimiento: lotes.DepoProvinciaStock.Loteprovedor.fechaVencimiento,
              fechaAquisicion: lotes.fechaRecepcion,
              idCentro: lotes.Centrovacunacion.idCentro,
              provincia: lotes.Centrovacunacion.Localidad.provincia,
              ciudad: lotes.Centrovacunacion.Localidad.ciudad,
              direccion: lotes.Centrovacunacion.direccion,
            };
          }
        });
        console.log(resultadoCentroStockAux);
        const provStockAux = await DepoProvinciaStock.findAll({
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
              attributes: [
                "idLote",
                "fechaFabricacion",
                "fechaVencimiento",
                "fechaAdquisicion",
              ],
            },
          ],
          attributes: ["id", "idDepoProv", "fechaRecepcion", "estado"],
        });
        const resultadoProvStockAux = provStockAux.map((lotes) => {
          if (lotes.estado !== "descartado" && lotes.estado === "enStock") {
            return {
              idProvStock: lotes.id,
              idLote: lotes.Loteprovedor.idLote,
              vacuna: lotes.Loteprovedor.Vacuna.tipoVacuna,
              nombreComercial: lotes.Loteprovedor.Vacuna.nombreComercial,
              origen: lotes.Loteprovedor.Vacuna.paisOrigen,
              laboratorio: lotes.Loteprovedor.Vacuna.Laboratorio.nombre,
              fechaFabricacion: lotes.Loteprovedor.fechaFabricacion,
              fechaVencimiento: lotes.Loteprovedor.fechaVencimiento,
              fechaAquisicion: lotes.fechaRecepcion,
            };
          }
        });

        const loteProvedorAux = await Loteprovedor.findAll({
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
          attributes: [
            "idLote",
            "fechaFabricacion",
            "fechaVencimiento",
            "fechaAdquisicion",
            "estado",
            "vencida",
          ],
        });

        const resultadoLoteProvedorAux = loteProvedorAux.map((lotes) => {
          if (
            (lotes.estado !== "descartado" && lotes.estado === "enStock") ||
            lotes.estado === "sinStock"
          ) {
            console.log("ENTRO NO DESCARTADO");
            return {
              idLote: lotes.idLote,
              vacuna: lotes.Vacuna.tipoVacuna,
              nombreComercial: lotes.Vacuna.nombreComercial,
              origen: lotes.Vacuna.paisOrigen,
              laboratorio: lotes.Vacuna.Laboratorio.nombre,
              fechaFabricacion: lotes.fechaFabricacion,
              fechaVencimiento: lotes.fechaVencimiento,
              fechaAquisicion: lotes.fechaAdquisicion,
              vencida: lotes.vencida,
            };
          } else {
            console.log("======");
            console.log("======");
            console.log(`El lote ${lotes.idLote} se encunetra descartado`);
            console.log("======");
            console.log("======");
          }
        });
        const resultadoLoteProvedor = resultadoLoteProvedorAux.filter(
          (item) => item !== undefined
        );

        const resultadoProvStock = resultadoProvStockAux.filter(
          (item) => item !== undefined
        );
        const resultadoCentroStock = resultadoCentroStockAux.filter(
          (item) => item !== undefined
        );
        const vencidasAux = [];
        const todosDepos = provStockAux.map((lotes) => {
          return {
            idProvStock: lotes.id,
            idLote: lotes.Loteprovedor.idLote,
            vacuna: lotes.Loteprovedor.Vacuna.tipoVacuna,
            nombreComercial: lotes.Loteprovedor.Vacuna.nombreComercial,
            origen: lotes.Loteprovedor.Vacuna.paisOrigen,
            laboratorio: lotes.Loteprovedor.Vacuna.Laboratorio.nombre,
            fechaFabricacion: lotes.Loteprovedor.fechaFabricacion,
            fechaVencimiento: lotes.Loteprovedor.fechaVencimiento,
            fechaAquisicion: lotes.fechaRecepcion,
          };
        });
        const lotesVencidos = resultadoLoteProvedor.filter((lote) => lote.vencida);
        // Filtrar los lotes vencidos
        lotesVencidos.forEach((lote) => {
          console.log("lotes");
          console.log(lote);
          todosDepos.forEach((depo) => {
            if (lote.idLote === depo.idLote) {
              console.log("depo");
              console.log(depo);
              resultadoCentroStock.forEach((centro) => {
                if (centro.idSublote === depo.idProvStock) {
                  console.log("centro");
                  console.log(centro);
                  const vencida = {
                    idLote: lote.idLote,
                    vacuna: lote.vacuna,
                    laboratorio: lote.laboratorio,
                    nombreComercial: lote.nombreComercial,
                    fechaFabricacion: lote.fechaFabricacion,
                    fechaVencimiento: lote.fechaVencimiento,
                    idCentro: centro.idCentro,
                    ciudad: centro.ciudad,
                    provincia: centro.provincia,
                    direccion: centro.direccion,
                  };

                  vencidasAux.push(vencida);
                }
              });
            }
          });
        });

        const provSet = new Set(resultadoCentroStock.map((resu) => resu.provincia));
        const tipoVacSet = new Set(resultadoLoteProvedor.map((resu) => resu.vacuna));
        const centrosVacSet = new Set(
          resultadoCentroStock.map((resu) => {
            return JSON.stringify({
              idCentro: resu.idCentro,
              ciudad: resu.ciudad,
              provincia: resu.provincia,
              direccion: resu.direccion,
            });
          })
        );

        const prov = [...provSet];
        const tipoVac = [...tipoVacSet];
        const centroVac = Array.from(centrosVacSet).map((jsonString) =>
          JSON.parse(jsonString)
        );

        const vencidas = vencidasAux.filter((resu) => {
          if (provincia !== "-" && tipoVacuna !== "-" && centroId !== "-") {
            console.log("resu.provincia");
            console.log(resu.provincia);
            console.log("resu.vacuna");
            console.log(resu.vacuna);
            console.log("resu.idCentro");
            console.log(resu.idCentro);
            return (
              resu.provincia === provincia &&
              resu.vacuna === tipoVacuna &&
              resu.idCentro == centroId
            );
          } else if (provincia === "-" && tipoVacuna !== "-" && centroId === "-") {
            return resu.vacuna === tipoVacuna;
          } else if (provincia === "-" && centroId !== "-" && tipoVacuna !== "-") {
            return resu.vacuna === tipoVacuna && resu.idCentro == centroId;
          } else if (tipoVacuna === "-" && centroId === "-" && provincia !== "-") {
            return resu.provincia === provincia;
          } else if (tipoVacuna === "-" && centroId !== "-" && provincia !== "-") {
            return resu.provincia === provincia && resu.idCentro == centroId;
          } else if (tipoVacuna !== "-" && centroId === "-" && provincia !== "-") {
            return resu.provincia === provincia && resu.vacuna === tipoVacuna;
          } else if (tipoVacuna === "-" && centroId !== "-" && provincia === "-") {
            resu.idCentro == centroId;
          }
        });

        if (vencidas.length > 0) {
          res.render("vacunasDescarte", {
            userName,
            loginlogoutLink,
            loginlogoutName,
            tipoVac,
            prov,
            resultadoCentroStock,
            resultadoProvStock,
            resultadoLoteProvedor,
            centroVac,
            vencidas,
          });
        } else {
          res.render("vacunasDescarte", {
            alert: true,
            alertTitle: "Error al filtrar",
            alertMessage: `No se encontraron lotes que coincidan con los filtros`,
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "vacunasDescarte",
            resultadoCentroStock: ["a"],
            resultadoProvStock: ["a"],
            resultadoLoteProvedor: ["a"],
            resultado: ["a"],
            tipoVac: ["a"],
            prov: ["a"],
          });
        }
      } else {
        res.render("vacunasDescarte", {
          alert: true,
          alertTitle: "Error al filtrar",
          alertMessage: `No se encontraron lotes que coincidan con los filtros`,
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "vacunasDescarte",
          resultado: ["a"],
          tipoVac: ["a"],
          prov: ["a"],
          resultadoCentroStock: ["a"],
          resultadoProvStock: ["a"],
          resultadoLoteProvedor: ["a"],
        });
      }
    } catch (error) {
      console.error("Error al obtener los datos", error);
      res.sendStatus(500);
    }
  },

  // descateLotesAdjuntos: async (req, res, next) => {
  //   const loteProvedor = await Loteprovedor.findAll({ where: { estado: "descartado" } });

  //   loteProvedor.forEach(async (lote) => {
  //     const loteProv = await DepoProvinciaStock.findAll({
  //       where: { idLote: lote.idLote },
  //     });
  //     if (loteProv != null) {
  //       loteProv.forEach(async (loteAux) => {
  //         loteAux.estado = "descartado";
  //         loteAux.save();
  //         const loteCentro = await CentroVacunacionStock.findAll({
  //           where: { idSublote: loteAux.id },
  //         });
  //         if (loteCentro !== null) {
  //           loteCentro.forEach(async (loteAux) => {
  //             loteAux.estado = "descartado";
  //             loteAux.save();
  //           });
  //         }
  //       });
  //     }
  //   });
  //   next();
  // },
};
