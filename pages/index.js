import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Player from "../models/Player";
import { useState } from "react";

const Index = ({ player }) => {
  const [message, setMessage] = useState("");

  const handleDelete = async (itemId) => {
    console.log("Writing excercise id" + itemId);
    try {
      await fetch(`/api/player/${itemId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the player.");
    }
  };
  return (
    <div>
      <h1>
        <Link href="/newPlayer">
          <button className="newFormButton">
            {" "}
            <a>New Game</a>{" "}
          </button>
        </Link>
      </h1>
      <h1>Leader Board</h1>
      <ul className="score-board">
        <li className="score header" id="myHeader">
          <span className="slot">
            <h2>Player</h2>{" "}
          </span>
          <span className="slot">
            <h2>Score</h2>
          </span>
        </li>
        {player.map((player) => (
          <li key={player._id} className="score">
            <span className="slot">
              <h2>{player.name}</h2>{" "}
            </span>
            <span className="slot">
              <h2> {player.score}</h2>{" "}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Retrieves player(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data  our database */
  const result = await Player.find().sort([["score", "descending"]]);
  const player = result.map((doc) => {
    const player = doc.toObject();
    player._id = player._id.toString();
    return player;
  });

  return { props: { player: player } };
}

export default Index;
