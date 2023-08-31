import React from "react";

import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";

import Home from "./views/Home";
import TodosState from "./context/todos/todosState";

Amplify.configure(config);

export default function App() {
  return (
    <TodosState>
      <Home />
    </TodosState>
  );
}
