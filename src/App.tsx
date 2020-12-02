import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, createMachine } from "xstate";
import "./styles.css";

const semaforo = createMachine({
  id: "semaforo",
  initial: "verde",
  context: {
    podePassar: true
  },
  states: {
    verde: {
      on: {
        t: {
          target: "amarelo"
        }
      }
    },
    amarelo: {
      on: {
        t: {
          target: "vermelho",
          actions: assign({
            podePassar: (ctx) => !ctx.podePassar
          })
        }
      }
    },
    vermelho: {
      on: {
        t: "verde"
      }
    }
  }
});

export default function App() {
  const [state, send] = useMachine(semaforo);

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => send("t", { a: 2 })}>{state.value}</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
