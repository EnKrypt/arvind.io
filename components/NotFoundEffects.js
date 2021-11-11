import { useEffect, useState } from 'preact/hooks';

const pickRandomGif = (gifs, currentGif) => {
  const gif = gifs[Math.floor(Math.random() * gifs.length)];
  if (gif === currentGif) {
    return pickRandomGif(gifs, currentGif);
  }
  return gif;
};

const NotFoundEffects = ({ notFoundGifs }) => {
  const [hydrated, setHydrated] = useState(false);
  const [stopGlitching, setStopGlitching] = useState(false);
  const [gif, setGif] = useState('');
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated) {
    return (
      <>
        {gif ? (
          <img
            className="not-found-image"
            src={`/images/404/${gif}`}
            key={gif}
            alt="404 Gif"
          />
        ) : (
          <div data-text="4o4" className="glitch">
            <span
              className={['glitch-before', stopGlitching ? 'hide' : '']
                .join(' ')
                .trim()}
            >
              <span className="primary">4</span>o
              <span className="primary">4</span>
            </span>
            <span className="primary">4</span>o
            <span className="primary">4</span>
            <span
              className={['glitch-after', stopGlitching ? 'hide' : '']
                .join(' ')
                .trim()}
            >
              <span className="primary">4</span>o
              <span className="primary">4</span>
            </span>
          </div>
        )}
        <div className="not-found-options">
          {gif ? (
            <>
              <span
                onClick={() => {
                  setGif('');
                }}
              >
                Back to default
              </span>
              <span
                onClick={() => {
                  setGif(pickRandomGif(notFoundGifs, gif));
                }}
              >
                Show another gif
              </span>
            </>
          ) : (
            <>
              <span
                onClick={() => {
                  setGif(pickRandomGif(notFoundGifs, ''));
                }}
              >
                Miss the 404 gifs?
              </span>
              {stopGlitching ? (
                <span
                  onClick={() => {
                    setStopGlitching(false);
                  }}
                >
                  Resume glitch effect
                </span>
              ) : (
                <span
                  onClick={() => {
                    setStopGlitching(true);
                  }}
                >
                  Stop glitch effect
                </span>
              )}
            </>
          )}
        </div>
      </>
    );
  } else {
    return <span></span>;
  }
};

export default NotFoundEffects;
