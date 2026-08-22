import { useState } from "react";

/** Calculator */
export default function Calculator() {
  const [display, setDisplay] = useState("");

  const appendToDisplay = (input) => {
    setDisplay((prev) => prev + input);
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      setDisplay(String(eval(display)));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Intro write-up */}
      <div className="px-6 md:px-16 lg:px-24 pt-8 pb-4">
        <h1 className="text-black font-bold text-2xl mb-2">
          Hello, Calculator.
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Calculator for simple math operations and equations.
        </p>
      </div>

      {/* Calculator */}
      <div className="flex justify-center items-center py-10">
        <div
          id="calculator"
          className="font-sans w-[95%] max-w-[350px] sm:w-full sm:max-w-[500px] bg-[hsl(0,0%,15%)] rounded-2xl overflow-hidden"
        >
          <input
            id="display"
            readOnly
            value={display}
            className="w-full bg-[hsl(0,0%,30%)] text-white text-[2rem] sm:text-4xl flex border-none text-left p-4 sm:p-5"
          />
          <div
            id="keys"
            className="grid grid-cols-4 gap-2 sm:gap-2.5 p-4 sm:p-6"
          >
            <button
              onClick={() => appendToDisplay("+")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(35,100%,55%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(35,100%,65%)] active:bg-[hsl(35,100%,65%)]"
            >
              +
            </button>
            <button
              onClick={() => appendToDisplay("7")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              7
            </button>
            <button
              onClick={() => appendToDisplay("8")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              8
            </button>
            <button
              onClick={() => appendToDisplay("9")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              9
            </button>

            <button
              onClick={() => appendToDisplay("-")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(35,100%,55%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(35,100%,65%)] active:bg-[hsl(35,100%,65%)]"
            >
              -
            </button>
            <button
              onClick={() => appendToDisplay("4")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              4
            </button>
            <button
              onClick={() => appendToDisplay("5")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              5
            </button>
            <button
              onClick={() => appendToDisplay("6")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              6
            </button>

            <button
              onClick={() => appendToDisplay("*")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(35,100%,55%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(35,100%,65%)] active:bg-[hsl(35,100%,65%)]"
            >
              *
            </button>
            <button
              onClick={() => appendToDisplay("1")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              1
            </button>
            <button
              onClick={() => appendToDisplay("2")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              2
            </button>
            <button
              onClick={() => appendToDisplay("3")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              3
            </button>

            <button
              onClick={() => appendToDisplay("/")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(35,100%,55%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(35,100%,65%)] active:bg-[hsl(35,100%,65%)]"
            >
              /
            </button>
            <button
              onClick={() => appendToDisplay("0")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              0
            </button>
            <button
              onClick={() => appendToDisplay(".")}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(0,0%,30%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(0,0%,50%)] active:bg-[hsl(0,0%,50%)]"
            >
              .
            </button>
            <button
              onClick={calculate}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(35,100%,55%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(35,100%,65%)] active:bg-[hsl(35,100%,65%)]"
            >
              =
            </button>

            <button
              onClick={clearDisplay}
              className="w-full h-[70px] sm:h-[100px] rounded-[35px] sm:rounded-full border-none bg-[hsl(35,100%,55%)] text-white text-xl sm:text-lg font-bold cursor-pointer hover:bg-[hsl(35,100%,65%)] active:bg-[hsl(35,100%,65%)]"
            >
              C
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}