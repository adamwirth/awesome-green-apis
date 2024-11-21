"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";

import Charts from './components/charts';
import Header from "./components/header";
import { DefaultDarkMode } from "./dark_mode";

Amplify.configure(outputs);

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
