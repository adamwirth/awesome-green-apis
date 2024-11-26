"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";

import Charts from './components/charts';
import Header from "./components/header";
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
  return (
    <DefaultDarkMode>
      <main>
        <Header />
        <Charts />
      </main>
    </DefaultDarkMode>
  );
}
