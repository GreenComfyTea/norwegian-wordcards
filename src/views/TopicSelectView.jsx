import TopicCheckbox from "components/TopicCheckbox";
import { useCallback, useState } from "react";

const TopicSelectView = ({
  topics,
  selectedTopicsState,
  onOriginalToTranslatedClick,
  onTranslatedToOriginalClick,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSelectedTopics] = selectedTopicsState;
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const onTopicSelectedChange = useCallback(() => {
    setSelectedTopics(topics.filter((topic) => topic.isSelected));
    setAreButtonsDisabled(topics.every((topic) => !topic.isSelected));
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
      <button
        className="p-2 h-10 justify-center
        align-middle items-center text-center w-full mt-4 rounded-lg
        !my-0"
        onClick={onOriginalToTranslatedClick}
        disabled={areButtonsDisabled}
      >
        Norwegian ➔ Russian
      </button>
      <button
        className="p-2 h-10 justify-center
        align-middle items-center text-center w-full mt-4 rounded-lg
        !my-0"
        onClick={onTranslatedToOriginalClick}
        disabled={areButtonsDisabled}
      >
        Russian ➔ Norwegian
      </button>
    </div>
  );
};

export default TopicSelectView;
