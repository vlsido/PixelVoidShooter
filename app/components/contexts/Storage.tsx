import PlayerContextProvider from "./PlayerContext";

function Storage({ children }: { children: React.ReactNode }) {


  return (
    <PlayerContextProvider>
      {children}
    </PlayerContextProvider>
  );
}

export default Storage;
