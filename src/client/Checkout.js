import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carts: [],
//       id_order: [],
//       id_user: "",
//       id_alm: "",
      num : 0,
      total: 0,
      data_pengiriman: [],
            id_alm: "",
            nama_rcv: "",
            alamat: "",
            kecamatan: "",
            kota: "",
            kode_pos: "",
            message: "",
            action: "",
            find: "",
            message: "",

    }
  }

bind = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

get_products = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let total = 0
    let num = 0
    items.forEach(item => {
      total += item.total
      num += item.stock
    });
    this.setState({
      carts: items,
      num: num,
      total: total
    });
  }

get_alamat = async() => {
    const id = localStorage.getItem('id_user')
    const url = "http://localhost/toko_online/public/alamat/" +id;
    await axios.get(url)
        .then(res => {
            this.setState({id_user: id, alamat: res.data.alamat,data_pengiriman:res.data.alamat})
        })
        .catch(error => {
            console.log(error)
        })
  }

Order = (e) => {
    e.preventDefault()  
    let url = "http://localhost/toko_online/public/orders/save"
    let form = new FormData()
    form.append("id_user", this.state.id_user)
    form.append("id_alm", this.state.id_alm)
    form.append("total", this.state.total)
    form.append("products", JSON.stringify(this.state.products))

    axios.post(url, form)
         .then(res => {
            alert("Order Berhasil")
            this.setState({message: res.data.message})
            localStorage.removeItem('cart')
          })
          .catch(error => {
                console.log(error);
          })  
  }


componentDidMount = () => {
  this.get_products();
  this.get_alamat();
}


    render() {
          const { carts, num, total, data_pengiriman } =  this.state;
      console.log(data_pengiriman)
        return(
            <div className="container">
        <div className="py-5 text-center">

          <h2>Checkout</h2>

        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">{num}</span>
            </h4>

            <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sub Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
            <tbody>
          {carts.map((product, index) =>
              <tr key={index}>
                <td>
                  <h4 className="text-capitalize font-weight-bold">{product.name}</h4>
                  <h6 className="card-text"><small>price: </small>Rp{product.price}</h6>
                </td>
                <td>
                  <h5><span className="badge badge-secondary">{product.stock}</span></h5>
                </td>
                <td>
                  <h5>
                  <span className="badge badge-secondary">Rp. {product.total}</span>
                  </h5>
                </td>
                <td>
                <button className="btn btn-sm btn-warning"
                  onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span> Remove</button>
                </td>
              </tr>
            )
          }
          </tbody>
          </table>

          </div>

          {this.state.data_pengiriman.map((item) => {
            return(
          <div className="col-md-8 order-md-1">

            <div className="container">
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label htmlFor="country">Alamat</label>
                  <select className="custom-select d-block w-100" id="country" required>
                    <option value>Choose...</option>
                    <option>{item.alamatt}</option>
                  </select>
                  <br/>

                  <Link to="/confirm">
                      <button className="btn btn-primary btn-md" type="submit">
                          <span className="fa fa-check"></span> Continue to checkout
                      </button>
                  </Link>
                </div>
              </div>
              </div>

          </div>
          );
        })}
        </div>


      </div>
        );
    }
}

export default Checkout;
