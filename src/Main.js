import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//load navbar
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
//load halaman
import CLapangan from "./client/CLapangan";
import Cart from "./client/Cart";
import Profil from "./client/Profil";
import Lapangan from "./page/Lapangan";
import Field from "./page/Field";
import Member from "./page/Member";
import Register from "./page/Register";
import Login from "./page/Login";
import User from "./page/User";
import Checkout from "./client/Checkout";
import Confirm from "./client/Confirm";



class Main extends Component {
    render = () => {
        return(
           <Switch>
               {/* load component tiap halaman */}

               <Route path="/clapangan">
               <Navbar />
               <CLapangan />
               </Route>

                 <Route path="/lapangan">
                 <Navbar />
                 <Lapangan />
                 </Route>

                 <Route path="/field">
                 <Navbar />
                 <Field />
                 </Route>

                 <Route path="/member">
                 <Navbar />
                 <Member />
                 </Route>

                 <Route path="/user">
                 <Navbar />
                 <User />
                 </Route>

                 <Route path="/profil">
                  <Navbar />
                  <Profil />
                  </Route>

                 <Route path="/cart">
                 <Navbar />
                 <Cart />
                 </Route>

                 <Route path="/register">
                 <Register />
                 </Route>

                 <Route path="/login">
                 <Login />
                 </Route>


                 <Route path="/checkout">
                 <Navbar />
                 <Checkout />
                 </Route>

                 <Route path="/confirm">
                 <Confirm />
                 </Route>

               </Switch>
        );
    }
}
export default Main;
