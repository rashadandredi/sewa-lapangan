import React, {Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import Avatar from '../image/Avatar.png';
import App from '../App.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
       super();
       this.state = {
           username: "",
           password: "",
           message: "",
       }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/lapangan/public/login";
        let form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            let role = response.data.role;
            if (logged) {

              if(role === "admin"){
                window.location = "/Products";
              }else{
                window.location = "/";
              }
                this.setState({message: "Login Berhasil"});
                //menyimpan data token pada local storage
                localStorage.setItem("Token", response.data.token);
                //menyimpan data login user ke local storage
                localStorage.setItem("id", JSON.stringify(response.data.users.id));
                //direct ke halaman data siswa
                localStorage.setItem("role", response.data.users.role)
            } else {
                this.setState({message: "Login Gagal"});
            }
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return (
          <div className="container" style={{width:"50%"}}>
                        <div className="card my-2">

                            <div className="card-header bg-success">
                                <h5 className="text-white">Login</h5>
                            </div>
                            <div className="card-body">
                                <Toast id="message" autohide="false" title="Informasi">
                                    {this.state.message}
                                </Toast>
                                <form onSubmit={this.Login}>

                                    <input type="text" className="form-control m-1" name="username" value={this.state.username} onChange={this.bind} required placeholder="Masukkan username" />
                                    <input type="password" className="form-control m-1" name="password" value={this.state.password} onChange={this.bind} required placeholder="Masukkan Password"/>
                                    <button className="mt-2 btn btn-block btn-info" type="submit">
                                        <span className="fa fa-sign-in"></span>Login
                                    </button>
                                </form>
                                <div>
                                <p></p>
                                Belum punya akun?
                                <Link to="/Register">
                                <button className="mt-2 btn btn-block btn-secondary" type="submit">
                                <span className=""></span>Buat Akun Baru
                                </button>
                                </Link>
                                </div>
                            </div>


                        </div>
                    </div>
        );
    }
}
export default Login;
