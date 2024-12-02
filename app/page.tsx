"use client";

import { useState } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import Charts from "./components/charts";
import Header, { VisualizationType } from "./components/header";
import { DefaultDarkMode } from "./dark_mode";

Amplify.configure(outputs);

// import { fetchAuthSession } from "aws-amplify/auth";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient({
//   headers: async () => {
//     try {
//       const session = await fetchAuthSession();
//       const jwtToken = session?.tokens?.idToken;
//       if (!jwtToken) throw new Error("JWT token not available");
//       return { Authorization: jwtToken };
//     } catch (error) {
//       console.error("Error fetching auth headers:", error);
//       throw error;
//     }
//   },
// });

// console.log(client);


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
