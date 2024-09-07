import React, { useCallback, useState } from "react";

// @ts-ignore
const TopicCheckbox = ({ topic, onTopicSelectedChange }) => {
  const [isTopicSelected, setIsTopicSelected] = useState(topic.isSelected);

  const onTopicSelectedChangeInternal = useCallback(() => {
    topic.isSelected = !topic.isSelected;
    setIsTopicSelected(topic.isSelected);
    onTopicSelectedChange();
  }, [onTopicSelectedChange, topic]);

  return (
    <div
      className={`${
        topic.isSelected
          ? "bg-green-400 hover:bg-green-500 focus:bg-green-500 active:bg-green-600"
          : "bg-red-400 hover:bg-red-500 focus:bg-red-500 active:bg-red-600"
      } rounded-lg p-2.5 w-fit cursor-pointer flex-shrink-0 grow items-center align-middle justify-center flex h-fit`}
      onClick={onTopicSelectedChangeInternal}
    >
      <input
        type="checkbox"
        id={topic.name}
        name={topic.name}
        className="pointer-events-none m-0"
        checked={isTopicSelected}
        onChange={onTopicSelectedChangeInternal}
      />
      <label
        htmlFor={topic.name}
        className="pointer-events-none text-black pl-2"
      >
        {topic.name}
      </label>
    </div>
  );
};

export default TopicCheckbox;
