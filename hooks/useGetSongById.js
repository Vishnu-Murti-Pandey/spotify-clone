import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"

const useGetSongById = (id) => {

    const [isLoading, setIsLoading] = useState(false);
    const [song, setSongs] = useState(undefined);

    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(false);

        const fetchSongs = async () => {
            const { data, error } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSongs(data);
            setIsLoading(false);
        }

        fetchSongs();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading, song
    }), [isLoading, song]);

}

export default useGetSongById;