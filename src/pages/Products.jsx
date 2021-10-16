import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import ProductContent from '../components/ProductContent';
import Payment from '../components/Payment';
import Loader from '../components/Loader';
import { Modal, ModalBody } from 'reactstrap';
import BackspaceIcon from '@material-ui/icons/Backspace';
import LoopIcon from '@material-ui/icons/Loop';
import { getSaleProducts, getProductsByStatus, updateState, updateSetCounts, deleteItem } from '../redux/action/productAction';

const Products = (props) => {

    const [soum, setSoum] = useState("0")
    const [result, setResult] = useState("")

    useEffect(() => {
        props.getSaleProducts();
        props.getProductsByStatus();
    }, [])

    if (soum === "") {
        setSoum('0')
    }


    const changeValue = (e) => {
        setSoum(
            currentValue =>
                currentValue === "0" && e.target.value === "." ?
                    currentValue + e.target.value :
                    currentValue === "0" ? e.target.value :
                        currentValue + e.target.value
        )
    }

    const backspace = () => {
        setSoum(soum.slice(0, -1))
    }

    const calculate = () => {
        setResult(parseFloat(
            parseFloat(soum) - parseFloat(props.totalPrice)
        ).toFixed(2))
        console.log(result)
    }

    const closeCalculator = () => {
        setResult("")
        setSoum("0")
        props.updateState({ isCalculate: false })
    }

    return (




        <div className={`product-manager`}>
            <Navbar />

            <div className="info-box d-flex">
                <div className="left-box">
                    <ProductContent />
                    <div className="popup-wrap">
                        <Payment />

                        <Modal isOpen={props.isCalculate}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <button
                                className="d-block ml-auto btn btn-outline-secondary m-1"
                                onClick={closeCalculator}
                            >
                                &times;
                            </button>
                            <ModalBody>
                                <div className="text-end calculator w-100">
                                    {
                                        result === "" ?
                                            <>
                                                <span>Оплата наличными</span>
                                                <input type="text" disabled className="form-control bg-transparent" value={props.totalPrice} />
                                                <span>сумма списания</span>
                                                <input type="text" disabled className="form-control bg-transparent" value={soum} />
                                            </> :
                                            <>
                                                <span>Qaytim</span>
                                                <input type="text" disabled className="form-control bg-transparent text-danger" value={result} />
                                            </>
                                    }
                                    <div className="row row-buttons ">
                                        {
                                            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(item => {
                                                return (
                                                    <div
                                                        className="col-4 text-center font-weight-bold">
                                                        <button
                                                            value={item}
                                                            onClick={changeValue}
                                                            className="btn p-4 my-1 w-100 border font-weight-bold"
                                                        >
                                                            {item}
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="col-4 text-center font-weight-bold ">
                                            <button value={"."}
                                                onClick={changeValue}
                                                className="btn p-4 my-1 w-100 border font-weight-bold"
                                                disabled={soum.indexOf(".") > -1 && true}
                                            >.</button>
                                        </div>
                                        <div className="col-4 text-center">
                                            <button
                                                onClick={backspace}
                                                className="btn p-4 my-1 w-100 border">
                                                <BackspaceIcon />
                                            </button>
                                        </div>
                                        <div className="col-4 text-center p-1 "><div className="p-3 border bg-primary text-white" onClick={calculate}>Оплатить</div></div>
                                        <div className="col-4 text-center p-1"> <div className="p-3 border"><LoopIcon /></div></div>
                                        <div className="col-4 text-center p-1">
                                            <div className="p-3 border bg-danger text-white" onClick={() => setSoum('')}> C </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>


                <div className="right-box border-left">

                    <div className="info-wrap">
                        <table className="table text-center  table-striped table-hover table-borderless">
                            <tbody>
                                <tr className="bg-white">
                                    <th className="text-center">№</th>

                                    <th className="text-center">Nomi</th>
                                    <th className="text-center">Soni</th>
                                    <th className="text-center">Narxi</th>

                                    <th className="text-center">O'chirish</th>
                                </tr>
                                {
                                    props.productInfos === null ?
                                        <Loader /> :
                                        props.productInfos.map((info, index) =>
                                            <tr key={info.id} className={`bg-white`}>

                                                <td>{index + 1}</td>

                                                <td style={{ width: '25%' }}>{info.product_name}</td>

                                                <td style={{ width: "30%" }}>
                                                    <div className="count-group d-flex justify-content-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => info.quantity > 1 && props.updateSetCounts(info.quantity - 1, info)}
                                                        >-</button>
                                                        <input
                                                            className="text-center"
                                                            key={info.id}
                                                            type="number"
                                                            onChange={(e) => props.updateSetCounts(e.target.value, info)}
                                                            value={info.quantity > 0 && info.quantity}
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => props.updateSetCounts(((+info.quantity) + (+1)), info)}
                                                        >+</button>
                                                    </div>
                                                </td>

                                                <td style={{ width: "18%" }}>{info.quantity > 0 && `${info.sold_price * info.quantity}  so'm`} </td>

                                                <td style={{ width: "15%" }}>
                                                    <button
                                                        onClick={() => props.deleteItem(info.sale_product_id)}
                                                        type="button"
                                                        className="btn btn-outline-danger mx-auto d-block px-3"
                                                    >
                                                        &times;
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="common-price w-100 d-flex justify-content-between">
                        <span className="d-inline-block">Jami narx: </span>
                        <span className="d-inline-block">{props.totalPrice} so'm</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productsPrice: state.product.productsPrice,
        productInfos: state.product.productInfos,
        isSearching: state.product.isSearching,
        selectItems: state.product.selectItems,
        selectItem: state.product.selectItem,
        isCalculate: state.product.isCalculate,
        totalPrice: state.product.totalPrice,
    }
}

export default connect(mapStateToProps, { getSaleProducts, getProductsByStatus, updateState, updateSetCounts, deleteItem })(Products);