import { Conversation } from "types/conversation";
import { loggedUserId } from "src/pages/_app";

import styles from "src/styles/Conversation.module.css";
import { useEffect, useState } from "react";
import config from "config/constants.json";
import { useRouter } from "next/router";

export default (conversation: Conversation) => {
  const [interlocutor, setInterlocutor] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchInterlocutor = async (id) => {
      const res = await fetch(`${config.API.URL}/user/${id}`);
      const user = await res.json();
      setInterlocutor({ ...user[0] });
    };
    const interlocutorId =
      conversation.recipientId === loggedUserId
        ? conversation.senderId
        : conversation.recipientId;
    fetchInterlocutor(interlocutorId);
  }, []);

  const handleClick = () => {
    router.push(
      `${router.asPath}/${conversation.id}?nickname=${
        interlocutor?.nickname
      }&picture=${encodeURI(interlocutor?.picture_url)}`
    );
  };
  return (
    interlocutor && (
      <div className={styles.listItem} onClick={handleClick}>
        <img width={40} height={40} src={interlocutor?.picture_url} />
        <span className={styles.nickname}>{interlocutor?.nickname}</span>
      </div>
    )
  );
};
