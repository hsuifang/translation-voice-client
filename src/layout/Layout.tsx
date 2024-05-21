import { Outlet, Link } from 'react-router-dom';
import { Container, Box, Heading } from '@chakra-ui/react';

function Layout() {
  return (
    <>
      <Box as="header" display="flex" alignItems="center" boxShadow="md" p="12px 16px">
        <Link to="/">
          <Heading as="h1" fontSize="20px">
            title
          </Heading>
        </Link>
      </Box>
      <Container maxW="100%" padding={0}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
