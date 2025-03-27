import { orbitron } from "@/fonts";
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
    const days = Math.floor(seconds / 3600 / 24 );
    const hours = Math.floor(seconds / 3600) - (days * 24);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days : days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: Number(remainingSeconds).toFixed(0).padStart(2, "0"),
    };
  };

  const {days,  hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <HStack fontWeight={400} className={orbitron.className} spacing="6px">
        <Text className="fade-in" key={days}>
        {days} 
      </Text>
      <Text>:</Text>
      <Text className="fade-in" key={hours}>
        {hours} 
      </Text>
      <Text>:</Text>
      <Text className="fade-in" key={minutes}>
        {minutes} 
      </Text>
      <Text>:</Text>
      <Text className="fade-in" key={seconds}>
        {seconds}
      </Text>
    </HStack>
  );
};

export default Timer;