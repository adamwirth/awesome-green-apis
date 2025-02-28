"use client";

import { useState } from "react";

import Charts from "./components/charts";
import Header, { VisualizationType } from "./components/header";
import { DefaultDarkMode } from "./dark_mode";


export default function App() {
  const [currentView, setCurrentView] = useState<VisualizationType>('firststreet');
  
  return (
    <DefaultDarkMode>
      <main>
        <Header onViewChange={setCurrentView}
                currentView={currentView}
                />
        <Charts activeView={currentView} />
      </main>
    </DefaultDarkMode>
  );
}
