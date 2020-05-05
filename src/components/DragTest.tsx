import React, { useState, useEffect } from 'react'

interface Point {
    x: number
    y: number
}

export default function DragTest() {
    const [start, setStart] = useState<Point>({x: 0, y: 0})
    const [end, setEnd] = useState<Point>({x: 0, y: 0})

    const [pressed, ev] = useClickedDocument()

    useEffect(() => {
        if(!ev) return
        let point = {
            x: ev.clientX,
            y: ev.clientY
        }
        if(pressed) {
            setStart(point)
            console.log('start ', point)
        } else {
            setEnd(point)
            console.log('end ', point)
        }
    }, [pressed, ev])

    return <div style={{...calculateSelectionBox(start, end), backgroundColor: 'red'}}></div>
}

function calculateSelectionBox(startPoint: Point, endPoint: Point) {
    //var parentNode = this.refs.selectionBox.getDOMNode();
    var left = Math.min(startPoint.x, endPoint.x)// - parentNode.offsetLeft;
    var top = Math.min(startPoint.y, endPoint.y)// - parentNode.offsetTop;
    var width = Math.abs(startPoint.x - endPoint.x);
    var height = Math.abs(startPoint.y - endPoint.y);
    return { left, top, width, height };
  }

function useClickedDocument(): [boolean, MouseEvent | undefined] {
    const [pressed, setPressed] = useState(false)
    const [ev, setEv] = useState<MouseEvent>()

    const a = (e: MouseEvent) => {
        setPressed(true)
        setEv(e)
    }
    const b = (e: MouseEvent) => {
        setPressed(false)
        setEv(e)
    }
    useEffect(() => {
      document.addEventListener('mousedown', a)
      document.addEventListener('mouseup', b)
      return () => {
        document.removeEventListener('mousedown', a)
        document.removeEventListener('mousedown', b)
      }
    })

    return [pressed, ev]
  }