import Head from 'next/head'
import Link from 'next/link'
import {Flex, Heading, Stack, Text, Button} from '@chakra-ui/core'

export default function ErrorPage404() {
  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Strapless - 404 Page Not Found</title>
        <meta
          property="og:title"
          content="Strapless - 404 Page Not Found"
          key="title"
        />
        <meta
          name="description"
          content="Strapless - 404 Page Not Found"
          key="description"
        />
      </Head>
      <Flex flexGrow={1} alignItems="center" justifyContent="center">
        <Stack width={{sm: '100vw', lg: '4xl'}} paddingX="8">
          <Heading
            textAlign="center"
            as="h1"
            color="blue.500"
            fontWeight="bolder"
            fontSize="4xl"
            letterSpacing="tight"
            lineHeight="taller"
          >
            404 - Page Not Found
          </Heading>
          <Text
            marginTop={4}
            fontSize="lg"
            color="gray.900"
            fontWeight="thin"
            lineHeight="tall"
          >
            Sorry, the page you're looking for doesn't exist. If you think this
            page should exist, please open an issue on GitHub. Otherwise, follow
            the link below to go back to the homepage.
          </Text>
          <Flex marginTop={8} justifyContent="center">
            <Link href="/">
              <Button
                width={{md: 'sm'}}
                variantColor="blue"
                fontWeight="extrabold"
              >
                Back to homepage
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  )
}
