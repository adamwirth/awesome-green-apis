"use client";

import { useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import Charts from "./components/charts";
import Header, { VisualizationType } from "./components/header";
import { DefaultDarkMode } from "./dark_mode";

Amplify.configure(outputs);


export default function App() {
  const [currentView, setCurrentView] = useState<VisualizationType>('cscale');
  
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
