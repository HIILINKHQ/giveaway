import { HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Timer = ({ initialTime }: { initialTime: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: remainingSeconds.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <HStack>
      <Text className="fade-in">{hours} :</Text>
      <Text className="fade-in">{minutes} :</Text>
      <Text className="fade-in">{seconds}</Text>
    </HStack>
  );
};

export default Timer;
