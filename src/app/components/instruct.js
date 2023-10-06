import {
    Portal,
    PopoverFooter,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    HStack,
    Button
} from "@chakra-ui/react";


export default function Instruct() {
    return (
        <Popover>
        <PopoverTrigger>
            <Button
                size="xs"
                colorScheme="black"
                variant="outline"
                _hover={{ bg: "lightgrey" }}>
                {"?"}
            </Button>
        </PopoverTrigger>
        <Portal>
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>{"Instructions"}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    {"Just guess."}
                </PopoverBody>
            </PopoverContent>
        </Portal>
    </Popover>
    )
}