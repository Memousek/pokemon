import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function meta({ params }: Route.MetaArgs) {
    const title = params.name ? `${params.name} | Pokemon` : "Pokemon List";
    return [
        { title },
        { name: "description", content: params.name ? `Details about ${params.name}` : "Welcome to Pokemon list" },
    ];
}

export default function PokemonDetail() {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<any>(null);
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                setPokemon(data);
                
                const speciesResponse = await fetch(data.species.url);
                const speciesData = await speciesResponse.json();
                
                const formsData = await Promise.all(
                    speciesData.varieties.map(async (variety: any) => {
                        const varietyResponse = await fetch(variety.pokemon.url);
                        return await varietyResponse.json();
                    })
                );
                
                setForms(formsData);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (!pokemon) return <p className="text-center text-lg text-red-500">Pokémon not found. <a href="/" className="text-blue-500 underline">Back to list</a></p>;

    return (
        <div className="flex items-center justify-center pt-16 pb-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full text-center">
                <h1 className="text-2xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
                <img 
                    src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} 
                    className="w-40 h-40 mx-auto my-4" 
                    alt={pokemon.name} 
                    loading='lazy' 
                    width={160}
                    height={160}
                />
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                    <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                    <p><strong>Abilities:</strong> {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}</p>
                    <p><strong>Types:</strong> {pokemon.types.map((t: any) => t.type.name).join(", ")}</p>
                </div>
                
                <h2 className="text-lg font-semibold mt-4">Forms</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {forms.map((f: any) => (
                        <div key={f.name} className="text-center">
                            <Link to={`/pokemon/${f.name}`} className="block text-blue-500 underline capitalize">{f.name}</Link>
                            <img 
                                src={`https://img.pokemondb.net/sprites/home/normal/${f.name}.png`} 
                                alt={f.name} 
                                className="w-20 h-20 mx-auto my-2"
                                loading="lazy"
                                width={80}
                                height={80}
                            />
                        </div>
                    ))}
                </div>
                
                <h2 className="text-lg font-semibold mt-4">Stats</h2>
                <ul className="grid grid-cols-2 gap-2 text-gray-600">
                    {pokemon.stats.map((s: any) => (
                        <li key={s.stat.name}><strong>{s.stat.name}:</strong> {s.base_stat}</li>
                    ))}
                </ul>
                
                <h2 className="text-lg font-semibold mt-4">Moves</h2>
                <ul className="max-h-32 overflow-y-auto border p-2 rounded bg-gray-50 text-gray-600">
                    {pokemon.moves.slice(0, 10).map((m: any) => (
                        <li key={m.move.name}>{m.move.name}</li>
                    ))}
                </ul>
                
                <audio controls className="mt-4">
                    <source src={pokemon.cries?.latest} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                
                <div className="mt-6">
                    <a href="/" className="text-blue-500 underline">Back to list</a>
                </div>
            </div>
        </div>
    );
};
