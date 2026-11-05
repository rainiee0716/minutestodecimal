import { Composition } from "remotion";
import { IntroVideo } from "./Video";

// 1080p / 30fps / 36s：YouTube 主力格式
export const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="IntroVideo"
      component={IntroVideo}
      durationInFrames={1080}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
