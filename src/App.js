import TopicSelectView from "views/TopicSelectView";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import WordCardsView from "views/WordCardsView";

const App = () => {
  const [flowState, setFlowState] = useState("loading");

  const [topics, setTopics] = useState([]);

  const selectedTopicsState = useState([]);
  const [selectedTopics, setSelectedTopics] = selectedTopicsState;

  const fetchTopics = useCallback(() => {
    fetch(`${process.env.PUBLIC_URL}/words/topics.txt`, {
      credentials: "include",
      redirect: "error",
    })
      .then((response) => response.text())
      .then((text) => {
        const topics_ = text
          .replace("\r\n", "\n")
          .split("\n")
          .map((topic) => topic.trim())
          .filter((word) => word.length > 0)
          .sort()
          .map((topic) => {
            return {
              name: topic,
              isSelected: true,
              words: [],
            };
          });

        setTopics(topics_);
        setSelectedTopics(topics_);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setSelectedTopics]);

  const fetchWords = useCallback(() => {
    topics.forEach((topic) => {
      fetch(`${process.env.PUBLIC_URL}/words/topics/${topic.name}.txt`, {
        credentials: "include",
        redirect: "error",
      })
        .then((response) => response.text())
        .then((text) => {
          const words = text
            .replace("\r\n", "\n")
            .split("\n")
            .map((wordPair) => wordPair.trim())
            .filter((wordPair) => wordPair.length > 0)
            .sort()
            .map((wordPair) => {
              const wordPairArray = wordPair.split(":");
              if (wordPairArray.length !== 2)
                return { localized: wordPair, original: wordPair };

              return {
                localized: wordPairArray[0],
                original: wordPairArray[1],
              };
            });

          topic.words = words;
          setFlowState("topic-select");
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [topics]);

  const onStartClick = useCallback(() => {
    if (topics.every((topic) => !topic.isSelected)) return;

    setFlowState("wordcards");
  }, [topics]);

  const onBackClick = useCallback(() => {
    setFlowState("topic-select");
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords, topics]);

  return (
    <div className="font-['Roboto'] leading-3 p-4 h-screen flex justify-center align-middle items-center">
      {flowState === "loading" && (
        <div
          className="before:!w-10 before:!h-10 before:!bg-[length:2.5rem_auto]"
          aria-busy="true"
        ></div>
      )}
      {flowState === "topic-select" && (
        <TopicSelectView
          topics={topics}
          selectedTopicsState={selectedTopicsState}
          onStartClick={onStartClick}
        />
      )}
      {flowState === "wordcards" && (
        <WordCardsView topics={selectedTopics} onBackClick={onBackClick} />
      )}
    </div>
  );
};

export default App;
