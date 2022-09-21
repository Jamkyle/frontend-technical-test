import { useContext, useEffect } from "react";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { UserContext } from "src/context/UserContext";

import { Conversation } from "src/types/conversation";

import config from "config/constants.json";
import Error from "src/components/Error";
import ListComponent from "src/components/ListComponent";

const Chat = ({ conversations, error }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  // check if user is connected else redirect to login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  if (error) {
    return <Error message={error} />;
  }
  return <ListComponent items={conversations} />;
};

export const getStaticProps = async ({ params }) => {
  const { uid } = params;
  if (!uid || (typeof uid === "string" && uid === "undefined")) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  try {
    const res = await fetch(`${config.API.URL}/conversations/${uid}/`);
    const conversations: Conversation[] = await res.json();

    if (!conversations.length) {
      return {
        notFound: true,
        props: {},
      };
    }

    return {
      props: {
        conversations,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Something went wrong!",
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default Chat;
