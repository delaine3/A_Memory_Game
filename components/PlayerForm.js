import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { Form } from "semantic-ui-react";
import { tileArray } from "./tile_array";

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
  const [score, setScore] = useState(0);
  const [triesLeft, setTriesLeft] = useState(tileArray.length);
  const [tilesOnScreen, setTilesOnScreen] = useState(tileArray.length);
  const [gameOver, setGameOver] = useState(false);

  const [form, setForm] = useState({
    name: playerName,
    score: score,
  });

  useEffect(() => {
    tileArray.sort(() => 0.5 - Math.random());

    setDidShuffleArray(true);
  }, [didShuffleArray]);

  useEffect(() => {
    if (pairArray.length === 2 && pairArray[0][0] === pairArray[1][0]) {
      var selectElements = document.querySelectorAll(
        "div[name=" + pairArray[0][0] + "]"
      );
      let first = pairArray[0][1];
      let second = pairArray[1][1];

      console.log(first + "---" + second);

      if (first != second) {
        selectElements.forEach((anchor) => {
          setTimeout(function () {
            anchor.style.display = "none";
          }, 1000);
        });

        setPairArray([]);
        setScore(score + 1);
        setForm({
          ...form,
          [score]: score + 1,
        });
        setTilesOnScreen(tilesOnScreen - 2);
        console.log("ITS A MATCH");
      } else {
        setTriesLeft(triesLeft - 1);
        setScore(score - 0.5);
        setForm({
          ...form,
          [score]: score - 0.5,
        });
        const currTile = document.getElementById(first);
        currTile.style.boxShadow = "0 0 1vw 1vw red";
        setTimeout(function () {
          currTile.style.boxShadow = "0 0 1vw 1vw #F2F230";
        }, 1000);
        setPairArray([]);
      }
    } else if (pairArray.length === 2 && pairArray[0] != pairArray[1]) {
      setTriesLeft(triesLeft - 1);
      setScore(score - 0.5);
      setForm({
        ...form,
        [score]: score - 0.5,
      });
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

  function Tile(src, id, name) {
    const [isVisible, setIsVisible] = useState(false);
    // playSound(event) {
    //   let sound = document.getElementById(this.props.keyTrigger);
    //   sound.volume = this.props.volume;

    //   sound.currentTime = 0;
    //   sound.play();
    //   this.props.updateSoundDisplay(this.props.id);
    // }
    const visible = () => {
      setIsVisible(true);
      setPairArray((oldArray) => [...oldArray, [name, id]]);

      setTimeout(function () {
        setIsVisible(false);
      }, 2000);
    };
    return (
      <div onClick={visible} className="tile" key={id} id={id} name={name}>
        {isVisible ? (
          <img className="tile-container" src={src} />
        ) : (
          <div> </div>
        )}
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
      {gameOver ? (
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
