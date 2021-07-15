import { useState } from "react";
import { Dashboard } from "./compontents/Dashboard";
import { Header } from "./compontents/Header";
import Modal from 'react-modal';
import { NewTransactionModal } from "./compontents/NewTransactionModal";
import { GlobalStyle } from "./style/global";
export function App() {
  Modal.setAppElement('#root'); //accebility to Modal

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}
