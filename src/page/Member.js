import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Member extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
      action: "",
      find: "",
      message: ""
    }
  }

    // jika tidak terdapat data token pada local storage
  //   if(!localStorage.getItem("Token")){
  //     // direct ke halaman login
  //     window.location = "/login";
  //   }
  // }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    Add = () => {
      // membuka modal
      $("#modal_users").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id: "",
        username:"",
        email: "",
        password: "",
        role: "",
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_users").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        username: item.username,
        email: item.email,
        password: item.password,
        role: item.role,
        });
    }

    get_users = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/member";
      axios.get(url)
      .then(response => {
        this.setState({users: response.data.users});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_users();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_users();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_users").modal("hide");
      let url = "http://localhost/lapangan/public/member/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_users();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({users: response.data.users});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <div className="container">
          <div className="mt-4">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h4 className="#" style={{fontWeight:"600", textAlign:"center", fontSize:"35px"}} >Data Member</h4>
                </div>
              </div>
              <div className="col-sm-3">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              {/* <Toast id="loading" autohide="false" title="Informasi"> */}
                {/* <span className="fa fa-spin fa-spinner"></span> Sedang Memuat */}
              {/* </Toast> */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.users.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.role}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}

              <button className="btn btn-success my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data Member
              </button>


              {/* form modal siswa*/}
              <Modal id="modal_users" title="Form Member" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                Nama
                  <input type="text" className="form-control" name="username"
                    value={this.state.username} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email"
                    value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="text" className="form-control" name="password"
                    value={this.state.password} onChange={this.bind} required />
                  Role
                  <input type="text" className="form-control" name="role"
                    value={this.state.role} onChange={this.bind} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
}
export default Member;
