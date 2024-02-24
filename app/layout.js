import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import TosterProvider from "@/providers/TosterProvider";
import getSongByUserId from "@/actions/getSongByUserId";
import Player from "@/components/Player";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen music",
};

export const revalidate = 0;

export default async function RootLayout({ children }) {

  const userSongs = await getSongByUserId();

  return (
    <html lang="en">
      <body
        className={figtree.className}>
        <TosterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
