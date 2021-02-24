import "./App.css";
//Import Components
import CustomList from "./components/CustomList";

function App() {
    // const listArray = ["apple", "pineapple", "pen"];
    return (
        <div className="App">
            <CustomList controls={['clear', 'reset', 'push']} />
        </div>
    );
}

export default App;
