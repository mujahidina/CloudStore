// src/components/SubscriptionBell.js
import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import SubscribeModal from './SubscribeModal';
import './SubscriptionBell.css';

const SubscriptionBell = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="subscription-bell-container top-0">
      <div className="subscription-bell " onClick={openModal}>
        <FaBell size={20} className="mr-4" />
        
      </div>
      <SubscribeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SubscriptionBell;
