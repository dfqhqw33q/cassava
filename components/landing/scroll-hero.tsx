"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion, useMotionTemplate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Define the flavors in sequence
const FLAVORS = ["classic", "ube", "pandan", "strawberry"]
const FRAMES_PER_FLAVOR = 240
const TOTAL_FRAMES = FLAVORS.length * FRAMES_PER_FLAVOR

export function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Store 2D array of images [flavorIndex][frameIndex]
  const [images, setImages] = useState<HTMLImageElement[][]>([[], [], [], []])
  const [totalLoaded, setTotalLoaded] = useState(0)

  // Track scroll progress within the super tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Preload all exact 960 images
  useEffect(() => {
    let loadedCount = 0
    const newImages: HTMLImageElement[][] = [[], [], [], []]
    setTotalLoaded(0)

    FLAVORS.forEach((flavor, fIndex) => {
      for (let i = 1; i <= FRAMES_PER_FLAVOR; i++) {
        const img = new Image()
        const paddedIndex = i.toString().padStart(3, "0")
        img.src = `/${flavor}/ezgif-frame-${paddedIndex}.jpg`
        
        img.onload = () => {
          loadedCount++
          setTotalLoaded(loadedCount)
          // Render initial frame to canvas as soon as the very first one is loaded
          if (loadedCount === 1) {
            renderCanvas(0, newImages)
          }
        }
        newImages[fIndex].push(img)
      }
    })
    
    setImages(newImages)
    // We do an empty array dependency to only run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Helper function to draw an image centered and scaled to cover the canvas
  const drawImageToCover = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const canvasRatio = canvas.width / canvas.height
    const imgRatio = img.width / img.height
    
    let drawWidth = canvas.width
    let drawHeight = canvas.height
    let offsetX = 0
    let offsetY = 0

    if (canvasRatio > imgRatio) {
       drawHeight = canvas.width / imgRatio
       offsetY = (canvas.height - drawHeight) / 2
    } else {
       drawWidth = canvas.height * imgRatio
       offsetX = (canvas.width - drawWidth) / 2
    }

    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // Centralized render logic to handle the multi-flavor continuous transition
  const renderCanvas = (progress: number, imageArray = images) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context || imageArray.length === 0 || imageArray[0].length === 0) return

    // Map scroll progress (0 to 1) to (0 to 4)
    const v = progress * FLAVORS.length
    let flavorIndex = Math.floor(v)
    if (flavorIndex >= FLAVORS.length) flavorIndex = FLAVORS.length - 1
    
    let localProgress = v - flavorIndex
    // Cap at the very end
    if (flavorIndex === FLAVORS.length - 1 && v >= FLAVORS.length) {
       localProgress = 1
    }

    // Allocate 85% of each segment to normal frame scrubbing
    // Allow the remaining 15% to crossfade between flavors
    const CROSSFADE_START = 0.85

    let frameFloat = (localProgress / CROSSFADE_START) * (FRAMES_PER_FLAVOR - 1)
    if (localProgress >= CROSSFADE_START) {
        frameFloat = FRAMES_PER_FLAVOR - 1
    }
    
    const currentFrameIndex = Math.min(FRAMES_PER_FLAVOR - 1, Math.round(frameFloat))
    
    const img1 = imageArray[flavorIndex]?.[currentFrameIndex]
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    if (img1 && img1.complete) {
        // Evaluate if we are in the crossfade zone bridging to the next flavor
        if (flavorIndex < FLAVORS.length - 1 && localProgress >= CROSSFADE_START) {
            const fadeProgress = (localProgress - CROSSFADE_START) / (1 - CROSSFADE_START)
            const img2 = imageArray[flavorIndex + 1]?.[0]

            // Draw current flavor fading out
            context.globalAlpha = 1 - fadeProgress
            drawImageToCover(context, canvas, img1)
            
            // Draw next flavor fading in on top
            if (img2 && img2.complete) {
                context.globalAlpha = fadeProgress
                drawImageToCover(context, canvas, img2)
            }
            context.globalAlpha = 1 // reset
        } else {
            // Normal scrubbing zone
            context.globalAlpha = 1
            drawImageToCover(context, canvas, img1)
        }
    }
  }

  // Hook up the scroll progress to our canvas rendering
  useEffect(() => {
    return scrollYProgress.on("change", (latestProgress) => {
      renderCanvas(latestProgress)
    })
  }, [scrollYProgress, images])

  // Also render once all images finish loading or layout changes
  useEffect(() => {
    if (totalLoaded > 0) {
      renderCanvas(scrollYProgress.get())
    }
  }, [totalLoaded])

  // Resize canvas to match window size on resize events
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1
        canvasRef.current.width = window.innerWidth * dpr
        canvasRef.current.height = window.innerHeight * dpr
        canvasRef.current.style.width = `${window.innerWidth}px`
        canvasRef.current.style.height = `${window.innerHeight}px`
        renderCanvas(scrollYProgress.get())
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [images])

  // Accent color mappings synced with the 4 segment scroll intervals
  // 0.2125 is 85% of the 0.25 block, signaling the start of the crossfade
  const accentColor = useTransform(
    scrollYProgress,
    [0, 0.2125, 0.25, 0.4625, 0.50, 0.7125, 0.75, 1],
    [
      "#D4A574", // Classic (Caramel)
      "#D4A574",
      "#A882DD", // Ube (Purple)
      "#A882DD",
      "#88C080", // Pandan (Green)
      "#88C080",
      "#E88599", // Strawberry (Pink)
      "#E88599"
    ]
  )

  const buttonShadowColor = useTransform(
    scrollYProgress,
    [0, 0.2125, 0.25, 0.4625, 0.50, 0.7125, 0.75, 1],
    [
      "rgba(212, 165, 116, 0.4)", // Classic
      "rgba(212, 165, 116, 0.4)",
      "rgba(168, 130, 221, 0.4)", // Ube
      "rgba(168, 130, 221, 0.4)",
      "rgba(136, 192, 128, 0.4)", // Pandan
      "rgba(136, 192, 128, 0.4)",
      "rgba(232, 133, 153, 0.4)", // Strawberry
      "rgba(232, 133, 153, 0.4)"
    ]
  )

  const boxShadowTemplate = useMotionTemplate`0 20px 25px -5px ${buttonShadowColor}, 0 8px 10px -6px ${buttonShadowColor}`

  return (
    // Super tall section. 800vh ensures the user has a luxurious amount of scroll time to witness all 4 stages.
    <section ref={containerRef} className="relative h-[800vh] bg-[#1A0F0A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Cinematic Canvas Overlay */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-0 opacity-90 mix-blend-screen"
        />

        {/* Loading Indicator */}
        {totalLoaded < Math.min(10, TOTAL_FRAMES) && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1A0F0A] z-20">
               <motion.p style={{ color: accentColor }} className="font-serif tracking-widest animate-pulse">
                Loading Experience...
              </motion.p>
            </div>
        )}

        {/* Dark Vignette Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A]/60 via-[#1A0F0A]/20 to-[#1A0F0A]/90 z-10" />

        {/* Text and Call to Action */}
        <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center justify-center pointer-events-none">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cream leading-tight text-balance mb-6 drop-shadow-2xl font-bold">
            The Cassava Roll Experience
          </h1>

          <motion.p 
            style={{ color: accentColor }}
            className="text-xl md:text-2xl font-medium tracking-wide mb-10 drop-shadow-lg italic font-serif transition-colors duration-200"
          >
            Four Flavors. One Irresistible Dessert.
          </motion.p>

          <Button 
            asChild
            size="lg" 
            className="rounded-full pointer-events-auto group mt-8"
          >
            <motion.button
              style={{
                backgroundColor: accentColor,
                boxShadow: boxShadowTemplate
              }}
              className="relative overflow-hidden text-chocolate font-bold px-10 py-7 text-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center drop-shadow-md">
                  Order Now
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </motion.button>
          </Button>
        </div>
      </div>
    </section>
  )
}
