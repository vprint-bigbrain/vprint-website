'use client'
import { Grommet } from "grommet-icons";
import LoginForm from "./components/LoginForm";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {Providers} from "./providers";

export default function Home() {

  return (
      <Providers>
        <div className="flex flex-col">
          <h1 className="absolute text-4xl left-5 top-5 font-extrabold">Vprint</h1>
          <div className="flex justify-center m-auto items-center min-h-screen">
            <LoginForm />
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </Providers>
  );
}
