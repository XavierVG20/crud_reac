import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      nombre_usuario: '',
      cedula_usuario: '',
      telefono_usuario: '',
      email_usuario: '',
      _id: '',
      usuarios: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addUsuario = this.addUsuario.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  componentDidMount() {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    fetch('/usuarios')
      .then(res => res.json())
      .then(data => {
        this.setState({ usuarios: data });
        console.log(this.state.usuarios);
      });
  }
  addUsuario(e) {
    e.preventDefault();
    if (this.state._id) {
      console.log(this.state);

      fetch(`/usuarios/${this.state._id}`, {

        method: 'PUT',
        body: JSON.stringify({

          nombre_usuario: this.state.nombre_usuario,
          cedula_usuario: this.state.cedula_usuario,
          telefono_usuario: this.state.telefono_usuario,
          email_usuario: this.state.email_usuario
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({ html: 'Usuario actualizado' });
          this.setState({
            nombre_usuario: '',
            cedula_usuario: '',
            telefono_usuario: '',
            email_usuario: '',
            _id: ''
          });
          this.fetchUsuarios();
        });
    } else {
      console.log(this.state);
      fetch(`/usuarios/${this.state._id}`, {
        method: 'POST',
        body: JSON.stringify({
          nombre_usuario: this.state.nombre_usuario,
          cedula_usuario: this.state.cedula_usuario,
          telefono_usuario: this.state.telefono_usuario,
          email_usuario: this.state.email_usuario
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({ html: 'Usuario Guardado' });
          this.setState({
            _id: '', nombre_usuario: '',
            cedula_usuario: '',
            telefono_usuario: '',
            email_usuario: ''
          });
          this.fetchUsuarios();
        });
    }

  }

  deleteUsuario(id) {
    if (confirm('Esta seguro de eleiminar el usuario?')) {
      fetch(`/usuarios/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: 'Usuario Eliminado' });
          this.fetchUsuarios();
        });
    }
  }

  editUsuario(id) {
    fetch(`/usuarios/${id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({
          _id: data._id,
          nombre_usuario: data.nombre_usuario,
          cedula_usuario: data.cedula_usuario,
          telefono_usuario: data.telefono_usuario,
          email_usuario: data.email_usuario,

        });
      });
  }
  render() {
    return (
      <div className="content">
        <nav className="light-blue darken-4">
          <div className="nav-wrapper">
            <a href="/" class="brand-logo center">MERN CRUD Usuarios</a>
          </div>
        </nav>

        <div className="content">
          <div className="row">
            <div className="col s12 m6">
              <div className="card  darken-1">
                <div className="card-content black-text">
                  <span className="card-title">Usuario</span>
                  <form onSubmit={this.addUsuario} >
                    <input type="text"  name="_id" onChange={this.handleChange} value={this.state._id}></input>
                    <div className="row">
                      <div className="input-field col s6">
                        <input id="Nombre" type="text" name="nombre_usuario" onChange={this.handleChange} value={this.state.nombre_usuario} type="text" className="validate"></input>
                        <label className="active" for="Nombre">Nombre</label>
                      </div>

                      <div className="input-field col s6">
                        <input id="cedula" type="text" name="cedula_usuario" onChange={this.handleChange} value={this.state.cedula_usuario} className="validate"></input>
                        <label className="active" for="cedula">Cedula</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s6">
                        <input id="Telefono" type="text" name="telefono_usuario" onChange={this.handleChange} value={this.state.telefono_usuario} className="validate"></input>
                        <label classNames="active" for="Telefono">Telefono</label>
                      </div>

                      <div className="input-field col s6">
                        <input id="Email" type="email" name="email_usuario" onChange={this.handleChange} value={this.state.email_usuario} className="validate"></input>
                        <label className="active" for="Email">Email</label>
                      </div>
                    </div>
                    <div className="card-action">
                      <button className="btn blue" type="submit"> Guardar </button>
                    </div>

                  </form>
                </div>

              </div>
            </div>
            <div className="col s6">
              <table className="responsive-table centered highlight">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cedula</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Accion</th>

                  </tr>
                </thead>

                <tbody>
                  {
                    this.state.usuarios.map(usuario => {
                      return (
                        <tr key={usuario._id}>
                          <td>{usuario.nombre_usuario}</td>
                          <td>{usuario.cedula_usuario}</td>
                          <td>{usuario.telefono_usuario}</td>
                          <td>{usuario.email_usuario}</td>

                          <td>
                            <button onClick={() => this.deleteUsuario(usuario._id)} className="btn red darken-4">
eliminar                            </button>
                            <button onClick={() => this.editUsuario(usuario._id)} className="btn blue darken-4" style={{ margin: '4px' }}>
editar                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>

            </div>
          </div>

        </div>



      </div>

    )
  }
}

export default App;