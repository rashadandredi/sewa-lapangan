import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from 'react-router-dom';
import Modal from "../component/Modal";
import Toast from "../component/Toast";
// import Image from '../image/rashad.jpg';


class User extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      full_name: "",
      email: "",
      role: "user",
      jenis_kelamin: "",
      tanggal_lahir: "",
      nohp: "",
      image: null,
      action: "",
      find: "",
      message: "",

      alamat: [],
      id_alm: "",
      nama_rcv: "",
      alamatt: "",
      kecamatan: "",
      kota: "user",
      kode_pos: "",
      action: "",
      find: "",
      message: "",
    }

    if (!localStorage.getItem("Token")) {

      window.location = "/login";
    }
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  bindAlamat = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }

  Edit = (item) => {
    // membuka modal
    $("#modal_profil").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_user: item.id_user,
      nama_user: item.nama_user,
      full_name: item.full_name,
      email: item.email,
      jenis_kelamin: item.jenis_kelamin,
      tanggal_lahir: item.tanggal_lahir,
      alamatt: item.alamatt,
      nohp: item.nohp,
      image: item.image,
    });
  }

  Edita = (itema) => {
    // membuka modal
    $("#modal_alamat").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_alm: itema.id_alm,
      nama_rcv: itema.nama_rcv,
      alamatt: itema.alamatt,
      kecamatan: itema.kecamatan,
      kota: itema.kota,
      kode_pos: itema.kode_pos,
    });
  }

  get_user = () => {
    // $("#loading").toast("show");
    let id = JSON.parse(localStorage.getItem('id_user'))
    let url = "http://localhost/toko_online/public/user/"+id;
    axios.get(url)
      .then(response => {
        this.setState({ user: response.data.user });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }

  get_alamat = () => {
    // $("#loading").toast("show");
    let id = JSON.parse(localStorage.getItem('id_user'))
    let url = "http://localhost/toko_online/public/alamat/"+id;
    axios.get(url)
      .then(response => {
        this.setState({ alamat: response.data.alamat });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    this.get_user();
    this.get_alamat();
  }


  Save = (event) => {
    console.log(this.state.id_user)
    event.preventDefault();
    // menampilkan proses loading
    // $("#loading").toast("show");
    // menutup form modal
    $("#modal_profil").modal("hide");
    let url = "http://localhost/toko_online/public/user/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_user", this.state.id_user);
    form.append("nama_user", this.state.nama_user);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    form.append("full_name", this.state.full_name);
    form.append("jenis_kelamin", this.state.jenis_kelamin);
    form.append("tanggal_lahir", this.state.tanggal_lahir);
    form.append("nohp", this.state.nohp);
    // form.append("image", this.state.image, this.state.image.name);
    axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });

  }

  Savea = (event) => {
    console.log(this.state.id_alm)
    let id = JSON.parse(localStorage.getItem('id_user'))
    event.preventDefault();
    // menampilkan proses loading
    // $("#loading").toast("show");
    // menutup form modal
    $("#modal_alamat").modal("hide");
    let url = "http://localhost/toko_online/public/alamat/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_alm", this.state.id_alm);
    form.append("nama_rcv", this.state.nama_rcv);
    form.append("alamatt", this.state.alamatt);
    form.append("kecamatan", this.state.kecamatan);
    form.append("kota", this.state.kota);
    form.append("kode_pos", this.state.kode_pos);
    axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_alamat();
      })
      .catch(error => {
        console.log(error);
      });

  }

  search = (event) => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost/toko_online/public/user";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ user: response.data.user });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const {user, alamat } = this.state;

    return (
      <div className="container">
          <div style={{ paddingTop: "4%" }}>
            <div className="#" style={{ maxwidth: "200px" }}>
              <div className="row no-gutters">

              {this.state.user.map((item,index) => {
              return(
                <div className="col-md-4">
                  <img src={'http://localhost/toko_online/public/images/' + item.image}
                         alt={item.image} style={{ height: "240px", width: "200px" }} />
                </div>
              );
            })}

                <div className="col-md-8">
                  <div className="card-body">
                  <h4 className="card-title" style={{ fontWeight: "900" }}>Data Diri</h4>
                    <table class="table table-borderless">
                      {this.state.user.map((item,index) =>
                      {
                        return(
                        <ul class="list-group">
                          <li class="list-group-item">Nama : {item.full_name}</li>
                          <li class="list-group-item">Email : {item.email}</li>
                          <li class="list-group-item">Tanggal Lahir : {item.tanggal_lahir}</li>
                          <li class="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
                          <li class="list-group-item">No HP : {item.nohp}</li>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                              <span className="fa fa-edit"></span>
                          </button>
                        </ul>
                        );
                      })}

                    </table>

                    <table class="table table-borderless">
                    <h4 className="card-title" style={{ fontWeight: "900" }}>Data Pengiriman</h4>
                    {this.state.alamat.map((itema,index) =>
                    {
                      return(
                      <ul class="list-group">
                        <li class="list-group-item">Nama Penerima : {itema.nama_rcv}</li>
                        <li class="list-group-item">Alamat : {itema.alamatt}</li>
                        <li class="list-group-item">Kecamatan : {itema.kecamatan}</li>
                        <li class="list-group-item">Kota : {itema.kota}</li>
                        <li class="list-group-item">Kode Pos : {itema.kode_pos}</li>
                        <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edita(itema)}>
                            <span className="fa fa-edit"></span>
                        </button>
                      </ul>
                      );
                    })}

                    </table>





                    <Modal id="modal_profil" title="Edit Profil" bg_header="success"
                    text_header="white">
                        <form onSubmit={this.Save}>
              Nama Lengkap
              <input type="text" className="form-control" name="full_name" value={this.state.full_name}
                onChange={this.bind} required />
              Email
              <input type="text" className="form-control" name="email"
                value={this.state.email} onChange={this.bind} required />
              Tanggal Lahir
              <input type="date" className="form-control" name="tanggal_lahir"
                value={this.state.tanggal_lahir} onChange={this.bind} required />

              <div class="form-group">
              <label for="jenis_kelamin">Jenis Kelamin</label>
              <select class="form-control" name="jenis_kelamin" value={this.state.value} onChange={this.bind} required>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
              </select>
              </div>

              Nomor HP
              <input type="text" className="form-control" name="nohp" value={this.state.nohp}
                onChange={this.bind} required />

              <p></p>

              Gambar
              <input type="file" className="file-control" name="image" value={this.state.image}
                onChange={this.bindImage} />

              <button type="submit" className="btn btn-info pull-right m-2">
                <span className="fa fa-edit"></span> Simpan
              </button>
            </form>


                    </Modal>

                    <Modal id="modal_alamat" title="Edit Alamat" bg_header="success"
                    text_header="white">
                        <form onSubmit={this.Savea}>
              Nama Penerima
              <input type="text" className="form-control" name="nama_rcv"
              value={this.state.nama_rcv} onChange={this.bindAlamat} required />
              Alamat
              <input type="text" className="form-control" name="alamatt"
                value={this.state.alamatt} onChange={this.bindAlamat} required />
              Kecamatan
              <input type="text" className="form-control" name="kecamatan"
                value={this.state.kecamatan} onChange={this.bindAlamat} required />
              Kota
              <input type="text" className="form-control" name="kota"
                value={this.state.kota} onChange={this.bindAlamat} required />
              Kode Pos
              <input type="text" className="form-control" name="kode_pos"
                value={this.state.kode_pos} onChange={this.bindAlamat} required />

              <button type="submit" className="btn btn-info pull-right m-2">
                <span className="fa fa-edit"></span> Simpan
              </button>
            </form>
                    </Modal>

                    {/* <button type="#" className="btn btn-outline-info pull-left m-2">
                      <span className="fa fa-edit"></span> Edit
                      </button> */}

                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>
    );
  }

}
export default User;
