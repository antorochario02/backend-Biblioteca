import { Strategy } from "passport-local";
import UsuarioRepository from "../repositories/UsuarioRepository";
import ApiError from "../errors/ApiError";
import UsuarioResource from "../resources/UsuarioResource";

const localStrategy = new Strategy(
  {
    usernameField: "correo",
    passwordField: "password",
    session: false,
  },
  async (correo: string, password: string, done) => {
    try {
      const repository = new UsuarioRepository();

      const usuario = await repository.getAuthByCorreo(correo);

      if (!usuario || !usuario.password) {
        return done(
          new ApiError({
            name: "UNAUTHORIZED_ERROR",
            message: "Correo o contraseña incorrectos",
            code: "ERR_UNAUTH",
            status: 401,
          })
        );
      }

      const match = await repository.comparePassword(
        password,
        usuario.password
      );

      if (!match) {
        return done(
          new ApiError({
            name: "UNAUTHORIZED_ERROR",
            message: "Correo o contraseña incorrectos",
            code: "ERR_UNAUTH",
            status: 401,
          })
        );
      }

      const resource = new UsuarioResource(usuario);

      return done(null, resource.item());

    } catch (error) {
      return done(error);
    }
  }
);

export default localStrategy;