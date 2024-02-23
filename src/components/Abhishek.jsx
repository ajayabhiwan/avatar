/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 abhishek.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function AbhishekModel(props) {
  const { nodes, materials } = useGLTF('/models/abhishek.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <primitive object={nodes.root} />
        <skinnedMesh geometry={nodes.rp_eric_rigged_001_geo.geometry} material={materials.rp_eric_rigged_001_mat} skeleton={nodes.rp_eric_rigged_001_geo.skeleton} />
      </group>
    </group>
  )
}

useGLTF.preload('/abhishek.glb')
