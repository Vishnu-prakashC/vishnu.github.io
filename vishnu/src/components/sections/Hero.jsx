import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
      
      {/* LEFT SIDE TEXT */}
      <div className="max-w-xl space-y-6">
        <h2 className="text-4xl font-bold">
          Hi, I'm <span className="text-blue-500">Vishnu</span>
        </h2>

        <p className="text-gray-400 text-lg">
          Full Stack Developer building modern web experiences with 3D,
          animations and interactive UI.
        </p>

        <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          View Projects
        </button>
      </div>

      {/* RIGHT SIDE 3D */}
      <div className="w-[400px] h-[400px]">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Sphere args={[1, 100, 200]} scale={2.2}>
            <meshStandardMaterial color="#3b82f6" />
          </Sphere>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

    </section>
  );
};

export default Hero;