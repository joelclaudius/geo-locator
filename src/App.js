import { useState } from "react";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

export default function App() {
  const {
    isLoading,
    position: { lat, lng },
    error,
    getPosition,
  } = useGeolocation();

  const [countClicks, setCountClicks] = useState(0);

  // const { lat, lng } = position;

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div className="bg-footer-color shadow-lg py-20 pb-[400px] px-20 grid grid-cols-1 gap-y-10">
      <div className="flex justify-center ">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className="uppercase p-2 border-2 border-blue-700 rounded-full hover:bg-blue-300"
        >
          Get my position
        </button>
      </div>
      <div className="flex justify-center">
        {isLoading && <p>Loading position...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && lat && lng && (
          <p className="">
            Your GPS position:{" "}
            <div>
              {" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                className="font-bold hover:underline text-footer-one"
              >
                {lat}, {lng}
              </a>
            </div>
          </p>
        )}
      </div>
      <di className="flex justify-center">
        <p className="italic">You requested position {countClicks} times</p>
      </di>
    </div>
  );
}
