"use client";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import Charts from './components/charts'

Amplify.configure(outputs);

export default function App() {
  return (
    <>
      <div className="flex">
        <main className="flex-grow ml-64 relative">
          <Charts />
        </main>
      </div>
    </>
  )
}
