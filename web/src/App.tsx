import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import "./styles/global.scss";

export function App() {
  return (
    <>
      <Header />;
      <TodoList />
    </>
  );
}
