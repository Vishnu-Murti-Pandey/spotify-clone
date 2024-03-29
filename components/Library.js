"use client"
import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/userUploadModal";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

const Library = ({ songs }) => {

    const subscribedModal = useSubscribeModal();
    const authModal = useAuthModel();
    const { user, subcription } = useUser();
    const uploadModal = useUploadModal();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }
        if (!subcription) {
            return subscribedModal.onOpen();
        }
        return uploadModal.onOpen();
    }

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between px-5 pt-4'>
                <div className='inline-flex item-center gap-x-2'>
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {
                    songs.map((song) => (
                        <MediaItem
                            onClick={(id) => onPlay(id)}
                            key={song.id}
                            data={song}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Library