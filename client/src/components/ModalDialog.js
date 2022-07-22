const ModalDialog = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="flex-col justify-center bg-white py-12 px-24 rounded-xl">
      <p className="text-lg text-zinc-600 mb-10">Are you a kitten?</p>
      <div className="flex">
        <button className="rounded px-4 py-2 text-white bg-green-600">Yes</button>
        <button className="rounded px-4 py-2 text-white bg-red-600">No</button>
      </div>
    </div>
  </div>
);

export default ModalDialog;