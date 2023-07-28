const { Loteprovedor } = require("../models/Loteprovedor.js");
const { Compralote } = require("../models/compralote.js");
const { Vacuna } = require("../models/Vacuna");
const { Laboratorio } = require("../models/Laboratorio");
const { DepositoNacion } = require("../models/DepositoNacion");
const { Localidad } = require("../models/Localidad");

const { sequelize, Sequelize, DataTypes, QueryTypes } = require("../dataBase/bd.js");

module.exports= {
    compraVacuna: async (req, res) => {
  const tipoVacuna = req.body.tipoVacuna;
  const laboratorio = req.body.laboratorio;
  const nombreComercial = req.body.laboratorio;
  const paisOrigen = req.body.paisOrigen;
  const cantidadVacunas = req.body.cantidadVacunas;
  const deposito = req.body.deposito;
  const idVacuna = req.body.idVacuna;
  if(tipoVacuna!=="-"&&laboratorio!=="-"&&nombreComercial!==""&&paisOrigen!==""&&cantidadVacunas>0&&deposito!=="-"){
    try {
      const nuevoLote = {
        idVacuna: idVacuna,
        fechaFabricacion: getRandomDate("2023-01-01", "2023-05-01"),
        fechaVencimiento: getRandomDate("2023-07-15", "2024-01-01"),
        estado: "enViaje",
        cantVacunas: cantidadVacunas,
        fechaAdquisicion: null,
        idDepoNacion: deposito,
      };
  
      // Crea el lote proveedor en la base de datos
      const loteCreado = await Loteprovedor.create(nuevoLote);
  
      console.log("Lote proveedor creado:", loteCreado);
      try {
        const nuevaCompra = {
          idLote: loteCreado.idLote,
          fechaCompra: new Date(),
          cantVacunas: cantidadVacunas,
        };
  
        // Crea la compra en la base de datos
        const compraCreada = await Compralote.create(nuevaCompra);
  
        console.log("Compra creada:", compraCreada);
  
      } catch (error) {
        console.error("Error al crear la compra:", error);
      }
    } catch (error) {
      console.error("Error al crear el lote proveedor:", error);
    }
  
    console.log(req.body);
    res.render("compra", {
      alert: true,
      alertTitle: "Compra Exitosa!!",
      alertMessage: "Se realizo la compra Correctamente",
      alertIcon: "success",
      showConfirmButton: false,
      timer: 1800,
      ruta: "compra",
      resultado: ["a"],
      resultadoDepo:["a"]
    });;
  }else{
    res.render("compra", {
      alert: true,
      alertTitle: "Error En la Compra",
      alertMessage: "Todos los campos deben estar completos",
      alertIcon: "error",
      showConfirmButton: false,
      timer: 1800,
      ruta: "compra",
      resultado: ["a"],
      resultadoDepo:["a"]
    });
  }
 
},
mostrarCompraVacuna: async (req,res)=>{
  userName = req.session.user.correo;
  loginlogoutName = "Logout";
  loginlogoutLink = "/logout";

  try {
    const vacunas = await Vacuna.findAll({
      include: [
        {
          model: Laboratorio,
          attributes: ["nombre"],
        },
      ],
    });

    const resultado = vacunas.map((vacuna) => {
      return {
        idVacuna: vacuna.idVacuna,
        tipoVacuna: vacuna.tipoVacuna,
        nombreComercial: vacuna.nombreComercial,
        paisOrigen: vacuna.paisOrigen,
        nombreLaboratorio: vacuna.Laboratorio.nombre,
      };
    });

   
      const depositos = await DepositoNacion.findAll({
        include: [
          {
            model: Localidad,
            attributes: ["provincia","ciudad"],
          },
        ],
      });
  
      const resultadoDepo = depositos.map((depo) => {
        return {
          idDepoNacion: depo.idDepoNacion,
          provincia: depo.Localidad.provincia,
          ciudad: depo.Localidad.ciudad,
          direccion: depo.direccion,


        };
      });
    
    res.render("compra", { userName, loginlogoutLink, loginlogoutName, resultado,resultadoDepo });
  } catch (error) {
    console.error("Error al obtener las vacunas", error);
    res.sendStatus(500);
  }
}

}

function getRandomDate(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTime = Math.random() * (end - start) + start;
  return new Date(randomTime);
}
