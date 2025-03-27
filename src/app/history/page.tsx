import PastMatches from "@/components/pastMatches"
import { MAXW } from "@/utils/globals"
import { Box } from "@chakra-ui/react"


const HistoryPage = () => {

    return (
        <Box w="100%" maxW={MAXW} mx="auto">
            <PastMatches />
        </Box>
    )
}

export default HistoryPage