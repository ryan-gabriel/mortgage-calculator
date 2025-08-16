import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
