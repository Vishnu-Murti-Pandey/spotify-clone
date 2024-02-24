import useAuthModel from "./useAuthModel";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnPlay = (songs) => {
    const player = usePlayer();
    const authModal = useAuthModel();
    const { user } = useUser();

    const onPlay = (id) => {
        if (!user) {
            return authModal.Open();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}

export default useOnPlay;