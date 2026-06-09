import { createSignal, onCleanup, onMount } from 'solid-js'

type ScrollerOptions = {
  trackWidth?: number
  thumbWidth?: number
}

type PointerEventLike = MouseEvent | TouchEvent

export function useHorizontalScroller(options: ScrollerOptions = {}) {
  const trackWidth = options.trackWidth ?? 250
  const thumbWidth = options.thumbWidth ?? 36
  const maxTranslate = trackWidth - thumbWidth
  const [scrollProgress, setScrollProgress] = createSignal(0)

  let scrollRef: HTMLDivElement | undefined
  let trackRef: HTMLDivElement | undefined
  let isDragging = false

  const syncScrollProgress = () => {
    if (!scrollRef) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef
    if (scrollWidth > clientWidth) {
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth))
    } else {
      setScrollProgress(0)
    }
  }

  const updateScrollPosition = (clientX: number) => {
    if (!trackRef || !scrollRef) return

    const trackRect = trackRef.getBoundingClientRect()
    let nextProgress = (clientX - trackRect.left - thumbWidth / 2) / maxTranslate
    nextProgress = Math.max(0, Math.min(1, nextProgress))

    const { scrollWidth, clientWidth } = scrollRef
    scrollRef.scrollLeft = nextProgress * (scrollWidth - clientWidth)
    setScrollProgress(nextProgress)
  }

  const stopDragging = () => {
    isDragging = false
    document.removeEventListener('mousemove', handlePointerMove as EventListener)
    document.removeEventListener('mouseup', stopDragging)
    document.removeEventListener('touchmove', handlePointerMove as EventListener)
    document.removeEventListener('touchend', stopDragging)
  }

  const handlePointerMove = (event: PointerEventLike) => {
    if (!isDragging) return

    if ('cancelable' in event && event.cancelable) {
      event.preventDefault()
    }

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0]?.clientX
    if (typeof clientX === 'number') {
      updateScrollPosition(clientX)
    }
  }

  const startDragging = () => {
    isDragging = true
    document.addEventListener('mousemove', handlePointerMove as EventListener)
    document.addEventListener('mouseup', stopDragging)
    document.addEventListener('touchmove', handlePointerMove as EventListener, { passive: false })
    document.addEventListener('touchend', stopDragging)
  }

  const bindScrollRef = (el: HTMLDivElement | undefined) => {
    scrollRef = el
  }

  const bindTrackRef = (el: HTMLDivElement | undefined) => {
    trackRef = el
  }

  const handleScroll = () => {
    syncScrollProgress()
  }

  const handleThumbMouseDown = () => {
    startDragging()
  }

  const handleThumbTouchStart = () => {
    startDragging()
  }

  onMount(() => {
    syncScrollProgress()
    window.addEventListener('resize', syncScrollProgress)

    onCleanup(() => {
      window.removeEventListener('resize', syncScrollProgress)
      stopDragging()
    })
  })

  return {
    bindScrollRef,
    bindTrackRef,
    handleScroll,
    handleThumbMouseDown,
    handleThumbTouchStart,
    maxTranslate,
    scrollProgress,
    thumbWidth,
    trackWidth,
  }
}
