import React from 'react'
import Modal from '../../common/modal/Moadal'
import './cartPopupStyles.scss';
import { useRouter } from 'next/navigation';

interface Props {
    title: string;
    handleClose: () => void;
}

const CartPopup = (props:Props) => {

    const { title, handleClose } = props;

    const router = useRouter();

    const handleModalClose = () => {
        console.log('close');
        handleClose();
    }

    const handleGoToCart = () => {
        console.log('go to cart');
        router.push('/cart');
    }

  return (
    <Modal close={handleModalClose}>
        <div className='cart-modal'>
                <p className="cart-modal-header">Dodano do koszyka!</p>
                <p className="cart-modal-body">
                Dodales do koszyka webinar: { title }
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
    </Modal>
    )
}

export default CartPopup