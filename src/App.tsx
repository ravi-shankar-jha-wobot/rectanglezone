import "./App.css";
import { useState } from "react";
import RectangleZone from "./lib/RectangleZone";
import type { Rectangle } from "./lib/types";

function App() {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  return (
    <div className="app">
      <RectangleZone
        imageSrc="https://architecture-student.com/wp-content/uploads/2010/09/Open-plan-Office.jpg"
        rectangles={rectangles}
        setRectangles={setRectangles}
      />
    </div>
  );
}

export default App;
