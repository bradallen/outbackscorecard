import "./styles.css";
import initialState from "./initialState.json";
import { useState, useRef } from "react";
import Rows from "./Rows";
import Create from "./Create";
import { exportComponentAsPNG } from "react-component-export-image";
import { buildInitialScores } from "./utils";
import { useEffect } from "react";
import SelectSeries from "./SelectSeries";

export default function App() {
  const [series, setSeries] = useState({});
  const [tempSeries, setTempSeries] = useState({});
  const [scores, setScores] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [newSeries, setNewSeries] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(
    localStorage.getItem("selectedSeries") || ""
  );
  console.log(
    "😘",
    localStorage.getItem("selectedSeries"),
    JSON.parse(localStorage.getItem("saved"))
  );
  const componentRef = useRef();
  useEffect(() => {
    if (series.games && series.players) {
      setScores(buildInitialScores(series.games, series.players));
    }
  }, []);

  const deleteSeries = () => {
    const tempSeriesArray = JSON.parse(localStorage.getItem("saved")) || [];
    const newSeriesArray = tempSeriesArray.filter(
      (s) => s.title !== selectedSeries
    );

    localStorage.setItem("saved", JSON.stringify(newSeriesArray));
    const fallbackSeries = newSeriesArray[0];
    if (fallbackSeries?.title) {
      setScores(fallbackSeries.scores);
      setSeries(fallbackSeries.series);
      localStorage.setItem("selectedSeries", fallbackSeries.title);
      setSelectedSeries(fallbackSeries.title);
    } else {
      setScores([]);
      setSeries({});
      localStorage.setItem("selectedSeries", "");
      setSelectedSeries("");
    }
    setHighlight(null);
  };

  const startNewSeries = () => {
    setNewSeries(true);
  };

  const selectSeries = (seriesName) => {
    const tempSeries = (JSON.parse(localStorage.getItem("saved")) || []).find(
      (s) => s.title === seriesName
    );
    setSelectedSeries(seriesName);
    localStorage.setItem("selectedSeries", seriesName);
    if (tempSeries) {
      setNewSeries(false);
      setSeries(tempSeries.series);
      setScores(tempSeries.scores);
      setHighlight(null);
    }
  };

  const createSeries = () => {
    if (tempSeries.players && tempSeries.title && tempSeries.games) {
      setSeries(tempSeries);
      const tempScores = buildInitialScores(
        tempSeries.games,
        tempSeries.players
      );
      const tempSeriesName = tempSeries.title
        .split(" ")
        .join("-")
        .toLocaleLowerCase();
      setScores(tempScores);
      setSelectedSeries(tempSeriesName);
      const tempSaved = JSON.parse(localStorage.getItem("saved")) || [];
      tempSaved.push({
        title: tempSeriesName,
        series: tempSeries,
        scores: tempScores
      });
      localStorage.setItem("saved", JSON.stringify(tempSaved));
    }
    setNewSeries(false);
  };

  const saveScores = (newScores) => {
    const tempSaved = JSON.parse(localStorage.getItem("saved")) || [];
    const updatedSaved = tempSaved.map((s) => {
      if (s.title === selectedSeries) {
        return {
          ...s,
          scores: newScores
        };
      }

      return s;
    });
    setScores(newScores);
    if (updatedSaved.length) {
      localStorage.setItem("saved", JSON.stringify(updatedSaved));
    }
  };

  if (newSeries || !series.players || !series.games) {
    return [
      <div className="App" id="App" key="App" ref={componentRef}>
        <Create setTempSeries={setTempSeries} />
      </div>,
      <div className="menu" key="menu">
        <button
          key="cancel"
          className="button"
          onClick={() => setNewSeries(false)}
        >
          Cancel
        </button>
        <button key="submit" className="button" onClick={createSeries}>
          Submit
        </button>
        <SelectSeries selectedSeries="" selectSeries={selectSeries} />
      </div>
    ];
  }

  return [
    <div className="App" id="App" key={selectedSeries} ref={componentRef}>
      <div className="score">
        <h1
          className="clickable"
          onClick={() =>
            exportComponentAsPNG(componentRef, {
              fileName: series.title.split(" ").join("-")
            })
          }
        >
          {series.title}
        </h1>
        <Rows
          highlight={highlight}
          games={series.games}
          scores={scores}
          setHighlight={setHighlight}
          setScores={saveScores}
          setSeries={() => setSeries(initialState)}
        />
      </div>
    </div>,
    <div className="menu" key="menu">
      <button key="create" className="hiddenButton" onClick={startNewSeries}>
        Create
      </button>
      <SelectSeries
        selectedSeries={selectedSeries}
        selectSeries={selectSeries}
        hidden
      />
      <button
        key="delete"
        className="hiddenButton deleteButton"
        onClick={deleteSeries}
      >
        Delete
      </button>
    </div>
  ];
}
