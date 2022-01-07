import { createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import { Input2 } from "../Input";
import { FormHandles } from "@unform/core";
import { FoodProps } from "../../pages/Dashboard";

interface EditFoodModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingFood: FoodProps;
  handleUpdateFood: (food: Omit<FoodProps, "id" | "available">) => void;
}

export function EditFoodModal({
  isOpen,
  onRequestClose,
  editingFood,
  handleUpdateFood,
}: EditFoodModalProps) {
  const formRef = createRef<FormHandles>();
  const handleSubmit = (data: any) => {
    handleUpdateFood(data);
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input2 name="image" placeholder="Cole o link aqui" />

        <Input2 name="name" placeholder="Ex: Moda Italiana" />
        <Input2 name="price" placeholder="Ex: 19.90" />

        <Input2 name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Editar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
