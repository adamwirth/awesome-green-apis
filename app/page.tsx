"use client";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import Charts from './components/charts'
import { DefaultDarkMode } from "./dark_mode";

Amplify.configure(outputs);

export default function App() {
  return (
    <>
      <DefaultDarkMode>
        <main>
          <Charts />
        </main>
      </DefaultDarkMode>
    </>
  )
}
