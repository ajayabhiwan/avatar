
import {Environment} from '@react-three/drei';
import { Suspense } from 'react';

import { AvatarTalk } from "./AvatarTalk";

export const Experience = () => {
  return (
    <>
     <ambientLight/>
      
      <Suspense fallback={null}>
      <mesh>
      <AvatarTalk />
      </mesh>
      </Suspense>
      
      <Environment preset='sunset'/>
    </>
  );
};
