const DrumPad = ({ pad, state, setState }) => {
  const { keyTrigger, id, url } = pad;
  const { powerOn, volume } = state;

  const handlePadClick = (event) => {
    if (!powerOn) {
      return;
    }

    const keyPad = event.target.querySelector("audio");
    keyPad.volume = volume / 100;
    keyPad.play();
    setState({ display: id.replace(/-/gm, " ") });
  };

  return (
    <div id={id} className="drum-pad" onClick={handlePadClick}>
      {keyTrigger}
      <audio id={keyTrigger} src={url} className="clip">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export { DrumPad };
