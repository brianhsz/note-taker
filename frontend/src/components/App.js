import UploadedNotes from "./uploadednotes";
import Header from "./header";
import "../css/index.css";

export default function App() {
  return (
    <div className="bg-gradient-to-r from-white to-gray-300 pt-28 sm:pt-36">
      <Header />
      <UploadedNotes />
    </div>
  );
}
