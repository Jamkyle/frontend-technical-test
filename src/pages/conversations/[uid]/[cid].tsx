import { InferGetStaticPropsType, GetStaticPaths } from "next";
import config from "config/constants.json";
import { Message } from "types/message";
import Bubble from "src/components/Bubble";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useRef } from "react";
import { UserContext } from "src/context/UserContext";
import { useRouter } from "next/router";

import styles from "src/styles/Conversation.module.css";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Conversation = ({ messages, cid }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const input = useRef(null);
  const { picture, nickname } = router.query;
  let prevMessageAuthor = null;
  const handleSendMessage = () => {
    if (input.current.value !== "") {
      fetch(`${config.API.URL}/messages/${cid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + user.token,
        },
        body: JSON.stringify({
          conversationId: cid,
          body: input.current.value,
          authorId: user?.id,
          timestamp: Date.now(),
        }),
      }).then(() => (input.current.value = ""));
    }
  };
  const backHandler = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div onClick={backHandler}>back</div>
        <img className={styles.picture} src={decodeURI(picture as string)} />
        <span className={styles.nickname}>{nickname}</span>
      </header>
      <main className={styles.messageContent}>
        {messages?.length > 0 ? (
          messages?.map((message) => {
            let messageAuthor = nickname;
            const finalClassName: string[] = [styles.message];
            if (message.authorId === user?.id) {
              finalClassName.push(styles["side-right"]);
              finalClassName.push(styles["me"]);
              messageAuthor = "me";
            }
            const authorIsDisplaying = prevMessageAuthor !== messageAuthor;
            prevMessageAuthor = messageAuthor;
            return (
              <Bubble
                key={`message-${message.id}`}
                message={message}
                author={authorIsDisplaying && messageAuthor}
                className={finalClassName.join(" ")}
              />
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No message found</p>
        )}
      </main>
      <div className={styles.inputConversation}>
        <textarea id="conversation" ref={input} />
        <FontAwesomeIcon
          className={styles.sendIcon}
          icon={faPaperPlane}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { cid } = params;
  try {
    const res = await fetch(`${config.API.URL}/messages/${cid}`);
    const messages: Message[] = await res.json();
    if (!messages) {
      return {
        notFound: true,
        props: {},
      };
    }
    return {
      revalidate: 1,
      props: {
        cid,
        messages,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};

export default Conversation;
