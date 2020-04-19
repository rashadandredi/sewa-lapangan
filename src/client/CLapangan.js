import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slide1 from '../image/lapbadminton1.png';
import Slide2 from '../image/lapbadminton2.jpg';
import LapanganItem from './LapanganItem';

export default class CLapangan extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            lapangan: [],
            find: "",
            filter:""
        }
    }
		bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
}
   GetLapangan = () => {
	    	let url = "http://localhost/lapangan/public/lapangan"
	    	axios.get(url)
	    	.then(res => {
	    			this.setState({lapangan: res.data.lapangan})
	    	})
	    	.catch(error => {
	    			console.log(error)
	    	})
    }

	// 	Search = (e) => {
    //      if (e.keyCode === 13) {
    //          let url = "http://localhost/onlen/public/products"
    //          let form = new FormData()
    //          form.append("find", this.state.find)
    //          axios.post(url, form)
    //              .then(res => {
    //                  this.setState({products: res.data.products})
    //              })
    //              .catch(error => {
    //                  console.log(error);
    //              })
    //      }
    //  }

		 componentDidMount() {
        this.GetLapangan()
    }



	render() {
		const renderData = this.state.lapangan.map((item, id)=>{
			return (
				<LapanganItem item={item} key={id}/>
			)
		})
		return (
			<div className=" container ">
			<div className="row">
									<div className="col-lg-3">
											<h1 className="my-4">Persewaan Lapangan</h1>
													<input type="text" className="form-control" name="find" value={this.state.find} onChange={this.bind} onKeyUp={this.Search} required placeholder="Pencarian.." />
													<hr></hr>
													<h4>Panduan Memesan Lapangan</h4>
													<p>1. Buka Website Ini
													  <br/> 2. Pilih Lapangan yang hendak dipesan
													  <br/> 3.Lakukan Pembayaran
													</p>

													{/* <h4>Category</h4>
													<form onSubmit={this.Filter}>
															<div className="form-group">
																	<select className="form-control" name="filter" value={this.state.value} onChange={this.bind} >
																			<option value="">Choose...</option>
																			<option value="locks">Locks</option>
																			<option value="iotm">IOTM</option>
																	</select>
															</div>
															<button type="submit" className="btn btn-info pull-right m-2"> Filter
															</button>
													</form> */}
									</div>
									<div className="col-lg-9">
											<div id="slideshow" className="carousel slide my-4" data-ride="carousel">
													<ol className="carousel-indicators">
															<li data-target="#slideshow" data-slide-to="0" className="active"></li>
															<li data-target="#slideshow" data-slide-to="1"></li>
													</ol>
													<div className="carousel-inner" role="listbox">
															<div className="carousel-item active">
																	<img className="d-block img-fluid" src={Slide1} alt="First slide" />
															</div>
															<div className="carousel-item">
																	<img className="d-block img-fluid" src={Slide2} alt="Second slide" />
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
											</div>
									</div>
							</div>
</div>
		);
	}
}
