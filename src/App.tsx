import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import "./App.css";
import Button from "./ui/Button";
import InputsModal from "./ui/InputsModal";
import { FromInputs, defaultFromInputs } from "./data";
import Input from "./ui/Input";
import { InputValidator } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import Table from "./ui/Table";
import { convertToRankedObject, getTotalNDCG, sortByGain } from "./utils";

function App() {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputData, setInputData] = useState(defaultFromInputs);
  const [errors, setErrors] = useState(defaultFromInputs);
  const [showTable, setShowTable] = useState(false);

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const viewTable = () => setShowTable(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errorMessage = InputValidator(inputData);
    console.log(inputData);
    console.log(Object.values(inputData));
    console.log(errorMessage);

    const errorResult =
      Object.values(errorMessage).every((value) => value === "") ||
      Object.values(errorMessage).some((value) => value === "");

    if (!errorResult) {
      setErrors(errorMessage);
      console.log("error");
      return;
    }

    // ? show table
    viewTable();

    // ? clear inputs fields
    // setInputData(defaultFromInputs);

    // ? close modal
    closeModal();
  };

  /*~~~~~~~~$ Renders $~~~~~~~~*/
  const formInputsRender = FromInputs.map((input) => (
    <div key={input.id} className="space-x-4 space-y-2">
      <label htmlFor={input.id} className="text-xl font-semibold capitalize">
        {input.label}
      </label>
      <Input
        id={input.id}
        type={input.type}
        name={input.name}
        placeholder={`Gain ${input.rank}`}
        className="w-1/4"
        value={inputData[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage message={errors[input.name]} />
    </div>
  ));

  return (
    <Fragment>
      <main>
        {/*~~~~~~~~$ Get Start $~~~~~~~~*/}
        <div>
          <Button
            title="get start"
            className="bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={openModal}
          />
        </div>

        {/*~~~~~~~~$ Input Modal $~~~~~~~~*/}
        <InputsModal
          title="gain data"
          isOpen={isOpenModal}
          closeModal={closeModal}
        >
          <form onSubmit={onSubmitHandler}>
            {formInputsRender}
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 mt-4"
              title="sumbit"
            />
          </form>
        </InputsModal>

        {/*~~~~~~~~$ Table $~~~~~~~~*/}
        {showTable && (
          <div>
            <Table inputData={convertToRankedObject(inputData)} />
            <Table inputData={sortByGain(convertToRankedObject(inputData))} />
            <h1>
              rate is{" "}
              {getTotalNDCG(sortByGain(convertToRankedObject(inputData))) /
                getTotalNDCG(convertToRankedObject(inputData))}
            </h1>
          </div>
        )}
      </main>
    </Fragment>
  );
}

export default App;
