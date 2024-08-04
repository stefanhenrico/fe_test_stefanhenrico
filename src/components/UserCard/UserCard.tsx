import { useAppDispatch, useAppSelector } from "@/store/hooks/useStoreHooks";
import { setGlobal } from "@/store/slices/globalSlice";
import { UserType } from "@/types/user";
import {
  partiallyHideEmail,
  partiallyHidePhoneNumber,
} from "@/utils/contactDetails";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEvent, FC, useState } from "react";

type UserCardProps = {
  user: UserType;
};

const UserCard: FC<UserCardProps> = ({ user }) => {
  const [showPuzzle, setShowPuzzle] = useState<boolean>(false);
  const [puzzleAnswer, setPuzzleAnswer] = useState<number>(0);
  const [leftSideOfEquation, setLeftSideOfEquation] = useState<number>(0);
  const [rightSideOfEquation, setRightSideOfEquation] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const { showDetails, incorrectAttempts = 0 } = useAppSelector(
    (state) => state.global
  );

  const dispatch = useAppDispatch();

  const { name, website, company, email, phone } = user;
  const { name: companyName, bs, catchPhrase } = company;

  const handleViewContactDetails = () => {
    setLeftSideOfEquation(getRandomNumber());
    setRightSideOfEquation(getRandomNumber());
    setShowPuzzle(true);
  };

  const getRandomNumber = () => {
    return Math.round(Math.random() * (49 - 1));
  };

  const handleAnswerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPuzzleAnswer(parseInt(e.target.value));
  };

  const handleSolvePuzzle = () => {
    const isCorrect = leftSideOfEquation + rightSideOfEquation === puzzleAnswer;

    if (isCorrect) {
      dispatch(
        setGlobal({
          showDetails: true,
          incorrectAttempts: 0,
        })
      );
      handleCancelPuzzle();
    } else if (!isCorrect) {
      dispatch(
        setGlobal({
          showDetails: false,
          incorrectAttempts: incorrectAttempts + 1,
        })
      );
      setIncorrect(true);
    }
  };

  const handleCancelPuzzle = () => {
    setLeftSideOfEquation(0);
    setRightSideOfEquation(0);
    setShowPuzzle(false);
    setIncorrect(false);
  };

  const emailAddress = showDetails ? email : partiallyHideEmail(email);
  const phoneNumber = showDetails ? phone : partiallyHidePhoneNumber(phone);
  const hideDetails = !showDetails && incorrectAttempts >= 2;

  return (
    <Box mb={4}>
      <Card>
        <CardBody>
          <Heading size="lg">{name}</Heading>

          {!hideDetails && (
            <VStack spacing={0} align="start">
              <Text fontSize="sm">{emailAddress}</Text>
              <Text fontSize="sm">{phoneNumber}</Text>
              {showPuzzle && (
                <HStack my={2}>
                  <Text>
                    {leftSideOfEquation} + {rightSideOfEquation} ={" "}
                  </Text>
                  <Input
                    type="number"
                    maxW={16}
                    onChange={handleAnswerOnChange}
                    maxLength={99}
                    textAlign="center"
                    borderColor={incorrect ? "red.500" : "gray.200"}
                  />
                  <Text>?</Text>
                  <Button p={2} variant="solid" onClick={handleSolvePuzzle}>
                    Submit
                  </Button>
                  <Button p={2} variant="solid" onClick={handleCancelPuzzle}>
                    Cancel
                  </Button>
                </HStack>
              )}
              {!showPuzzle && !showDetails && (
                <Button
                  p={2}
                  my={2}
                  variant="solid"
                  onClick={handleViewContactDetails}
                >
                  View full contact details
                </Button>
              )}
              <Link href={`https://${website}`}>{website}</Link>
            </VStack>
          )}

          <Heading size="xs" mt={4} textTransform="uppercase">
            Company details:
          </Heading>
          <Heading size="md">{companyName}</Heading>
          <Text fontSize="sm">- {catchPhrase}</Text>
          <Text fontSize="sm">- {bs}</Text>
        </CardBody>
      </Card>
    </Box>
  );
};
export default UserCard;
