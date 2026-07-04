export default class UsuarioResource {

  private usuario: any;

  constructor(usuario: any) {
    this.usuario = usuario;
  }

  item() {

    return {

      id: this.usuario._id,

      nombre: this.usuario.nombre,

      apellido: this.usuario.apellido,

      correo: this.usuario.correo,

      rol: this.usuario.rol,

      estado: this.usuario.estado,

      curso: this.usuario.curso,

      createdAt: this.usuario.createdAt,

      updatedAt: this.usuario.updatedAt,

    };

  }

}