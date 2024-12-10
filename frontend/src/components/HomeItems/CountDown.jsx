import { useState, useEffect } from "react";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2093-01-01T00:00:00");

    const interval = setInterval(() => {
      const currentDate = new Date();
      const difference = targetDate - currentDate;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-main-div flex items-center justify-center flex-col h-40 w-full bg-mycolor4 shadow-lg p-4 mt-10 ">
      <p className="text-center text-2xl font-semibold text-white mb-2">
        2093 Yılına Kaldı!
      </p>
      <div className="flex flex-wrap items-center justify-center space-x-4 md:space-x-6">
        <div className="countdown-item text-center mb-4 md:mb-0">
          <p className="text-2xl font-bold text-white">{timeLeft.days}</p>
          <p className="text-sm text-white">Gün</p>
        </div>
        <div className="countdown-item text-center mb-4 md:mb-0">
          <p className="text-2xl font-bold text-white">{timeLeft.hours}</p>
          <p className="text-sm text-white">Saat</p>
        </div>
        <div className="countdown-item text-center mb-4 md:mb-0">
          <p className="text-2xl font-bold text-white">{timeLeft.minutes}</p>
          <p className="text-sm text-white">Dakika</p>
        </div>
        <div className="countdown-item text-center mb-4 md:mb-0">
          <p className="text-2xl font-bold text-white">{timeLeft.seconds}</p>
          <p className="text-sm text-white">Saniye</p>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
