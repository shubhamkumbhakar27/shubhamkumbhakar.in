import {
  ArrowLeftCircleIcon,
  ArrowPathIcon,
  ArrowRightCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { Player } from "@lottiefiles/react-lottie-player";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";

const Button = ({ children, onClick }: any) => {
  return <button onClick={onClick}>{children}</button>;
};

import boat from "../../../public/images/river-riddle/boat.png";
import dancingfox from "../../../public/images/river-riddle/dancingfox.gif";
import farmer from "../../../public/images/river-riddle/farmer.png";
import wolf from "../../../public/images/river-riddle/fox.png";
import goat from "../../../public/images/river-riddle/goat.png";
import happygoat from "../../../public/images/river-riddle/happygoat.gif";
import hay from "../../../public/images/river-riddle/hay.png";
import leftBank from "../../../public/images/river-riddle/leftbank.png";
import rightBank from "../../../public/images/river-riddle/rightbank.png";
import sky from "../../../public/images/river-riddle/sky.png";
import river from "../../../public/images/river-riddle/water.png";
import HelpModal from "./InstructionModal";
import Modal from "./MessageModal";
import WinningModal from "./WinningModal";
import Image from "next/image";

const mobileDeviceDetect = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      mobileDeviceDetect.Android() ||
      mobileDeviceDetect.BlackBerry() ||
      mobileDeviceDetect.iOS() ||
      mobileDeviceDetect.Opera() ||
      mobileDeviceDetect.Windows()
    );
  },
};
const fields = [
  { key: "child_name", display: "Name" },
  { key: "parent_name", display: "Parent's Name" },
  { key: "grade", display: "Grade" },
  { key: "school", display: "School" },
  { key: "phone_number", display: "Phone" },
];
type Props = {
  isPortrait: boolean;
  setIsPortrait(isPortait: boolean): void;
};

