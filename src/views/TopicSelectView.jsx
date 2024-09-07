import TopicCheckbox from "components/TopicCheckbox";
import { useCallback } from "react";

const TopicSelectView = ({ topics, selectedTopicsState, onStartClick }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedTopics, setSelectedTopics] = selectedTopicsState;

  const onTopicSelectedChange = useCallback(() => {
    setSelectedTopics(topics.filter((topic) => topic.isSelected));
  }, [setSelectedTopics, topics]);

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <div className="flex grow justify-end sm:justify-center overflow-y-auto flex-col">
        <div className="flex flex-wrap gap-4  h-fit">
          {topics.map((topic) => (
            <TopicCheckbox
              key={`${topic.name}-${2000000000 * Math.random()}`}
              topic={topic}
              onTopicSelectedChange={onTopicSelectedChange}
            />
          ))}
        </div>
      </div>

      <input
        type="button"
        value="Start"
        className="p-2 h-10 justify-center align-middle items-center text-center w-full mt-4 rounded-lg theme-light !my-0"
        onClick={onStartClick}
      />
    </div>
  );
};

export default TopicSelectView;
