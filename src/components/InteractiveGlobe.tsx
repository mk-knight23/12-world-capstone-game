/**
 * Interactive 3D Globe Component
 * Three.js powered interactive globe with country selection
 */

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Country {
  name: string
  code: string
  lat: number
  lon: number
  population?: number
  gdp?: number
}

interface GlobeProps {
  countries: Country[]
  onCountrySelect?: (country: Country) => void
  selectedCountry?: Country | null
  className?: string
}

export function InteractiveGlobe({
  countries,
  onCountrySelect,
  selectedCountry,
  className = ''
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const markersRef = useRef<THREE.Points | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64)
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a2e,
      emissive: 0x0a0a15,
      specular: 0x333333,
      shininess: 25
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)
    globeRef.current = globe

    // Grid lines
    const gridGeometry = new THREE.WireframeGeometry(new THREE.SphereGeometry(1.01, 24, 24))
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.1
    })
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial)
    globe.add(grid)

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Add country markers
    updateCountryMarkers(countries, scene)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      if (!isDragging && globeRef.current) {
        globeRef.current.rotation.y += 0.002
      }
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  function updateCountryMarkers(countries: Country[], scene: THREE.Scene) {
    if (markersRef.current) {
      scene.remove(markersRef.current)
    }

    if (countries.length === 0) return

    const positions: number[] = []
    const colors: number[] = []

    countries.forEach(country => {
      const { x, y, z } = latLonToVector3(country.lat, country.lon, 1.02)
      positions.push(x, y, z)
      colors.push(selectedCountry?.code === country.code ? 1 : 0, selectedCountry?.code === country.code ? 1 : 0.8, 0)
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)
    markersRef.current = points
  }

  function latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return {
      x: -(radius * Math.sin(phi) * Math.cos(theta)),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`cursor-move ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
    />
  )
}
