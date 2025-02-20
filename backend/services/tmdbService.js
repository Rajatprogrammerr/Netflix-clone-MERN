
import axios from "axios";


export const fetchFromTmdb = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTNkMTA1MWI3NWU5OWQ0YWQwNzljMWNmN2VhZGMzYiIsIm5iZiI6MTcyODcyNjYxMS4wMTc1OTQsInN1YiI6IjY3MDRlODRlNWMwMGEyZDQ0ZWMwMGI0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNSeAk89n9A6K3L-ySVtlk3XMywn8lTR3LSEypZiiHQ'
        }
    };


    const response = await axios.get(url, options)
    if (response.status !== 200) {
        throw new Error("Failed to fetch data from TMDB" + response.statusText);
    }

    return response.data;
}

