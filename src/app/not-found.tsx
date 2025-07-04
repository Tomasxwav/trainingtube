'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Home, RefreshCw, ChevronRight, Circle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function Error({error, reset }: {error: Error & { digest?: string }, reset: () => void}) {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-trigger",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const randomX = gsap.utils.random(-30, 30)
          const randomY = gsap.utils.random(-20, 20)
          const randomOpacity = gsap.utils.random(0.7, 1)
          const bgScale = self.progress
          
          gsap.to("#code", {
            x: randomX,
            y: randomY,
            opacity: randomOpacity,
            duration: 0.1,
            ease: "power2.InOut",
          })
        }
      }
    })

    tl.to("#code", {
      scale: 100,
      rotation: 90,
      ease: "power2.inOut",
    }, 0.5)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div id="scroll-trigger">
      <div className="h-[200vh]">
        <div className="fixed flex flex-col gap-8 px-12 md:px-[20vw] w-[100vw] h-[100vh] bg-black overflow-hidden justify-center items-center"> 
          <div className="self-start relative" id="code">
            <h1 className="text-[8rem] text-white top-0">{error?.digest? error.digest : "Error"}</h1>
            <h1 className="text-[8rem] text-[rgba(0,255,0,1)] absolute translate-[2px] top-0 animate-pulse duration-[2s]">{error?.digest? error.digest : "Error"}</h1> 
            <h1 className="text-[8rem] text-[rgba(255,0,0,1)] absolute translate-[-2px] top-0 animate-pulse">{error?.digest? error.digest : "Error"}</h1>
            <h1 className="text-[8rem] text-white top-0 absolute">{error?.digest? error.digest : "Error"}</h1>
          </div>
          <div>
            <h1 className="underline">Pagina no encontrada</h1>
            <p className="text-xl text-gray-300">La página que estás buscando parece haber desaparecido en el vacío digital. Puede que haya sido eliminada, movida o nunca haya existido.</p>
          </div>
          <div className="flex gap-8 w-full">
            <Link href="/">
              <Button variant="secondary" className="hover:scale-110 font-bold cursor-pointer group rounded-2xl text-xl py-8 w-56">
                <Home className="group-hover:animate-in size-5"/>
                Go back home
              </Button>
            </Link>
            <Button onClick={reloadPage} className="hover:scale-110 cursor-pointer group rounded-2xl text-xl py-8 w-56">
              <RefreshCw className="group-hover:animate-spin size-5"/>
              Refresh
            </Button>
          </div>
          <p className="text-gray-500 flex gap-2 items-center">
            <span className="animate-pulse"><Circle className="size-3"/></span>
            {error?.message ? error.message : "An error occurred"}
          </p>
          <div className="bg-[url(/noise.jpg)] w-full h-full opacity-5 absolute scale-200 pointer-events-none animate-noise"></div>
          <div className="bg-grid-custom w-full h-full absolute scale-200 pointer-events-none animate-hipnosis" id="bg"></div>
          <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50">
            <div
              className="absolute size-[30rem] rounded-full bg-white/10 blur-2xl mix-blend-lighten animate-pulse"
              style={{
                top: `${mouseY - 240}px`,
                left: `${mouseX - 240}px`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}