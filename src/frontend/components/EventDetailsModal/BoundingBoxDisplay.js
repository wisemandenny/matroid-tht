import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BoundingBoxColor, BoundingBoxWidth } from '../../../utils/Constants'

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
    
  },
  canvas: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
    height: '60vh',
    width: '80vw',
    objectFit: 'contain'

  }
}))



export default function BoundingBoxDisplay(props) {
  const { imageSource, boundingBox } = props
  const classes = useStyles()
  const canvas = React.useRef()
  let ctx = null

  React.useEffect(() => {
    const canvasElement = canvas.current
    canvasElement.width = canvasElement.clientWidth
    canvasElement.height = canvasElement.clientHeight

    ctx = canvasElement.getContext("2d")
    const background = new Image()
    background.src = imageSource
    background.onload = function() {
      ctx.drawImage(background, 0, 0, background.naturalWidth, background.naturalHeight, 0, 0, ctx.canvas.width, ctx.canvas.height)
      const x = parseInt(boundingBox.left * ctx.canvas.width)
      const y = parseInt(boundingBox.top * ctx.canvas.height)
      const w = parseInt(boundingBox.width * ctx.canvas.width)
      const h = parseInt(boundingBox.height * ctx.canvas.height)
      ctx.beginPath()
      ctx.strokeStyle = BoundingBoxColor
      ctx.lineWidth = BoundingBoxWidth
      ctx.rect(x, y, w, h)
      ctx.stroke()
    }
  }, [boundingBox])

  return (
    <div className={classes.canvasContainer}>
      <canvas className={classes.canvas} ref={canvas}>
      </canvas>
    </div>
  )
}