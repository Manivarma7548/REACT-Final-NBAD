import React from 'react';
import Modal from 'react-modal';

const RefreshTokenModal = ({ open, onYes, onNo, onRequestClose }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={onRequestClose}
      contentLabel="Token Refresh Confirmation Modal"
      className="dashboard-modal" 
    >
      <h2>Your session is about to expire</h2>
      <p>Do you want to refresh your session?</p>
      <button onClick={onYes}>Yes</button>
      <button onClick={onNo}>No</button>
    </Modal>
  );
};

export default RefreshTokenModal;
