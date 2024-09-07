import React, { useEffect } from "react";

const WordCard = ({ word }) => {
  const [originalWord, setOriginalWord] = React.useState("");

  const [isRevealed, setIsRevealed] = React.useState(false);

  const onRevealEnglishClick = () => {
    setOriginalWord(word.original);
    setIsRevealed(true);
  };

  useEffect(() => {
    setOriginalWord(word.original.replaceAll(/./g, "*"));
    setIsRevealed(false);
  }, [word]);

  return (
    <div className="grow bg-teal-950 rounded-lg align-middle flex justify-center p-4 flex-col">
      <div className="flex justify-center flex-col items-center gap-16 grow">
        <h1 className="text-7xl text-pretty">{word.localized}</h1>
        <span className="text-3xl text-pretty">{originalWord}</span>
      </div>
      <input
        type="button"
        value="Reveal"
        className={`p-2 h-10 justify-center align-middle items-center text-center w-full mt-4 rounded-lg !my-0 ${
          isRevealed ? "invisible" : "visible"
        }`}
        onClick={onRevealEnglishClick}
      />
    </div>
  );
};

export default WordCard;
