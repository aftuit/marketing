
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { connect } from "react-redux";
import { updateState } from '../redux/action/productAction';
const Payment = (props) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        props.updateState({isCalculate: true})
        setOpen(false)
    }
    
    const closeModal = () => setOpen(false);
    return (
      <div>
        <button type="button" style={{height: "8vh", borderRadius: "0"}} className="button btn btn-block btn-primary" onClick={() => setOpen(o => !o)}>
          Оплатить
        </button>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="card">
              <div className="card-header">
                    <button className="btn btn-outline-danger d-block ml-auto" onClick={() => setOpen(false)}>&times;</button>
                    <div className="line"></div>
              </div>
              <div className="card-body">
                  <button className="btn btn-outline-primary btn-block font-weight-bold" onClick={toggle}>Naqd pulda to'lash</button>

                  <div className="payment-types d-flex justify-content-between mt-3">
                      <button className="btn m-3 p-2">
                          <img className="w-75" src="/img/payme.png" alt="" />
                      </button>

                      <button className="btn m-1">
                          <img className="w-75" src="/img/click.png" alt="" />
                      </button>

                      <button className="btn m-1">
                          <img className="w-75" src="/img/humo.png" alt="" />
                      </button>

                      <button className="btn m-1">
                          <img className="w-75" src="/img/uzcard.png" alt="" />
                      </button>
                  </div>
              </div>
          </div>
        </Popup>
      </div>
    );
  };

const mapStateToProps = (state) => {
    return{
        isCalculate: state.product.isCalculate
    }
}

export default connect(mapStateToProps, {updateState})(Payment);


//

