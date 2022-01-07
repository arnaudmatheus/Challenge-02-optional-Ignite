import { Header1 } from "../../components/Header";
import api from "../../services/api";
import { FoodCard } from "../../components/Food";
import { AddFoodModal } from "../../components/ModalAddFood";
import { EditFoodModal } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useEffect, useState } from "react";

export interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export function DashboardTS() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [editModalOpenState, setEditModalOpenState] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodProps>({} as FoodProps);
  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get("/foods");
      setFoods(response.data);
    }

    loadFoods();
  }, []);

  const handleDeleteFood = async (id: number): Promise<void> => {
    await api.delete(`/foods/${id}`);
    setFoods(foods.filter((food) => food.id !== id));
  };
  function handleEditFood(food: FoodProps): void {
    setEditModalOpenState(true);
    setSelectedFood(food);
  }
  function toogleModal() {
    setModalOpenState(!modalOpenState);
    console.log("modalOpenState", modalOpenState);
  }
  function toogleEditModal() {
    setEditModalOpenState(!editModalOpenState);
  }
  async function handleAddFood(
    food: Omit<FoodProps, "id" | "available">
  ): Promise<void> {
    const response = await api.post("/foods", {
      ...food,
      available: true,
    });
    setFoods([...foods, response.data]);
  }

  async function handleUpdateFood(
    food: Omit<FoodProps, "id" | "available">
  ): Promise<void> {
    const response = await api.put(`/foods/${selectedFood.id}`, {
      ...food,
      available: true,
    });
    const newFoods = foods.map((f) =>
      f.id === selectedFood.id ? response.data : f
    );
    setFoods(newFoods);
  }
  return (
    <>
      <Header1 openModal={toogleModal} />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
      <AddFoodModal
        isOpen={modalOpenState}
        onRequestClose={toogleModal}
        handleAddFood={handleAddFood}
      />
      <EditFoodModal
        isOpen={editModalOpenState}
        onRequestClose={toogleEditModal}
        editingFood={selectedFood}
        handleUpdateFood={handleUpdateFood}
      />
    </>
  );
}
