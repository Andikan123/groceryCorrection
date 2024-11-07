import FormElement from "./FormElement";
import { nanoid } from "nanoid";
import {ToastContainer, toast} from "react-toastify"

import Items from "./Items";
import { useState } from "react";


const setLocalStorage = (items) => {
  localStorage.setItem('list', JSON.stringify(items));
};
const defaultList = JSON.parse(localStorage.getItem('list') || '[]');
console.log(defaultList)

const App = () => {
  console.log(defaultList)
  const [items, setItems] = useState(defaultList);
  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      id: nanoid(),
      completed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems)
    toast.success("item successfully added!")
  };
  const removeItem = (itemId) => {
    const newItem = items.filter((item) => item.id !== itemId);
    setItems(newItem);
    setLocalStorage(newItem)
    toast.success("item successfully removed!")
  };

  const editItem = (itemId) => {
    const newItem = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItem);
    setLocalStorage(newItem)
  };
  return (
    <section className="section-center">
      <ToastContainer/>
      <FormElement addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};

export default App;
