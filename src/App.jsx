import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Logo from "./components/Logo/Logo";
import JournalList from "./components/JournalList/JournalList";
import JournalAdd from "./components/JournalAdd/JournalAdd";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context.jsx";
import { useState } from "react";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState(null);

  const renderNote = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (item.id === i.id) {
            return { ...item };
          } else {
            return i;
          }
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setItems([...mapItems(items).filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Logo></Logo>
          <JournalAdd clearForm={() => setSelectedItem(null)}></JournalAdd>
          <JournalList items={mapItems(items)} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm
            renderNote={renderNote}
            data={selectedItem}
            onDelete={deleteItem}
          ></JournalForm>
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
