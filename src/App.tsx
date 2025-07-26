import { useEffect, useState } from "react";

type Light = "red" | "yellow" | "green";

const App = () => {
  const [activeLight, setActiveLight] = useState<Light>("red");
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [isGoingToGreen, setIsGoingToGreen] = useState<boolean>(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (activeLight === "red") {
        setActiveLight("yellow");
        setSecondsLeft(3);
        setIsGoingToGreen(true);
      } else if (activeLight === "yellow") {
        if (isGoingToGreen) {
          setActiveLight("green");
          setSecondsLeft(10);
        } else {
          setActiveLight("red");
          setSecondsLeft(10);
        }
      } else if (activeLight === "green") {
        setActiveLight("yellow");
        setSecondsLeft(3);
        setIsGoingToGreen(false);
      }
    }

    return () => clearTimeout(timer);
  }, [secondsLeft, activeLight, isGoingToGreen]);

  const getLightClass = (light: Light) => {
    const base =
      "w-full h-full rounded-full flex items-center justify-center text-[80px] font-medium";
    const color =
      activeLight === light
        ? {
            red: "bg-red-600  text-red-900",
            yellow: "bg-yellow-400 text-yellow-900",
            green: "bg-green-600  text-green-900",
          }[light]
        : "bg-gray-600";
    return `${base} ${color}`;
  };

  const renderSeconds = (light: Light) => {
    return activeLight === light ? secondsLeft : null;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-[200px] p-[5px] flex flex-col gap-[10px]">
        <div className="w-full p-[10px] h-[200px] rounded-[25px] bg-black">
          <div className={getLightClass("red")}>{renderSeconds("red")}</div>
        </div>
        <div className="w-full p-[10px] h-[200px] rounded-[25px] bg-black">
          <div className={getLightClass("yellow")}>
            {renderSeconds("yellow")}
          </div>
        </div>
        <div className="w-full p-[10px] h-[200px] rounded-[25px] bg-black">
          <div className={getLightClass("green")}>{renderSeconds("green")}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
