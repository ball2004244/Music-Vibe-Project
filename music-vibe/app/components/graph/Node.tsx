import { Graphics } from "@pixi/react"
import * as PIXI from "pixi.js"
import React from "react"

export type Draw = (g: PIXI.Graphics) => void

interface NodeProps {
  x: number
  y: number
  radius: number
  id: string
}

export const Node = (props: NodeProps) => {
  const draw = React.useCallback<Draw>(
    (g: PIXI.Graphics) => {
      g.clear()
      g.lineStyle(0)
      g.beginFill(0xa39af7)
      g.drawCircle(props.x, props.y, props.radius)
      g.endFill()
    },
    [props]
  )

  return <Graphics draw={draw}/>
}