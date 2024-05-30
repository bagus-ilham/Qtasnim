import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ title, description, status }) => {
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useCustomToast;
