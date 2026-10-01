import { useState, useEffect } from "react";

const OPS = ["+", "−", "×", "÷"];

/** Safe expression evaluator (no eval) with correct operator precedence */
const evaluate = (src) => {
  let i = 0;
  const peek = () => src[i];

  const number = () => {
    let s = "";
    while (i < src.length && /[\d.]/.test(src[i])) s += src[i++];
    if (s === "" || s === ".") throw new Error("Invalid");
    return parseFloat(s);
  };

  const factor = () => {
    if (peek() === "−") {
      i++;
      return -factor();
    }
    return number();
  };

  const term = () => {
    let v = factor();
    while (peek() === "×" || peek() === "÷") {
      const op = src[i++];
      const r = factor();
      if (op === "/" && r === 0) throw new Error("Div0");
      v = op === "×" ? v * r : v / r;
    }
    return v;
  };

  const expression = () => {
    let v = term();
    while (peek() === "+" || peek() === "−") {
      const op = src[i++];
      const r = term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  };

  const result = expression();
  if (i < src.length) throw new Error("Invalid");
  return result;
};

const format = (n) =>
  String(parseFloat(n.toPrecision(12))).replace("-", "−");

const KEYS = [
  { label: "C", action: "clear", type: "fn" },
  { label: "DEL", action: "delete", type: "fn", aria: "Delete" },
  { label: "%", action: "percent", type: "fn", aria: "Percent" },
  { label: "/", action: "/", type: "op" },

  { label: "7", action: "7", type: "num" },
  { label: "8", action: "8", type: "num" },
  { label: "9", action: "9", type: "num" },
  { label: "×", action: "×", type: "op" },

  { label: "4", action: "4", type: "num" },
  { label: "5", action: "5", type: "num" },
  { label: "6", action: "6", type: "num" },
  { label: "−", action: "−", type: "op" },

  { label: "1", action: "1", type: "num" },
  { label: "2", action: "2", type: "num" },
  { label: "3", action: "3", type: "num" },
  { label: "+", action: "+", type: "op" },

  { label: "0", action: "0", type: "num", wide: true },
  { label: ".", action: ".", type: "num" },
  { label: "=", action: "equals", type: "op" },
];

const STYLES = {
  num: "bg-[hsl(0,0%,28%)] hover:bg-[hsl(0,0%,36%)] active:bg-[hsl(0,0%,42%)] text-white",
  fn: "bg-[hsl(0,0%,62%)] hover:bg-[hsl(0,0%,70%)] active:bg-[hsl(0,0%,76%)] text-black",
  op: "bg-[hsl(35,100%,50%)] hover:bg-[hsl(35,100%,58%)] active:bg-[hsl(35,100%,65%)] text-white",
};

export default function Calculator() {
  const [expr, setExpr] = useState("");
  const [prev, setPrev] = useState("");
  const [done, setDone] = useState(false); // true right after "="
  const [error, setError] = useState("");

  const clear = () => {
    setExpr("");
    setPrev("");
    setDone(false);
    setError("");
  };

  const del = () => {
    if (error) return clear();
    setExpr((e) => e.slice(0, -1));
    setPrev("");
    setDone(false);
  };

  const percent = () => {
    if (error) return;
    const m = expr.match(/(\d*\.?\d+)$/);
    if (!m) return;
    const val = format(parseFloat(m[1]) / 100);
    setExpr(expr.slice(0, -m[1].length) + val);
    setDone(false);
  };

  const input = (v) => {
    if (error) {
      setError("");
      setExpr("");
      setPrev("");
    }
    const isOp = OPS.includes(v);
    const current = error ? "" : expr;

    if (isOp) {
      if (current === "") {
        if (v === "−") setExpr("−");
        return;
      }
      if (current === "−") return;
      const last = current.slice(-1);
      setExpr(OPS.includes(last) ? current.slice(0, -1) + v : current + v);
      setPrev("");
      setDone(false);
      return;
    }

    // digit or decimal point
    const base = done && !error ? "" : current;
    const segment = base.split(/[+−×÷]/).pop();

    if (v === ".") {
      if (segment.includes(".")) return;
      setExpr(base + (segment === "" ? "0." : "."));
    } else if (segment === "0") {
      setExpr(base.slice(0, -1) + v); // avoid leading zeros like "05"
    } else {
      setExpr(base + v);
    }
    setPrev("");
    setDone(false);
  };

  const calculate = () => {
    if (!expr || done || error) return;
    const cleaned = expr.replace(/[+−×/\.]+$/, "");
    if (!cleaned || cleaned === "−") return;
    try {
      const result = evaluate(cleaned);
      setPrev(cleaned + " =");
      setExpr(format(result));
      setDone(true);
    } catch (e) {
      setError(e.message === "Div0" ? "Can't divide by 0" : "Invalid input");
    }
  };

  const handle = (action) => {
    if (action === "clear") clear();
    else if (action === "delete") del();
    else if (action === "percent") percent();
    else if (action === "equals") calculate();
    else input(action);
  };

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key;
      if (/^[0-9.]$/.test(k)) input(k);
      else if (k === "+") input("+");
      else if (k === "-") input("−");
      else if (k === "*" || k === "x") input("×");
      else if (k === "/") {
        e.preventDefault();
        input("÷");
      } else if (k === "%") percent();
      else if (k === "Enter" || k === "=") {
        e.preventDefault();
        calculate();
      } else if (k === "Backspace") del();
      else if (k === "Escape" || k.toLowerCase() === "c") clear();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const shown = error || expr || "0";
  const size =
    shown.length > 14
      ? "text-2xl"
      : shown.length > 9
      ? "text-3xl"
      : "text-5xl";

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Intro write-up */}
      <div className="px-6 md:px-16 lg:px-24 pt-8 pb-4">
        <h1 className="text-black font-bold text-2xl mb-2">Hello, Calculator.</h1>
        <p className="text-gray-500 max-w-2xl">
          Calculator for simple math operations and equations.
        </p>
      </div>

      {/* Calculator */}
      <div className="flex justify-center items-center py-10">
        <div
          id="calculator"
          className="font-sans w-[95%] max-w-[350px] sm:max-w-[400px] bg-[hsl(0,0%,12%)] rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Display */}
          <div
            id="display"
            aria-live="polite"
            className="px-6 pt-8 pb-4 text-right min-h-[140px] flex flex-col justify-end"
          >
            <div className="h-6 text-sm text-gray-400 truncate">{prev}</div>
            <div
              className={`${size} ${
                error ? "text-red-400" : "text-white"
              } font-light break-all leading-tight`}
            >
              {shown}
            </div>
          </div>

          {/* Keys */}
          <div id="keys" className="grid grid-cols-4 gap-3 p-4 sm:p-5">
            {KEYS.map((k) => (
              <button
                key={k.label}
                type="button"
                aria-label={k.aria}
                onClick={() => handle(k.action)}
                className={`${STYLES[k.type]} ${
                  k.wide ? "col-span-2" : ""
                } h-[64px] sm:h-[72px] rounded-full text-xl sm:text-2xl font-medium cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}