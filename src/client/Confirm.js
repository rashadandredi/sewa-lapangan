import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Confirm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        orders: [],
        id_order: "",
        id_alm: "",
        id_user: "",
        total: "",
        bukti_bayar: "",
        alamat: [],
        kota:"",
        kecamatan:"",
        kodepos:"",
        alamatt:"",
        status: "",
        image: null,
        action: "",
        find: "",
        message: ""
      }
    }

bind = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

bindImage = (e) => {
     this.setState({image: e.target.files[0]})
  }

getOrders = async() => {
    const id = localStorage.getItem('Id')
    const url = "http://localhost/toko_online/public/myorder/" +id
    await axios.get(url)
        .then(res => {
            this.setState({orders: res.data.orders})
        })
        .catch(error => {
            console.log(error)
        })
  }

Pay = (id) => {
    $("#modal_payment").modal("show")
    this.setState({id_order: id})
  }

Save = (e) => {
    if(window.confirm("Apakah bukti bayar yang anda upload telah benar?")){
    
    e.preventDefault()
    $("#modal_payment").modal("hide")
    let url = "http://localhost/toko_online/public/orders/pay"
    let form = new FormData()
    form.append("id_order", this.state.id_order)
    form.append("image", this.state.image)

    axios.post(url, form)
         .then(res => {
            alert("Pembayaran Berhasil")
            this.setState({message: res.data.message})
            window.location="/home"
          })
          .catch(error => {
                console.log(error);
          })
    }
  }

Cancel = (id) => {
    if(window.confirm("Apakah anda yakin membatalkan order ini?")){
        let url = "http://localhost/toko_online/public/decline/" + id
        axios.post(url)
        .then(res => {
          alert("Pesanan anda telah dibatalkan")
          this.setState({message: res.data.message})
          this.getOrders()
        })
        .catch(error => {
            console.log(error)
        })
    }
}

componentDidMount = () => {
    this.getOrders();
  }


    render() {
          const { orders } =  this.state;
        return(
          <div className="container">
            <div>
            <div style={{ paddingTop: "1%" }}>
              <div className="#" style={{}}>

                  <div className="">
                  { !orders.length ?
                    <h5 className="text-center text-info"><br/> Tidak ada transaksi yang perlu diselesaikan.<br/></h5>
                  :
                  <div className="">
                      { this.state.order.map((item) => {
                      return(
                        <div className="card shadow" style={{marginTop: "2%", marginBottom: "4%"}} key={item.id_order}>
                          <div>
                          <h4 className="card-header text-center text-dark" style={{ fontWeight: "700" }}>Confirm Order</h4>
                          </div>
                        <div className="card-body card-1">
                    <p className="text-dark text-center ">Terima kasih atas pesanan anda, silahkan melakukan pembayaran </p>
                    <p className="text-dark text-center ">Jika dalam 24 jam anda belum mengupload bukti pembayaran, maka kami anggap order pembelian anda dibatalkan</p>
                      <td className="list-group-item text-center card-header" style={{ fontWeight: "700" }}>Total Bayar: Rp. {item.total}</td>
                        <div className="row">
                          <div className="card col-md-6" style={{marginLeft: "2%"}}>
                          <table className="table table-borderless">

                              </table>
                        <table className="table ">
                          <tbody>
                        <tr className="list-group list-group-flush">
                       <p className="text-center" style={{ fontWeight: "700" }}> Detail </p>
                          <td className="list-group-item" style={{ fontWeight: "700" }}>Alamat:<br/>
                          {item.alamatt}<br/>{item.kecamatan},{item.kota}<br/>Kode Pos : {item.kode_pos}</td>
                          <td className="list-group-item">
                          <ul className="" >
                             Pesanan
                          {item.detail.map((it) => {
                              return(

                                <li className="" key={it.id_order}>{it.nama_product} <span className="badge badge-light badge-pill">{it.quantity}</span></li>

                              )
                          })}
                          </ul>
                          </td>
                        </tr>

                        </tbody>
                        </table>
                        <button type='button' className="btn btn-danger" onClick={() => this.Cancel(item.id_order)}>Batal</button>
                        </div>
                        <div className="card col-md-5" style={{marginLeft: "2%"}}>
                            <div className="card-body">
                              <p className="text-center" style={{ fontWeight: "700" }}> Cara Pembayaran</p>
                              <p className="card-text">
                                Silahkan transfer sejumlah: Rp. {item.total}, ke rekening di bawah ini.<br/>
                                Nomor Rekening: 111100010101
                                BANK PERMATA<br/>
                                Atas Nama: RUET<br/>
                              </p>


                          </div>
                            <button type='button' className="btn btn-success" onClick={() => this.Pay(item.id_order)}>Bayar</button>
                        </div>
                        </div>

                        </div>
                        </div>
                        );
                      })}
                       </div>
               }

                </div>
              </div>
            </div>
            </div>

            <Modal id="modal_payment" title="Upload Bukti Pembayaran" bg_header="info" text_header="white">
          <form onSubmit={this.Save}>
            Bukti Bayar <br/>
            <input type="file" className="form-control" name="image" onChange={this.bindImage} />
            <button type="submit" className="btn btn-info pull-right m-2">
              <span className="fa fa-check"></span> Konfirmasi
            </button>
          </form>
  </Modal>

          </div>

        );
    }
}

export default Confirm;
