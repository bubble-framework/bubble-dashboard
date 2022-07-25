import Button from './Button.js';

const TeardownDialog = ({ repoName, handleButtonClick }) => (
    <div className="relative container mx-auto rounded-lg border-4 border-indigo-300 p-10 grow mt-9">
      <div className="flex-col">
        <p className="mb-6">
          The bubble for the repository <span className="font-bold">{repoName}</span> is being destroyed. Try tearing down to see if Lambdas are ready to be deleted.
        </p>
        <div className="flex justify-center">
          <Button
            text="Teardown"
            color="red"
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );

export default TeardownDialog;
