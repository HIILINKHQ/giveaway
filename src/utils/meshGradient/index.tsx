"use client"

import { Box } from "@chakra-ui/react";
import { MAXW } from "../globals";




const AnimatedMeshGradient: React.FC = () => {

  return (
    <Box pos="fixed" top="0" left="0" right="0" bottom="0">
      <div style={{ position: 'relative', height: '100vh' }}>
            {/* Background using ::before pseudo-element */}
            <div style={{
              opacity: 0.7,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // Ensure background is behind content
                backgroundColor: 'black',
                backgroundImage: `
                    radial-gradient(circle at 52% 73%, rgb(43, 44, 129) 0px, transparent 50%),
                    radial-gradient(circle at 0% 30%, rgb(70, 27, 139) 0px, transparent 50%),
                    radial-gradient(circle at 41% 26%, rgb(106, 77, 212) 0px, transparent 50%),
                    radial-gradient(circle at 41% 51%, rgb(46, 126, 153) 0px, transparent 50%),
                    radial-gradient(circle at 41% 88%, rgb(253, 96, 162) 0px, transparent 50%),
                    radial-gradient(circle at 76% 73%, rgb(38, 34, 44) 0px, transparent 50%),
                    radial-gradient(circle at 29% 37%, rgb(50, 40, 94) 0px, transparent 50%)`,
                backgroundSize: '100% 100%',
                filter: 'blur(80px)',
                animation: "moveBackground 20s linear  infinite"
            }}></div>
  
        </div>
    </Box>
  );
};

export default AnimatedMeshGradient;
