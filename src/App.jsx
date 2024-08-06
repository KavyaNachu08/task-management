import "./App.scss";
import Home from "./components/Home/Home";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Home />
      </SearchProvider>
    </div>
  );
}

export default App;
