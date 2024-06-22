import React from 'react'
import '../cartPopup/cartPopupStyles.scss';
import Modal from '../../common/modal/Moadal';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';

interface Props {
    handleClose: () => void;
}

const AddedIntoAccountPopUp = (props:Props) => {
    const { handleClose } = props;
    const router = useRouter();

    const handleModalClose = () => {
        handleClose();
    }

    const handleGoToCart = () => {
        router.push('/user');
    }

  return  <Modal close={handleModalClose}>
  <div className='cart-modal'>
          <p className="cart-modal-header">Produkt dodano na konto</p>
          <div className="cart-modal-actions">
          <div className="cart-modal-actions-buttons" >
              <div onClick={handleGoToCart} className="cart-modal-actions-button">
                      Przejdź do konta
                  </div>
                  <div onClick={handleModalClose} className="cart-modal-actions-button">
                      Kontynuj Zakupy
                  </div>
              </div>
          </div>
  </div>
</Modal>
}

export default AddedIntoAccountPopUp