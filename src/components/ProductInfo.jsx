import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateState, getSaleProducts, deleteItem, updateSetCounts } from "../redux/action/productAction";
import { Modal, ModalBody, ModalFooter } from "reactstrap"

const ProductInfo = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [counts, setCounts] = useState(props.info.quantity);
    const [isDelete, setIsDelete] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const getSelectedItem = (item_id) => {
        props.updateState({ selectedItem: item_id })
        toggle();
    }


    const deleteSelectedItem = () => {
        setIsDelete(true)
        props.deleteItem();
        setIsOpen(!isOpen)
    }

    // const updateCounts = (counts) => {
    //     props.updateSetCounts(counts, props.info)
    // }

    if (counts < 1) {
        setCounts(1)
    }


    const getChecked = (checked) => {
        if(!checked){
            setIsChecked(true)
            // props.updateState({isDeleted: isChecked})
            props.updateState({selectItems: [...props.selectItems, props.info.sale_product_id]})           
            
        } else if(checked){
            setIsChecked(false)
            // props.updateState({isDeleted: isChecked})
            props.updateState({selectItems: props.selectItems.filter(selectItem => selectItem !== props.info.sale_product_id )})
        }
    }

    if(props.isDeleted){
        setIsChecked(false)
    }


    

    return (
        <>
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


          

            <tr key={props.info.id} className={`bg-white ${isDelete && ' remove'}`}>

                <td>{props.index + 1}</td>

                <td>
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => getChecked(isChecked)} 
                    />
                </td>

                <td style={{ width: '25%' }}>{props.info.product_name}</td>

                <td style={{ width: "30%" }}>
                    <div className="count-group d-flex justify-content-center">
                        <button
                            type="button"
                            onClick={() =>  props.updateSetCounts(counts - 1, props.info)}
                        >-</button>
                        <input
                            className="text-center"
                            key={props.info.id}
                            type="number"
                            onChange={(e) => setCounts(e.target.value)}
                            value={counts > 0 && counts}
                        />

                        <button
                            type="button"
                            onClick={() =>  props.updateSetCounts(((+counts) + (+1)), props.info)}
                        >+</button>
                    </div>
                </td>

                <td style={{ width: "18%" }}>{counts > 0 && `${props.info.sold_price * counts}  so'm`} </td>

                <td style={{ width: "15%" }}>
                    <button
                        onClick={() => getSelectedItem(props.info.sale_product_id)}
                        type="button"
                        className="btn btn-outline-danger mx-auto d-block px-3"
                    >
                        &times;
                    </button>
                </td>
            </tr>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedItem: state.product.selectedItem,
        productsPrice: state.product.productsPrice,
        selectedIndex: state.product.selectedIndex,
        selectItems: state.product.selectItems,
        selectItem: state.product.selectItem,
        isDeleted: state.product.isDeleted,

    }
}
export default connect(mapStateToProps, { updateState, getSaleProducts, deleteItem, updateSetCounts })(ProductInfo);