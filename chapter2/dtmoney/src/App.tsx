import { useState } from "react";
import { Dashboard } from "./compontents/Dashboard";
import { Header } from "./compontents/Header";
import Modal from "react-modal";
import { NewTransactionModal } from "./compontents/NewTransactionModal";
import { GlobalStyle } from "./style/global";
import { TransactionProvider } from "./hooks/useTransactionsContext";
export function App() {
  Modal.setAppElement("#root"); //accebility to Modal

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}
