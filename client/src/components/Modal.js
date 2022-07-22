const Modal = () => {
  return (
    <div className="bg-zinc-300 w-screen h-screen absolute inset-0 flex justify-center items-center z-10">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-12 px-24 rounded-xl">
          <p className="text-lg text-zinc-600 mb-10">Are you a kitten?</p>
          <div className="flex">
            <button className="rounded px-4 py-2 text-white bg-green-600">Yes</button>
            <button className="rounded px-4 py-2 text-white bg-red-600">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;