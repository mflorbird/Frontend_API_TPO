import axios from "axios";
import {useEffect, useState} from "react";


const Home = () => {
    const [pokemonList, setstate] = useState([]);
    
    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon")
            .then((data)=> console.log(data))
            .carch ((error) => console.error(error));
    }, []);
    
    
    
    return <div></div>;

}

export default Home;
