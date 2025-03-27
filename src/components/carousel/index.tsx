"use client";

import {  useEffect, useRef, useState } from "react";
import { Box, Text, Image, Flex, Center } from "@chakra-ui/react";
import { Swiper , SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MAXW } from "@/utils/globals";
import styles from "./carousel.module.css"
import { Swiper as SwiperType } from "swiper/types";
import { orbitron } from "@/fonts";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

type CarouselItem = {
  image: string;
  title: string;
  description: string;
  link ?: string
};

const DynamicSwiper: React.FC = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const swiperRef = useRef<SwiperType | null>(null); // Reference to the Swiper instance


    useEffect(() => {
    
  
      const fetchBanners = async () => {
        const { data, error } = await supabase.from("banners").select("*");
        if (error) {
          console.error(error);
        } else {
          setItems(data);
        }
      };
  
     
      fetchBanners();
    }, []);


  if (items.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" h="400px"   borderRadius="lg" bg="rgba(255,255,255,.05)">
        <Center position="relative" w="full" color="white" opacity={0.3}>
            Fetching ... 
        </Center>
      </Flex>
    );
  }

  return (
    <Box
      w="full"
      maxW={MAXW}
      mx="auto"
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={() => swiperRef.current?.autoplay.stop()} // Pause autoplay on hover
      onMouseLeave={() => swiperRef.current?.autoplay.start()} // Resume autoplay on leave
      className={`${styles["carousel-container"]} ${orbitron.className}` }
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={1}
        loop
        fadeEffect={{ crossFade: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Save Swiper instance to the ref
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.link ?? ""}>
            <Box position="relative" w="full" h="400px" overflow="hidden">
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                w="full"
                h="full"
                borderRadius="lg"
                className={styles["carousel-image"]}
              />
              <Box
                position="absolute"
                bottom="0"
                top="0"
                w="full"
                bg="linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1))"
                zIndex={0}
              />
              <Box
                position="absolute"
                bottom="0"
                w="full"
                bg="linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.001))"
                backdropFilter="blur(2px)"
                color="white"
                px="40px"
                py="20px"
                pb="40px"
                borderBottomRadius="lg"
                zIndex={1}
              >
                <Text fontSize="32px" fontWeight="bold" pb="16px">
                  {item.title}
                </Text>
                <Text fontSize="sm">{item.description}</Text>
              </Box>
            </Box></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default DynamicSwiper;
