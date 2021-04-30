import Slider from "@material-ui/core/Slider";

function Volume({ volume, setVolume }) {
  return (
    <Slider
      id="volume"
      min={0}
      max={100}
      value={volume}
      onChange={setVolume}
      aria-labelledby="continuous-slider"
    />
  );
}

export { Volume };
