function HomeImage() {
  return (
    <div className="relative w-full sm:mt-2 md:mt-5 ">
      <img
        className="w-full max-h-[800px] object-cover brightness-75 sm:rounded-none md:rounded"
        src="https://res.cloudinary.com/dwykns8ak/image/upload/v1732483561/bg1_gzddbd.jpg"
        alt="Background"
      />

      <div className="absolute z-20 top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white px-6 py-4 bg-black bg-opacity-50 rounded-lg w-4/5 sm:w-1/2 min-w-fit min-h-fit flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-white">
          Merhaba, Ben Yamaç Erdoğan!
        </h1>
        <p className="text-xl sm:text-2xl font-semibold">Hoşgeldiniz</p>
      </div>
    </div>
  );
}

export default HomeImage;
