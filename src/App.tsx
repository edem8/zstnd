import { create } from "zustand";
import "./App.css";
import { Button } from "./components/ui/button";

interface CounterState {
  count: number;
  inc: () => void;
  dec: () => void;
}

// creating a basic typed zustand store
// understand that stores in zstnd are hooks
const useStore = create<CounterState>()((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

function App() {
  // using the store hook
  const store = useStore();

  return (
    <>
      <div className="flex gap-6 font-bold items-center">
        <Button onClick={store.inc}>+</Button>
        <Count />
        <Button onClick={store.dec}>-</Button>
      </div>
    </>
  );
}

function Count() {
  // Demonstrating the use of the store in a different component - hooks behaviour
  const store = useStore();

  return <div>{store.count}</div>;
}
export default App;
