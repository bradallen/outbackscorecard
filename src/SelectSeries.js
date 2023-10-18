export default function SelectSeries({ selectedSeries, selectSeries, hidden }) {
  const otherSeries = JSON.parse(localStorage.getItem("saved")) || [];
  let select;
  if (otherSeries?.length) {
    select = (
      <select className={hidden ? "hiddenButton" : "button"}>
        <option disabled value selected>
          Select a Series
        </option>
        {otherSeries.map((s) => (
          <option
            selected={s.title === selectedSeries}
            onClick={() => selectSeries(s.title)}
            value={s.title}
          >
            {s.title}
          </option>
        ))}
      </select>
    );
  }

  return select;
}
