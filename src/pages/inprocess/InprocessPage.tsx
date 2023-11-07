import { FC, memo } from "react";

const InprocessPage: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
      <p>Функционал в процессе разработки.</p>
    </>
  );
};

export default memo(InprocessPage);
