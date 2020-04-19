import React from 'react';
import Lapangan from '../image/lapbadminton1.png';

export default class LapanganItem extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
        }
    }
    bind = (e) => {
          this.setState({[e.target.name]: e.target.value})
      }

    //   addToCart = (item) => {
    //         let oldItems = JSON.parse(localStorage.getItem('cart')) || []
    //         let newid = item.id
    //         let match = oldItems.find(({ id }) => id === newid);
    //         if (match)
    //         {
    //                 match['stock'] += parseInt(this.state.stock);
    //                 match['total'] = match['total'] + (item.price * parseInt(this.state.stock));
    //         }
    //         else
    //         {
    //             let newItem = {
    //                 'id': item.id,
    //                 'name': item.name,
    //                 'price': item.price,
    //                 'stock': parseInt(this.state.stock),
    //                 'total': item.price * parseInt(this.state.stock)
    //             };
    //             oldItems.push(newItem);
    //         }
    //         localStorage.setItem('cart', JSON.stringify(oldItems));
    //       }

          render(){
            const { item } = this.props;
            return (
                <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100" style={{ marginBottom: "10px"}}>
                    <a href="#"><img className="card-img-top" src={Lapangan} alt="" /></a>
                        <div className="card-body">
                            <h4 className="card-title">
                                <a href="#">{item.nama}</a>
                            </h4>
                            <h5>Rp. {item.harga}</h5>
                            <h5><span className="fa fa-map-marker"></span> Gribig</h5>
                            <h5><span className="fa fa-phone"></span> 0898-7654-3210</h5>
                            <span className="card-text">
                                <h5>Tersedia: 4 Lapangan</h5>
                            </span>
                            <br/>
                            <button className="btn btn-block btn-success">
																	<span className="fa fa-check"></span> Pesan
															</button>
                    </div>

                </div>
                </div>
           )
        }
}
// 'http://localhost/lapangan/public/images/' + item.   image
