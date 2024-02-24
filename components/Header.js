"use client"

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModel from "@/hooks/useAuthModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Header = ({ children, className }) => {

    const authModal = useAuthModel();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // Reset if any currenet songs are palying
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged Out");
        }

    }

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.back()}
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.forward()}
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 item-center">
                    <button
                        className="rounded-full p-2 bg-white flex items-center hover:opacity-75 transition"
                    >
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button
                        className="rounded-full p-2 bg-white flex items-center hover:opacity-75 transition"
                    >
                        <BiSearch Home className="text-black" size={20} />
                    </button>
                </div>
                <div
                    className="flex justify-between item-center gap-x-4"
                >
                    {user ?
                        <div
                            className="flex gap-x-4 items-center"
                        >
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                        : (<>
                            <div>
                                <Button
                                    className="bg-transparent text-neutral-300 font-medium"
                                    onClick={authModal.onOpen}
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="bg-white px-6 py-2"
                                    onClick={authModal.onOpen}
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                        )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header