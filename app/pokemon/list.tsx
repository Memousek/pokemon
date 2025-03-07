import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<{ name: string }[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<{ name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 18;

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            try {
                const response = await getAllPokemons();
                setPokemons(response.results);
                setFilteredPokemons(response.results);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const getAllPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        return response.json();
    };

    useEffect(() => {
        const filtered = pokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPokemons(filtered);
        setPage(1);
    }, [search, pokemons]);

    const displayedPokemons = filteredPokemons.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const showPagination = filteredPokemons.length > itemsPerPage;

    return (
        <div style={{ maxWidth: "1200px", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", margin: "0 auto" }}>
            <h1 className="text-2xl mt-10 mb-5">Pokémon List</h1>
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 mb-20 border rounded w-full max-w-md focus:outline-none focus:ring focus:border-blue-300 input dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {loading ? (
                <p>Loading...</p>
            ) : filteredPokemons.length === 0 ? (
                <p className="text-center text-gray-500">No Pokémon found</p>
            ) : (
                <>
                    <ul className="flex mb-10 gap-6" style={{ flexWrap: "wrap" }}>
                        {displayedPokemons.map((pokemon) => (
                            <li style={{ flex: "1 0 25%" }} key={pokemon.name}>
                                <Link to={`/pokemon/${pokemon.name}`}>
                                    {pokemon.name}
                                    <img
                                        src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                                        alt={pokemon.name}
                                        loading="lazy"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {showPagination && (
                        <div className="justify-center flex" style={{ gap: "1rem" }}>
                            <button
                                className="bg-blue-700 p-2.5 rounded-lg"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-blue-700 p-2.5 rounded-lg"
                                onClick={() => setPage(page + 1)}
                                disabled={page * itemsPerPage >= filteredPokemons.length}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PokemonList;