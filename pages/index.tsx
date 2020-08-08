import Head from 'next/head'
import {
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  List,
  ListItem,
  Icon,
} from '@chakra-ui/core'

import {FiGithub} from 'react-icons/fi'

export default function Index() {
  return (
    <Flex flexDirection="column" height="100vh">
      <Flex width="100vw" flexDirection="row-reverse">
        <Icon margin="4" size="8" as={FiGithub} />
      </Flex>
      <Flex flexGrow={1} alignItems="center" justifyContent="center">
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
        <Stack maxW="4xl">
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
          <Flex marginTop={8} justifyContent="center">
            <Button minWidth="sm" variantColor="blue">
              Download for macOS
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  )
}
