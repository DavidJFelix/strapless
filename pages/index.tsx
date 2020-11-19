import Head from 'next/head'
import {
  Heading,
  Flex,
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Link,
} from '@chakra-ui/react'

import {FiGithub} from 'react-icons/fi'

export default function Index() {
  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Strapless - bootstrap your development system</title>
        <meta
          property="og:title"
          content="Strapless - bootstrap your development system"
          key="title"
        />
        <meta
          name="description"
          content="Strapless is a script to bootstrap your development system."
          key="description"
        />
      </Head>
      <Flex width="100vw" flexDirection="row-reverse">
        <Link
          href="https://github.com/DavidJFelix/strapless"
          isExternal
          aria-label="GitHub Repository"
          _hover={{color: 'blue.500'}}
        >
          <Icon margin="4" height="8" width="8" as={FiGithub} />
        </Link>
      </Flex>
      <Flex flexGrow={1} alignItems="center" justifyContent="center">
        <Flex direction="column" width={{sm: '100vw', lg: '4xl'}} paddingX="8">
          <Heading
            textAlign="center"
            as="h1"
            color="blue.500"
            fontWeight="bolder"
            fontSize="4xl"
            letterSpacing="tight"
            lineHeight="taller"
          >
            Strapless
          </Heading>
          <Text
            marginTop={4}
            fontSize="lg"
            color="gray.900"
            fontWeight="thin"
            lineHeight="tall"
          >
            Strapless is a script to bootstrap your development system. It does
            not assume you're using any particular language or doing any
            particular type of development but installs the minimal set of
            software needed to begin customizing your development machine. It
            sets safe and reasonable defaults and can be customized to use your
            own personal dotfiles.
          </Text>
          <Heading
            marginTop={6}
            as="h2"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="tight"
            lineHeight="tall"
          >
            To bootstrap your system:
          </Heading>
          <List
            marginTop={2}
            fontSize="lg"
            color="gray.900"
            fontWeight="thin"
            lineHeight="tall"
            as="ol"
            listStylePosition="outside"
            paddingLeft={8}
            spacing={4}
            styleType="decimal"
          >
            <ListItem>
              Download the strapless script that's been customized for your
              GitHub user. This will prompt for GitHub authorization for access
              to your email, public and private repositories; you'll need to
              provide access to any organizations whose repositories you need to
              be able git clone. This is used to add a GitHub access token to
              the strapless script and none of the information or access is
              otherwise used by this web application or stored anywhere.
            </ListItem>
            <ListItem>Run the strapless script in the terminal.</ListItem>
            <ListItem>
              Delete the customized strapless script (it has a GitHub token in
              it).
            </ListItem>
          </List>
          <Flex marginTop="8" justifyContent="center">
            <Link href="/api/strapless.sh">
              <Button
                width={{md: 'sm'}}
                colorScheme="blue"
                fontWeight="extrabold"
              >
                Download for macOS
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
