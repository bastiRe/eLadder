import React from "react";
import ShareLeague from "../base/ShareLeague";
import { ModalBackground } from "../elements";

function ShareLeagueScreen({ route }) {
  const { leagueId, leagueTitle } = route.params;
  return (
    <ModalBackground>
      <ShareLeague leagueId={leagueId} leagueTitle={leagueTitle} />
    </ModalBackground>
  );
}

export default ShareLeagueScreen;
