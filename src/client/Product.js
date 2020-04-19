import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from 'react-router-dom';
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import ProductItem from './ProductItem';
import Slide1 from '../image/Slide1.png';
import Slide2 from '../image/Slide2.png';

export class Product extends React.Component
{
  constructor(props){
        super(props);
        this.state = {
            products: [],
            find: "",
            filter:""
        }
    }

    bind = (event) => {
            this.setState({[event.target.name]: event.target.value});
    }
    get_products = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/products";
        axios.get(url)
        .then(response => {
            this.setState({products: response.data.products});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
        //let img = "http://localhost/toko_online/public/images/"+image;
    }

    componentDidMount = () => {
      this.get_products();

    }

    search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/products";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({products: response.data.products});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
      const renderData = this.state.products.map((item, id)=>{
return (
<ProductItem item={item} key={id}/>
   )
})
return (
<div className=" container">
<div className="row">
                <div className="col-lg-3">
                    <h1 className="my-4">Shopping Shopping</h1>
                    <input type="text" className="form-control" name="find"
                        onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                        placeholder="Pencarian..." /><hr></hr>
                        <h4>Kategori</h4>
                        <form onSubmit={this.Filter}>
                            <div className="form-group">
                                <select className="form-control" name="filter" value={this.state.value} onChange={this.bind} >
                                    <option value="">Choose...</option>
                                    <option value="sepatu">Sepatu</option>
                                    <option value="topi">Topi</option>
                                    <option value="kaos">Kaos</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-info pull-right m-2">
                                Filter
                            </button>
                        </form>
                </div>
                <div className="col-lg-9">
                    <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                            <li data-target="#slideshow" data-slide-to="1"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                                                    <div className="carousel-item active">
                                                        <img className="d-block img-fluid" src={Slide1} alt="First slide" />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img className="d-block img-fluid" src={Slide2} alt="Second slide" />
                                                    </div>
                                                </div>
                        <a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <div className="row">
                    {renderData}
                        <hr></hr>
                        <Link to="/checkout">
                            <button className="btn btn-success float-right">
                                <span className="fa fa-check"></span> Checkout
                            </button>
                        </Link>
                        <Link to="/cart">
                            <button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>
                                <span className="fa fa-cart-plus"></span> View Cart
                            </button>
                        </Link><br/><br/><br/>
                    </div>
                </div>
            </div>

</div>

);
}
}

export default Product
