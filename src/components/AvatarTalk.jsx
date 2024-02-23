


import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, useFBX } from '@react-three/drei'
import { subscribe } from '../events'


export function AvatarTalk({ shouldTalk,setAnimationDuration, ...props }) {
  console.log("setAnimationDuration",setAnimationDuration )
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/AvatarTalk.glb')
  const { actions } = useAnimations(animations, group)
  console.log("actions ----",actions);

  const {scene,animations : idleAnimation} = useFBX("/models/avatarbreathing.fbx");
  idleAnimation[0].name = "idlemen";
  const {actions : idleaction } = useAnimations([idleAnimation[0]], group);
  console.log("fbx file scene",scene);
  console.log("action -----idle---",idleaction);
  // console.log("actions   animation ----",idleaction[[animation]]);

  // idleAnimation[0].name = "idlemen";
  // console.log("idleAnimation---",idleAnimation);


  
  //  useEffect(()=>{
  //   idleaction.idlemen.play();
  //  },[])

 
  
  
   
useEffect(()=>{
console.log("Subscribe it")
subscribe("startAnimation",StartTalk)
  // window.addEventListener("startAnimation",(e)=>{ StartTalk(e);});
},[]);

function StartTalk(data){
  console.log("REceived data ",data)
var talk=data.detail.talk;
//var talk=data.detail.talk;

    if (talk==true) {
      
      actions.talk.play();
    
      idleaction.idlemen.stop()
      
      console.log("Enetered", "for Talk***********")
     
      
    } else {  
      console.log("Enetered", "DStop")

      
      actions.talk.stop();
      idleaction.idlemen.reset().fadeIn(0.8).play();

      // group.current.position.set(0, 1, 2);
      
    
      
    }
 

 
}

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials.Bodymat} skeleton={nodes.Body.skeleton} />
          <skinnedMesh name="Bottoms" geometry={nodes.Bottoms.geometry} material={materials.Bottommat} skeleton={nodes.Bottoms.skeleton} />
          <skinnedMesh name="Eyelashes" geometry={nodes.Eyelashes.geometry} material={materials.Eyelashmat} skeleton={nodes.Eyelashes.skeleton} />
          <skinnedMesh name="Eyes" geometry={nodes.Eyes.geometry} material={materials.Bodymat} skeleton={nodes.Eyes.skeleton} />
          <skinnedMesh name="Hair" geometry={nodes.Hair.geometry} material={materials.Hairmat} skeleton={nodes.Hair.skeleton} />
          <skinnedMesh name="Shoes" geometry={nodes.Shoes.geometry} material={materials.Shoesmat} skeleton={nodes.Shoes.skeleton} />
          <skinnedMesh name="Tops" geometry={nodes.Tops.geometry} material={materials.Topmat} skeleton={nodes.Tops.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/AvatarTalk.glb')
