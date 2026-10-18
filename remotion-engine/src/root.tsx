import React from "react";
import { Composition } from "remotion";
import { DsaExplainer } from "./video/DsaExplainer";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DsaExplainer"
    component={DsaExplainer}
    durationInFrames={450}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{ title: "LRU Cache", subtitle: "HashMap + Doubly Linked List" }}
  />
);
