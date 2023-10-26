/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// CSS styles for the modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },

  modal: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },

  span:{
    height:"100px" ,
    width:"200px",
    display:"inline-flex",
    justifyContent:"center",
    alignItems:"center"
    
  }
};

function ReusableModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <span
          onClick={onClose}
          style={modalStyles.closeButton}
        >
          &#x2715;
        </span >
        <div style={modalStyles.span}>

        {children}
        </div>
      </div>
    </div>
  );
}

export default ReusableModal;
