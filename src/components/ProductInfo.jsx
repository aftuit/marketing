import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateState, getSaleProducts, getProductByQuantity, deleteItem } from "../redux/action/productAction";
import { Modal, ModalBody, ModalFooter } from "reactstrap"

const ProductInfo = (props) => {

    const [isOpen, setIsOpen] = useState(false)
    const [numb, setNumb] = useState(0)
    const toggle = () => setIsOpen(!isOpen)

    const getSelectedItem = (item) => {
        props.updateState({ selectedItem: item })
        toggle();
    }

    const deleteSelectedItem = () => {
        props.deleteItem();
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        props.getSaleProducts();
    }, [])



    return (
        <div className="info-wrap">

            <Modal
                toggle={toggle}
                isOpen={isOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalBody>
                    <b>Ushbu mahsulotni o'chirmoqchimisiz?</b>
                </ModalBody>
                <ModalFooter>

                    <button
                        onClick={() => deleteSelectedItem()}
                        className="btn btn-outline-danger"
                    >Ha
                    </button>

                    <button
                        onClick={toggle}
                        className="btn btn-outline-primary"
                    >Yo'q
                    </button>

                </ModalFooter>
            </Modal>

            <table className="table text-center table-striped table-hover table-borderless">
                <tr>
                    <th>№</th>
                    <th>Nomi</th>
                    <th>Soni</th>
                    <th>Narxi</th>
                    <th>Olib tashlash</th>
                </tr>
                {
                    props.products?.map(product => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                {
                                    props.productInfos.map(info =>
                                        info.id === product.quantity &&
                                        <>
                                            <td>{info.name}</td>
                                            <td>
                                                <div className="count-group d-flex justify-content-center">
                                                    <button onClick={() => setNumb(numb - 1)}>-</button>
                                                    <input 
                                                        type="number" 
                                                        placeholder="mahsulot soni" 
                                                        onChange={(e) => setNumb(e.target.value)}   
                                                        value={numb > 0 && numb} 
                                                    />
                                                    <button onClick={() => setNumb(parseInt(numb + 1))}>+</button>
                                                </div>
                                            </td>
                                            <td>{numb > 0 && info.price * numb}</td>
                                        </>
                                    )
                                }
                                <td>
                                    <button
                                        onClick={() => getSelectedItem(product.id)}
                                        type="button"
                                        className="btn btn-outline-danger ml-auto d-block "
                                    >
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            <div className="common-price d-flex justify-content-between p-3 border">
                <span className="d-block">Jami narx:</span>
                <span className="d-block">{1200.00} so'm</span>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state)
    return {
        products: state.product.products,
        productInfos: state.product.productInfos,
        selectedItem: state.product.selectedItem
    }
}

export default connect(mapStateToProps, { updateState, getSaleProducts, getProductByQuantity, deleteItem })(ProductInfo);