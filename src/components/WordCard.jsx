import React, { useCallback, useEffect } from "react";

const WordCard = ({ word, isOriginalToTranslated }) => {
  const [visibleWord, setVisibleWord] = React.useState(
    isOriginalToTranslated ? word.original : word.localized
  );
  const [hiddenWord, setHiddenWord] = React.useState(
    (isOriginalToTranslated ? word.original : word.localized).replaceAll(
      /./g,
      "*"
    )
  );
  const [revealedWord, setRevealedWord] = React.useState(
    isOriginalToTranslated ? word.localized : word.original
  );

  const [isRevealed, setIsRevealed] = React.useState(false);

  const onRevealHiddenClick = useCallback(() => {
    setIsRevealed(true);
  }, []);

  useEffect(() => {
    setIsRevealed(false);

    if (isOriginalToTranslated) {
      setVisibleWord(word.original);
      setRevealedWord(word.localized);
      setHiddenWord(word.original.replaceAll(/./g, "*"));

      return;
    }

    setVisibleWord(word.localized);
    setRevealedWord(word.original);
    setHiddenWord(word.localized.replaceAll(/./g, "*"));
  }, [isOriginalToTranslated, word]);

  return (
    <div className="grow bg-teal-950 rounded-lg align-middle flex justify-center p-4 flex-col">
      <div className="flex justify-center flex-col items-center gap-16 grow">
        <h1 className="text-7xl text-pretty">{visibleWord}</h1>
        {!isRevealed && (
          <span className="text-3xl text-pretty">{hiddenWord}</span>
        )}
        {isRevealed && (
          <span className="text-3xl text-pretty">{revealedWord}</span>
        )}
      </div>
      <button
        className={`p-2 h-10 justify-center align-middle items-center text-center w-full mt-4 rounded-lg !my-0 ${
          isRevealed ? "invisible" : "visible"
        }`}
        onClick={onRevealHiddenClick}
      >
        Reveal
      </button>
    </div>
  );
};

export default WordCard;