export default function Riddle({ isPortrait, setIsPortrait }: Props) {
  const [playBackgroundSound] = useSound("/sounds/river-riddle/background.mp3");
  const [playElementDropSound] = useSound("/sounds/river-riddle/drop.mp3");
  const [playWaterSound] = useSound("/sounds/river-riddle/water.mp3");
  const [playButtonClickSfx] = useSound("/sounds/fun-button-click.mp3");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const boatRef = useRef(null);
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const [currBoatPos, setCurrBoatPosition] = useState("left");
  const [showHelp, setShowHelp] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wrongMoveGif, setWrongMoveGIF] = useState("");
  const [leftElems, setLeftElems] = useState([
    {
      name: "hay",
      src: hay.src,
      width: "30%",
    },
    {
      name: "goat",
      src: goat.src,
      width: "27%",
    },
    {
      name: "fox",
      src: wolf.src,
      width: "27%",
    },
  ]);
  const [pickedElems, setPickedElems] = useState<any>([
    {
      name: "farmer",
      src: farmer.src,
      width: "25%",
    },
  ]);
  const [rightElems, setRightElems] = useState<any>([]);

  const y = (x: number, u: number) => {
    x = Math.abs(x);
    return (10 * x * x) / (u * u) - 0.7 * x;
  };
  const animateElement = (element: any, destination: any) => {
    console.log(element, destination);
    const source = element.getBoundingClientRect();
    element.style.zIndex = 111;
    const distance = destination.x - source.x;
    console.log("d", distance);
    const m = distance / 6;
    const u = distance / 3;
    const projectilePoints = [1, 2, 3, 4, 5].map((i) => ({
      x: i * m,
      y: y(i * m, u),
    }));
    const keyframes = projectilePoints.map((point) => ({
      transform: `translate(${point.x}px, ${point.y}px)`,
    }));
    console.log(keyframes);
    element.animate(keyframes, {
      // timing options
      duration: 500,
      iterations: 1,
    });
  };

  const restart = () => {
    setShowMessageModal(false);
    setCurrBoatPosition("left");
    setLeftElems([
      {
        name: "hay",
        src: hay.src,
        width: "30%",
      },
      {
        name: "goat",
        src: goat.src,
        width: "27%",
      },
      {
        name: "fox",
        src: wolf.src,
        width: "27%",
      },
    ]);
    setPickedElems([
      {
        name: "farmer",
        src: farmer.src,
        width: "25%",
      },
    ]);
    setRightElems([]);
  };

  const moveToBoat = (elemName: string, elemDiv: any) => {
    if (pickedElems.length === 2) {
      return;
    }

    const _pickedElems = [...pickedElems];
    if (currBoatPos === "left") {
      const _leftElems = [...leftElems];
      const elem = _leftElems.find((elem) => elem.name === elemName);
      if (elem) {
        playElementDropSound();
        const index = _leftElems.indexOf(elem);
        // elemDiv.style.transform = `translate(100%,-20%)`;
        if (boatRef.current) {
          const boatRefObj = boatRef.current as HTMLElement;
          const destination = boatRefObj.getBoundingClientRect();
          //console.log(source, destination);
          animateElement(elemDiv, destination);
          setTimeout(() => {
            _leftElems.splice(index, 1);
            _pickedElems.unshift(elem);
            setLeftElems(_leftElems);
            setPickedElems(_pickedElems);
          }, 500);
        }
      }
    }
    if (currBoatPos === "right") {
      const _rightElems = [...rightElems];
      const elem = _rightElems.find((elem) => elem.name === elemName);
      if (elem) {
        playElementDropSound();
        const index = _rightElems.indexOf(elem);
        // elemDiv.style.transform = `translate(-100%,-20%)`;
        const source = elemDiv.getBoundingClientRect();
        if (boatRef.current) {
          const boatRefObj = boatRef.current as HTMLElement;
          const destination = boatRefObj.getBoundingClientRect();
          console.log(source, destination);
          animateElement(elemDiv, destination);
          setTimeout(() => {
            _rightElems.splice(index, 1);
            _pickedElems.push(elem);
            setRightElems(_rightElems);
            setPickedElems(_pickedElems);
          }, 500);
        }
      }
    }
  };
  const moveToLeftBank = (elemName: string, elemDiv: HTMLElement) => {
    if (elemName === "farmer" && rightElems.length < 3) {
      return;
    }
    playElementDropSound();
    const _leftElems = [...leftElems];
    const _pickedElems = [...pickedElems];
    const elem = _pickedElems.find((elem) => elem.name === elemName);
    if (elem) {
      const index = _pickedElems.indexOf(elem);
      _pickedElems.splice(index, 1);
      _leftElems.push(elem);
      if (elemDiv) {
        animateElement(elemDiv, { x: elemDiv.getBoundingClientRect().x - 200 });
        setTimeout(() => {
          setLeftElems(_leftElems);
          setPickedElems(_pickedElems);
        }, 500);
      }
    }
  };

  const moveToRightBank = (elemName: string, elemDiv: HTMLElement) => {
    if (elemName === "farmer" && rightElems.length < 3) {
      return;
    }
    playElementDropSound();
    const _rightElems = [...rightElems];
    const _pickedElems = [...pickedElems];
    const elem = _pickedElems.find((elem) => elem.name === elemName);
    if (elem) {
      const index = _pickedElems.indexOf(elem);
      _pickedElems.splice(index, 1);
      _rightElems.unshift(elem);
      animateElement(elemDiv, { x: elemDiv.getBoundingClientRect().x + 200 });
      setTimeout(() => {
        setRightElems(_rightElems);
        setPickedElems(_pickedElems);
      }, 500);
    }
  };

  const moveBoat = () => {
    if (currBoatPos === "left") {
      moveRight();
      const remaining = new Set(leftElems.map((elem) => elem.name));
      setTimeout(() => {
        if (remaining.has("farmer")) {
          setShowMessageModal(true);
        } else if (remaining.has("goat") && remaining.size > 1) {
          if (remaining.has("hay")) {
            setWrongMoveGIF(happygoat.src);
            setMessage("Goat eats the hay.");
            setShowMessageModal(true);
            setIsGameOver(true);
          }
          if (remaining.has("fox")) {
            setWrongMoveGIF(dancingfox.src);
            setMessage("Fox eats the goat.");
            setShowMessageModal(true);
            setIsGameOver(true);
          }
        }
      }, 2000);
    } else {
      moveLeft();
      const remaining = new Set(rightElems.map((elem: any) => elem.name));
      setTimeout(() => {
        if (remaining.size > 1 && remaining.has("goat")) {
          if (remaining.has("hay")) {
            setWrongMoveGIF(happygoat.src);
            setMessage("Goat eats the hay.");
            setShowMessageModal(true);
            setIsGameOver(true);
          }
          if (remaining.has("fox")) {
            setWrongMoveGIF(dancingfox.src);
            setShowMessageModal(true);
            setMessage("Fox eats the goat.");
            setIsGameOver(true);
          }
        }
      }, 2000);
    }
  };

  const moveRight = () => {
    if (
      !pickedElems.length ||
      !pickedElems.find((elem: any) => elem.name === "farmer")
    ) {
      return;
    }
    playWaterSound();
    setCurrBoatPosition("right");
  };

  const moveLeft = () => {
    if (
      !pickedElems.length ||
      !pickedElems.find((elem: any) => elem.name === "farmer")
    ) {
      return;
    }
    playWaterSound();
    setCurrBoatPosition("left");
  };

  const setFullScreen = () => {
    const isMobile = mobileDeviceDetect.any();
    console.log(isMobile);
    if (isMobile && containerRef.current) {
      const containerRefNode = containerRef.current as any;
      console.log(
        containerRefNode.requestFullscreen,
        containerRefNode.webkitRequestFullScreen,
        containerRefNode.webkitRequestFullscreen,
        containerRefNode.mozRequestFullScreen,
        containerRefNode.msRequestFullscreen
      );

      // screen.orientation.lock("landscape");

      if (containerRefNode.requestFullscreen)
        containerRefNode.requestFullscreen();
      else if (containerRefNode.webkitRequestFullScreen)
        containerRefNode.webkitRequestFullScreen();
      else if (containerRefNode.webkitRequestFullscreen)
        containerRefNode.webkitRequestFullscreen();
      else if (containerRefNode.mozRequestFullScreen)
        containerRefNode.mozRequestFullScreen();
      else if (containerRefNode.msRequestFullscreen)
        containerRefNode.msRequestFullscreen();

      if (screen.orientation) {
        // @ts-ignore
        screen.orientation.lock("landscape");
        setIsPortrait(false);
      }
    }
  };

  // Check if game is over
  useEffect(() => {
    if (rightElems.length === 4) {
      setIsGameOver(true);
      setShowWinModal(true);
    }
  }, [rightElems, isPortrait]);

  // Play background sound if help screen is not shown
  useEffect(() => {
    if (!showHelp) {
      playBackgroundSound();
    }
  }, [showHelp, playBackgroundSound]);

  return (
    <div
      ref={containerRef}
      className="h-[100vh] w-[100vw] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${sky.src})`,
      }}
    >
      {isPortrait ? (
        <div className="absolute inset-y-1/2 h-full w-full">
          <Player
            autoplay
            loop
            src="/lottie/puzzles/request-rotate.json"
            className="h-64 w-64"
          />
        </div>
      ) : null}
      {/* Boat moving Button on Top */}
      <div className="flex w-full justify-center pt-[10%] text-center">
        <div
          onClick={() => {
            moveBoat();
            playButtonClickSfx();
          }}
          className="flex flex-col"
        >
          {currBoatPos === "left" ? (
            <ArrowRightCircleIcon className="h-16 w-16 cursor-pointer rounded-full p-0 text-black" />
          ) : (
            <ArrowLeftCircleIcon className="h-16 w-16 cursor-pointer text-black" />
          )}
        </div>
      </div>

      {/* Bottom Elements */}
      <div className="fixed bottom-0 flex w-full items-end justify-between">
        {/* Left Bank and their Elements */}
        <div className="z-10 w-[30%]">
          <div className="relative flex w-full items-end justify-end pr-[10%]">
            {leftElems.map((element) => (
              <div
                key={element.name}
                className="z-20 flex translate-y-4 cursor-pointer transition-transform delay-300"
                style={{
                  maxWidth: element.width,
                  transition: "all .5s ease-in-out",
                }}
                onClick={(e) => {
                  moveToBoat(element.name, e.currentTarget);
                }}
              >
                <Image src={element.src} alt="" width={500} height={500} />
              </div>
            ))}
          </div>
          <div
            className="flex h-24 w-full flex-col items-center justify-end bg-cover bg-right-bottom bg-no-repeat pr-16"
            style={{ backgroundImage: `url('${leftBank.src}')` }}
          >
            <div className="bottom-4 z-10 mb-2 flex w-full justify-center gap-4">
              <ArrowPathIcon
                className="h-8 w-8 cursor-pointer rounded-full border-2 p-1"
                onClick={() => {
                  playButtonClickSfx();
                  restart();
                }}
              />
            </div>
          </div>
        </div>

        {/* Boat and their Elements */}
        <div className="fixed bottom-10 flex w-full justify-center">
          <div className="w-[40%]">
            <div
              ref={boatRef}
              className={cn(
                "flex w-[33.33%] flex-col justify-end transition duration-[3000ms] ease-in-out",
                {
                  "translate-x-[200%]": currBoatPos === "right",
                }
              )}
              style={{
                transform: currBoatPos === "right" ? "translateX(200%)" : "",
              }}
            >
              <div className="flex justify-center">
                {pickedElems.map((element: any) => (
                  <div
                    className={cn(
                      "z-10 flex aspect-square max-w-[50%] cursor-pointer flex-col justify-end",
                      {
                        "xs:translate-y-4 sm:translate-y-6":
                          element.name !== "hay",
                        "z-50 xs:translate-y-2 sm:translate-y-4":
                          element.name === "hay",
                        "cursor-not-allowed": element.name === "farmer",
                      }
                    )}
                    key={element.name}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      currBoatPos === "left"
                        ? moveToLeftBank(element.name, target)
                        : moveToRightBank(element.name, target);
                    }}
                  >
                    <Image src={element.src} alt="" width={500} height={500} />
                  </div>
                ))}
              </div>
              <div className="z-20">
                <Image src={boat.src} alt="" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>

        {/* River */}
        <div className="fixed bottom-0 h-10">
          <div className="w-[100vw]">
            <Image
              src={river.src}
              alt=""
              className=""
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Right Bank and their Elements */}
        <div className="z-20 w-[30%]">
          <div className="flex w-full items-end justify-start pl-[10%]">
            {rightElems.map((element: any) => (
              <div
                key={element.name}
                className="z-10 flex translate-y-4 cursor-pointer"
                style={{ maxWidth: element.width }}
                onClick={(e) => moveToBoat(element.name, e.currentTarget)}
              >
                <Image src={element.src} alt="" width={500} height={500} />
              </div>
            ))}
          </div>
          <div
            className="z-10 flex h-24 w-full flex-col justify-end bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${rightBank.src}')` }}
          >
            <div className="mb-2 flex w-full justify-center gap-4">
              <BookOpenIcon
                className="h-8 w-8 cursor-pointer rounded-full border-2 p-1"
                onClick={() => {
                  setShowHelp(true);
                  playButtonClickSfx();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      {showMessageModal && !isGameOver ? (
        <Modal
          onClose={() => {
            setShowMessageModal(false);
          }}
        >
          <div className="max-w-[40%]">
            <Image src={wrongMoveGif} alt="" width={500} height={500} />
          </div>
        </Modal>
      ) : showHelp ? (
        <HelpModal
          onProceed={() => {
            setFullScreen();
            setShowHelp(false);
          }}
        />
      ) : showMessageModal && isGameOver ? (
        <Modal>
          <h1 className="text-center">GAME OVER !!!</h1>
          <div className="flex w-full justify-center">
            <div className="mt-4 max-w-[40%]">
              <Image src={wrongMoveGif} alt="" width={500} height={500} />
            </div>
          </div>
          <h2 className=" my-4 flex w-full justify-center">{message}</h2>

          <div className="m-auto mt-4 flex w-full justify-center">
            <Button size="small" color="green" onClick={restart}>
              Restart
            </Button>
          </div>
        </Modal>
      ) : showWinModal && isGameOver ? (
        <WinningModal>
          <div className="text-center">
            <p>Thanks for playing. </p>
          </div>
        </WinningModal>
      ) : null}
    </div>
  );
}
