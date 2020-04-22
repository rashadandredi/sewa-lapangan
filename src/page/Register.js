import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      username: "",
      email: "",
      pssword: "",
      repassword: "",
      role: "member",
      action: "insert",
      find: "",
      message: ""
    }
}

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");

      if (this.state.password === this.state.repassword)
      {
      let url = "http://localhost/lapangan/public/users/save";
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
        window.location="/Login"
      })
      .catch(error => {
        console.log(error);
      });
    }else{
      this.setState({message: "Password Tidak Cocok"});
    }
}



    render(){
      return(
        <div className="background">
        <div className="container">
        <div className="col-md-6 mt-5 mx-auto">
            <h5 className="h3 mb-3 font-weight-normal">Registrasi Disini</h5>
            <form onSubmit={this.Save}>
            <div className="form-group">
                <label htmlFor="username">Name</label>
                <input type="text" className="form-control" name="username" placeholder="Enter Name"
                value ={this.state.username}
                onChange={this.bind}
                 />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" placeholder="Enter Email"
                value ={this.state.email}
                onChange={this.bind}
                 />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter Password"
                value ={this.state.password}
                onChange={this.bind}
                 />
            </div>

            <div className="form-group">
                <label htmlFor="password-repeat">Repeat Password</label>
                <input type="password" className="form-control" name="repassword" placeholder="Repeat Password"
                value ={this.state.repassword}
                onChange={this.bind}
                 />
            </div>

            <p>By creating an account you agree to our <a href="tp.html">Terms & Privacy</a>.</p>

            <div className="col-md-13 mb-6">
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                           Register
                </button>
            </div>

              </form>
              </div>
        </div>
        </div>
      );
    }



}
export default Register;
