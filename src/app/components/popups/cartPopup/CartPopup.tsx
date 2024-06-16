import React from 'react'
import Modal from '../../common/modal/Moadal'
import './cartPopupStyles.scss';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
    title: string;
    handleClose: () => void;
}

const CartPopup = (props:Props) => {

    const { title, handleClose } = props;

    const isAlredyInCartOpen = useSelector((state:RootState) => state.cart.isCartNotificationOpen);
    const router = useRouter();

    const handleModalClose = () => {
        handleClose();
    }

    const handleGoToCart = () => {
        router.push('/cart');
    }

  return (
    <div>
        { isAlredyInCartOpen ? '' : <Modal close={handleModalClose}>
            <div className='cart-modal'>
                    <p className="cart-modal-header">Dodano do koszyka</p>
                    <p className="cart-modal-body">
                        Dodano do koszyka { title }
                    </p>
                    <div className="cart-modal-actions">
                    <div className="cart-modal-actions-buttons" >
                        <div onClick={handleGoToCart} className="cart-modal-actions-button">
                                Przejdź do koszyka
                            </div>
                            <div onClick={handleModalClose} className="cart-modal-actions-button">
                                Kontynuj Zakupy
                            </div>
                        </div>
                    </div>
            </div>
        </Modal> }
    </div>
    )
}

export default CartPopup