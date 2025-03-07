import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokemon List" },
    { name: "description", content: "Welcome to Pokemon list" },
  ];
}

export default function Home() {
  return <Welcome />;
}
