import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Publishers from "../../components/Publishers/Publishers";

import Count from "./Count";
import Location from "./Location";
import Plans from "./Plans";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <h1 className="text-center mt-10 text-2xl font-medium">
          Discover the Latest Updates from Around the World!!!
          <br />
          <br />
          <span className="text-blue-500 font-bold">
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={["News", "Reports", "Insights", "Analysis"]}
              loop={10}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
      </div>
      <Banner></Banner>
      <Publishers></Publishers>
      <Count></Count>
      <Plans></Plans>
      <Location></Location>

      {showModal && (
        <dialog className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              {/* Add a button to close the modal */}
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Home;
