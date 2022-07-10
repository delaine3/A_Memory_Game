import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { Form } from "semantic-ui-react";
import { tileArray } from "./tile_array";
import Link from "next/link";

const PlayerForm = ({ formId, PlayerForm, fornewPlayer = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [pairArray, setPairArray] = useState([]);
  const [didShuffleArray, setDidShuffleArray] = useState(false);
  const [inProgress, setInprogress] = useState(true);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [clickCounter, setClickCounter] = useState(0);

  const [score, setScore] = useState(0);
  const [triesLeft, setTriesLeft] = useState(tileArray.length);
  const [tilesOnScreen, setTilesOnScreen] = useState(tileArray.length);
  const [gameOver, setGameOver] = useState(false);
  const [deadTiles, setDeadTiles] = useState([]);
  const [form, setForm] = useState({
    name: playerName,
    score: score,
  });

  useEffect(() => {
    tileArray.sort(() => 0.5 - Math.random());

    setDidShuffleArray(true);
  }, [didShuffleArray]);

  useEffect(() => {
    /*The fist and second items in the list are the same. 
    The items in the list are strings describing the tile*/
    if (pairArray.length === 2 && pairArray[0][0] === pairArray[1][0]) {
      //Find al the divs with that name
      var selectElements = document.querySelectorAll(
        "div[name=" + pairArray[0][0] + "]"
      );
      let first = pairArray[0][1];
      let second = pairArray[1][1];
      if (deadTiles[deadTiles.length - 1]?.includes(first || second)) {
        setPairArray([]);

        return;
      }
      console.log(deadTiles[deadTiles.length - 1]?.includes(first));
      console.log(deadTiles);
      if (first != second) {
        setDeadTiles((oldArray) => [...oldArray, [first, second]]);

        selectElements.forEach((anchor) => {
          //console.log(anchor);
          anchor.parentElement.removeAttribute("onClick");
          //  anchor.parentElement.classList.add("off");
          anchor.parentElement.setAttribute("id", "off");
          //console.log(anchor.parentElement);
          //anchor.remove();
          //console.log(anchor.parentElement);
        });
        setPairArray([]);
        setScore(score + 1);
        setForm({
          ...form,
          [score]: score + 1,
        });
        setTilesOnScreen(tilesOnScreen - 2);
        console.log("ITS A MATCH");
        //alert("It's A Match");
      } else {
        var selectElements = document.querySelectorAll(
          "div[name=" + pairArray[0][0] + "]"
        );
        let first = pairArray[0][1];
        let second = pairArray[1][1];
        if (deadTiles[deadTiles.length - 1]?.includes(first || second)) {
          setPairArray([]);

          return;
        }
        //alert("That's the same tile!");

        setTriesLeft(triesLeft - 1);
        setScore(score - 0.5);
        setPairArray([]);
      }
    } else if (pairArray.length === 2 && pairArray[0] != pairArray[1]) {
      /*If there are 2 items in the list and the first item in the 
     list != the second item in the list, reduce the number of tries
      and score and reset the list*/

      setTriesLeft(triesLeft - 1);
      setScore(score - 0.5);
      setTimeout(function () {
        //alert("It's Not A Match");
      }, 500);
      setPairArray([]);
    }
  }, [pairArray]);

  useEffect(() => {
    if (tilesOnScreen === 0 || triesLeft === 0) {
      if (triesLeft === 0) {
        console.log("Y0U LOSE!");
        setLost(true);
      } else {
        setScore(score + triesLeft);
        setWon(true);
      }
      setGameOver(true);

      setInprogress(false);
    }
  }, [score, tilesOnScreen, triesLeft]);

  useEffect(() => {
    if (gameOver) {
      setTilesOnScreen(tileArray.length);
      setTriesLeft(tileArray.length);
    }
  }, [gameOver]);

  const start = () => {
    setGameOver(false);
    setScore(0);
    setDidShuffleArray(false);
    setInprogress(true);
    setPlayerName("");
    setLost(false);
    setPairArray([]);
    setTriesLeft(tileArray.length);
    setTilesOnScreen(tileArray.length);
    setWon(false);
  };
  function Tile(src, id, name) {
    const [isVisible, setIsVisible] = useState(false);

    const visible = () => {
      if (deadTiles.includes(id) || clickCounter > 1) {
        setClickCounter(0);
        return;
      }
      setClickCounter(clickCounter + 1);
      setPairArray((oldArray) => [...oldArray, [name, id]]);
      setIsVisible(true);

      setTimeout(function () {
        setIsVisible(false);
      }, 2000);
    };
    return (
      <div onClick={visible} key={id} className="square">
        <div className="tile" key={id} id={id} name={name}>
          {isVisible ? (
            <img className="tile-container" src={src} />
          ) : (
            <div className=""> </div>
          )}
        </div>
      </div>
    );
  }

  //for every tile on the current list of tiles, create a drum button for it and attach the meta data.
  let tileGrid = tileArray.map((tile) => {
    let id = tile.id;
    let src = tile.img;
    let name = tile.name;
    return Tile(src, id, name);
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/player/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({
          name: playerName,
          score: score,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/player/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update player");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/player", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify({
          name: playerName,
          score: score,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add player");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;

    setPlayerName(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      fornewPlayer ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure player info is filled for player charachter_name, places_lived charachter_name, birth_place, and image url*/
  const formValidate = () => {
    let err = {};

    return err;
  };

  return (
    <div>
      <p className="instructions">
        Try to find all matching tiles. Clicking on a gray tile or selecting
        unmatching tiles will cause you to lose points and reduce your number of
        tries.
      </p>

      <h1>
        <Link href="/">
          <button className="newFormButton">
            {" "}
            <a>Leader Board</a>{" "}
          </button>
        </Link>
      </h1>
      {gameOver ? (
        <h1>
          <button onClick={start} className="newFormButton">
            {" "}
            <a>New Game</a>{" "}
          </button>
        </h1>
      ) : (
        <></>
      )}
      {gameOver && won ? (
        <Form className="game" id={formId} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>

          <input
            type="text"
            name="name"
            value={playerName}
            onChange={handleChange}
            required
          />
          <label htmlFor="score">Score</label>

          <p
            type="text"
            name="score"
            value={score}
            onChange={handleChange}
            required
          >
            {score}
          </p>

          <button type="submit" className="btn submit">
            Submit
          </button>

          <>{message != "" ? message : <></>}</>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>
        </Form>
      ) : (
        <></>
      )}

      <div className="game">
        {lost ? (
          <div>
            {" "}
            <h1 className="lose">YOU LOST!</h1>{" "}
            <img
              src="https://66.media.tumblr.com/410d3d231ef8a57ef1e36823e4314703/tumblr_nf1n3vTZhR1ql5yr7o1_500.gif"
              alt="You-lose"
              border="0"
            />{" "}
          </div>
        ) : (
          <></>
        )}
        {won ? (
          <div>
            {" "}
            <h1 className="win">YOU WON!</h1>{" "}
            <img
              src="https://i.ibb.co/nrnhPPM/congratulations-animated-sun.gif"
              alt="congratulations-animated-sun"
              border="0"
            />{" "}
          </div>
        ) : (
          <></>
        )}

        {inProgress ? (
          <div>
            <h1>Score : {score} </h1>
            <h1>Tries left : {triesLeft} </h1>
            <div id="tile-grid" className="grid">
              {tileGrid}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PlayerForm;
