import "dotenv/config";

import inquirer from "inquirer";
import chalk from "chalk";
import bcrypt from "bcrypt";

import { connectDB } from "../src/database/connection";

import Usuario from "../src/database/models/Usuario";
import Curso from "../src/database/models/Curso";

async function createUser() {

  try {

    await connectDB();

    console.log(
      chalk.yellow("=== Crear Usuario ===")
    );

    const cursos = await Curso.find();

    const questions: any[] = [

      {
        type: "input",
        name: "nombre",
        message: "Nombre:",
      },

      {
        type: "input",
        name: "apellido",
        message: "Apellido:",
      },

      {
        type: "input",
        name: "correo",
        message: "Correo institucional:",
      },

      {
        type: "password",
        name: "password",
        message: "Contraseña:",
        mask: "*",
      },

      {
        type: "list",
        name: "rol",
        message: "Rol:",
        choices: [
          "ADMIN",
          "PROFESOR",
          "ESTUDIANTE",
        ],
      },

      {
        type: "list",
        name: "curso",
        message: "Curso:",
        choices: cursos.map((c) => ({
          name: c.nombre,
          value: c._id,
        })),
        when: (answers: any) => answers.rol === "ESTUDIANTE",
      },

    ];

    const answers = await inquirer.prompt(questions);

    const existe = await Usuario.findOne({
      correo: answers.correo,
    });

    if (existe) {

      console.log(
        chalk.red("❌ Ya existe un usuario con ese correo.")
      );

      process.exit(1);

    }

    const hashedPassword = await bcrypt.hash(
      answers.password,
      10
    );

    const usuario = await Usuario.create({

      nombre: answers.nombre,

      apellido: answers.apellido,

      correo: answers.correo,

      password: hashedPassword,

      rol: answers.rol,

      estado: true,

      curso:
        answers.rol === "ESTUDIANTE"
          ? answers.curso
          : null,

    });

    console.log(
      chalk.green(
        `✅ Usuario creado correctamente: ${usuario.nombre}`
      )
    );

    process.exit(0);

  } catch (error) {

    console.error(
      chalk.red("❌ Error creando usuario"),
      error
    );

    process.exit(1);

  }

}

createUser();