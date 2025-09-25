const Illusions = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-8">Motion Illusions</h1>

        <p className="text-gray-400 text-lg mb-6">
          Use the dropdown in the top right corner to select an illusion
        </p>

        <div className="text-gray-300 text-base max-w-2xl">
          <p className="mb-4">
            Welcome to the motion illusions gallery! Each illusion demonstrates fascinating
            visual effects created through synchronized movement and clever positioning.
          </p>

          <div className="text-left space-y-2">
            <p><span className="text-blue-400 font-semibold">Rings:</span> Rotating rings with gaps create mesmerizing spiral patterns</p>
            <p><span className="text-green-400 font-semibold">Circular Motion Balls:</span> Balls moving in straight lines that appear to move in circles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Illusions;
