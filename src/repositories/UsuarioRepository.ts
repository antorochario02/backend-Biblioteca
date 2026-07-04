import Usuario from "../database/models/Usuario";
import bcrypt from "bcrypt";

export default class UsuarioRepository {

  // 🔍 Obtener usuario por ID
  async getById(id: string) {
    return await Usuario.findById(id).populate("curso");
  }

  // 🔐 Obtener usuario para login (incluye password)
  async getAuthByCorreo(correo: string) {
    return await Usuario.findOne({
      correo,
      estado: true
    }).select("+password");
  }

  // 🔑 Comparar contraseña
  async comparePassword(plain: string, hash: string) {
    return await bcrypt.compare(plain, hash);
  }

  // 🆕 Crear usuario
  async create(data: any) {

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await Usuario.create({
      ...data,
      password: hashedPassword
    });

  }

  // 📋 Obtener todos los usuarios
  async getAll() {
    return await Usuario.find().populate("curso");
  }

  // ✏️ Actualizar usuario
  async update(id: string, data: any) {

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await Usuario.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );

  }

  // ❌ Eliminación lógica
  async delete(id: string) {

    return await Usuario.findByIdAndUpdate(
      id,
      {
        estado: false
      },
      {
        new: true
      }
    );

  }

}