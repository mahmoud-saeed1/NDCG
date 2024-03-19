import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import "./App.css";
import Button from "./ui/Button";
import InputsModal from "./ui/InputsModal";
import { FromInputs, defaultFromInputs } from "./data";
import Input from "./ui/Input";
// import { InputValidator } from "./validation";
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

  const cancelHandler = () => {
    closeModal();
    setInputData(defaultFromInputs);
  };

  const resetHandler = () => {
    setInputData(defaultFromInputs);
    setShowTable(false);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // const errorMessage = InputValidator(inputData);

    // const errorResult =
    //   Object.values(errorMessage).every((value) => value === "") ||
    //   Object.values(errorMessage).some((value) => value === "");

    // if (!errorResult) {
    //   setErrors(errorMessage);
    //   console.log("error");
    //   return;
    // }

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
        required
        min={0}
        max={10}
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
            title={`${!showTable ? "get start" : "edit"}`}
            className={`${
              !showTable
                ? "bg-gradient-to-r from-purple-600 to-blue-600"
                : "bg-gradient-to-r from-green-400 to-green-800"
            } `}
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

            <p className="text-sm text-red-500">
              *Not: gain "rate" must be between 0 and 10 !
            </p>

            {/*~~~~~~~~$ modal buttons $~~~~~~~~*/}
            <div className="flex space-x-3 mt-4">
              <Button className="bg-blue-600" title="Submit" />
              <Button
                className="bg-red-600"
                onClick={cancelHandler}
                title="cancel"
              />
            </div>
          </form>
        </InputsModal>

        {/*~~~~~~~~$ Table $~~~~~~~~*/}
        {showTable && (
          <div className="md:flex items-center justify-center gap-2">
            <Table
              inputData={convertToRankedObject(inputData)}
              tableHeads={["rank", "gain", "dg"]}
            />
            <Table
              inputData={sortByGain(convertToRankedObject(inputData))}
              tableHeads={["rank", "ranked gain", "dg"]}
            />
          </div>
        )}
        <p className="bg-indigo-700 py-2 my-4 text-white text-2xl font-semibold capitalize tracking-wider">
          rate is{" "}
          {Math.round(
            (getTotalNDCG(convertToRankedObject(inputData)) /
              getTotalNDCG(sortByGain(convertToRankedObject(inputData)))) *
              100
          )}
          %
        </p>

        {/*~~~~~~~~$ Reset Button $~~~~~~~~*/}
        {showTable && (
          <Button className="bg-red-600" title="reset" onClick={resetHandler} />
        )}
      </main>
    </Fragment>
  );
}

export default App;
