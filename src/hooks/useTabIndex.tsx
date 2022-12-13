import { useState } from "react";

export default function useTabIndex() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastIndex = currentIndex === 2;
  const inFirstIndex = currentIndex === 0;
  const isPrev = currentIndex !== 0;

  const onNext = () => !isLastIndex && setCurrentIndex((prev) => prev + 1);
  const onPrev = () => !inFirstIndex && setCurrentIndex((prev) => prev - 1);
  const resetTabIndex = () => setCurrentIndex(0);
  return {
    currentIndex,
    setCurrentIndex,
    onNext,
    onPrev,
    isPrev,
    resetTabIndex,
    isLastIndex,
  };
}
