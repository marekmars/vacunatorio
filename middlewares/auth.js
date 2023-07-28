const bcryptjs = require("bcryptjs");
const { Usuario } = require("../models/usuario.js");
const {
  sequelize,
  Sequelize,
  DataTypes,
  QueryTypes,
} = require("../dataBase/bd.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const express = require("express");
const session = require("express-session");
const cookie = require("cookie");
const app = express();

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

require("dotenv").config({ path: "./env/.env" });

//metodo register
exports.register = async (req, res) => {
  const correo = req.body.email;
  const pass = req.body.pass;
  const passAgain = req.body.passAgain;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const dni = req.body.dni;
  const hashPass = await bcryptjs.hash(pass, 10);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  console.log(`pass ingresada: ${pass}`);
  console.log(`pass hash: ${hashPass}`);
  if (correo.trim() !== "" && pass.trim() !== "" && passAgain.trim() !== "" && emailRegex.test(correo)) {
    if (pass != passAgain) {
      res.render("register", {
        alert: true,
        alertTitle: "Error",
        alertMessage: "No coinciden las contraseñas",
        alertIcon: "error",
        showConfirmButton: false,
        timer: 1800,
        ruta: "register",
        emailValue: req.body.email || "",
      });
    } else {
      try {
        const usuarioCoincide = await Usuario.findOne({
          where: { correo: correo },
        });
        if (usuarioCoincide) {
          res.render("register", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Ya existe un usuario registrado con ese email",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 1800,
            ruta: "register",
          });
        } else {
          try {
            await Usuario.create({ correo: correo, pass: hashPass ,nombre:nombre,apellido:apellido,dni:dni});

            console.log(`usuario ${correo} creado correctamente`);
            res.render("register", {
              alert: true,
              alertTitle: "Registro",
              alertMessage: "Se Registro Correctamente",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1800,
              ruta: "login",
            });
          } catch (error) {
            console.log(`Error al crear el usuario ${error}`);
          }
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);
      }
    }
  }else{
    res.render("register",{})
  }
};

exports.login = async (req, res) => {
  try {
    const correo = req.body.email;
    const pass = req.body.pass;
    if (!correo || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un email y contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      try {
        const usuarioCoincide = await Usuario.findOne({
          where: { correo: correo },
        });
        if (
          usuarioCoincide !== null &&
          (await bcryptjs.compare(pass, usuarioCoincide.pass))
        ) {
          const id = usuarioCoincide.id;
          console.log(`ID: ${usuarioCoincide.id}`);
          const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
          });
          console.log(`Token: ${token}`);

          const cookiesOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRA * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          req.session.user = usuarioCoincide;
          res.cookie("jwt", token, cookiesOptions);
          console.log(`EL USUARIO LOGUEADO ES ${req.session.user.correo}`);
          res.render("login", {
            alert: true,
            alertTitle: "Logueo Completado",
            alertMessage: "Se Logio correctamente al sistema",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1800,
            ruta: "",
          });
        } else {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o contraseña incorrecta",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);
      }
    }
  } catch (error) {}
};

exports.isAuth = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const usuarioCoincide = await Usuario.findOne({
        where: { id: decodificada.id },
      });
      if (usuarioCoincide === null) {
        return next();
      }
      req.user = usuarioCoincide;
      req.session.user = usuarioCoincide;
      return next();
    } catch (error) {
      console.log(`Error: ${error}`);
      return next();
    }
  } else {
    res.redirect("/login");
  }
};

exports.logger = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.jwt;

  console.log(token);
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETO); // Reemplaza 'secreto' con tu clave secreta utilizada para firmar los tokens
    const userId = decodedToken.id;
    console.log(`user: ${decodedToken}`)
    req.session.user = await Usuario.findOne({
        where: { id: userId },
      });
  } catch (error) {
    console.error("no hay usuario logueado");
    req.session.user = null
  }
  next();
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
