import { useState } from "react";
import Input from "./input";
import List from "./list";

type PokemonData = {
  name: string;
  weight: number;
  sprites: {
    front_default: string;
  };
  cries: {
    latest: string;
  };
};

export default function Pokemon() {

  return (
    <div>
      <List />
    </div>
  );
}
