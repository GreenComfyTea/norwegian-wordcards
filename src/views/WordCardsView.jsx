import WordCard from "components/WordCard";
import React, { useCallback, useEffect, useState } from "react";

// @ts-ignore
const WordCardsView = ({ topics, onBackClick }) => {
  const [currentWord, setCurrentWord] = useState(undefined);

  const pickRandomWord = useCallback(() => {
    if (topics.length === 0) return;

    let currentWord_ = currentWord ?? {};
    let newWord = currentWord_;
    while (currentWord_.original === newWord.original) {
      const randomTopicIndex = Math.floor(topics.length * Math.random());
      const topic = topics[randomTopicIndex];

      if (topic.words.length === 0) continue;

      const randomWordIndex = Math.floor(topic.words.length * Math.random());
      newWord = topic.words[randomWordIndex];
    }

    setCurrentWord(newWord);
  }, [currentWord, topics]);

  const onNextClick = useCallback(() => {
    pickRandomWord();
  }, [pickRandomWord]);

  useEffect(() => {
    if (currentWord !== undefined) return;

    pickRandomWord();
  }, [currentWord, pickRandomWord]);

  return (
    <div className="w-full flex justify-end sm:justify-center flex-col gap-4">
      <div className="flex overflow-y-auto grow">
        {currentWord && <WordCard word={currentWord} />}
      </div>
      <div>
        <div className="flex flex-row gap-4">
          <input
            type="button"
            value="Back"
            className="p-2 h-10 justify-center align-middle items-center text-center w-full mt-4 rounded-lg !my-0"
            onClick={onBackClick}
          />
          <input
            type="button"
            value="Next"
            className="p-2 h-10 justify-center align-middle items-center text-center w-full mt-4 rounded-lg !my-0"
            onClick={onNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default WordCardsView;
