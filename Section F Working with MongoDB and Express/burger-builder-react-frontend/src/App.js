import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Main from "./Components/Main";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
