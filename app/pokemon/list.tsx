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

    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
    const displayedPokemons = filteredPokemons.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page > 3) pages.push(1, "...");
            for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
                pages.push(i);
            }
            if (page < totalPages - 2) pages.push("...", totalPages);
        }
        return pages;
    };

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
                    {totalPages > 1 && (
                        <div className="justify-center flex items-center" style={{ gap: "1rem" }}>
                            <button
                                className="bg-blue-700 p-2.5 rounded-lg"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            {generatePageNumbers().map((p, index) => (
                                <button
                                    key={index}
                                    className={`p-2.5 rounded-lg ${p === page ? "bg-blue-900 text-white" : ""}`}
                                    onClick={() => typeof p === "number" && setPage(p)}
                                    disabled={p === "..."}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                className="bg-blue-700 p-2.5 rounded-lg"
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
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