import { HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const calculateTimeLeft = (targetTimestamp: number) => {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  return Math.max(targetTimestamp - now, 0); // Ensure timeLeft is not negative
};

const Timer = ({ targetTimestamp }: { targetTimestamp: number }) => {
 

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTimestamp));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetTimestamp);
      setTimeLeft(newTimeLeft);

      // Stop the timer when the target time is reached
      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [targetTimestamp]);



  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: Number(remainingSeconds).toFixed(0).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <HStack>
      <Text className="fade-in" key={hours}>
        {hours} :
      </Text>
      <Text className="fade-in" key={minutes}>
        {minutes} :
      </Text>
      <Text className="fade-in" key={seconds}>
        {seconds}
      </Text>
    </HStack>
  );
};

export default Timer;