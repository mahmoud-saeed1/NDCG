import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import Button from "./ui/Button";
import InputsModal from "./ui/InputsModal";
import { FromInputs, defaultFromInputs } from "./data";
import Input from "./ui/Input";
// import { InputValidator } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import Table from "./ui/Table";
import {
  convertToRankedObject,
  getTotalNDCG,
  sortByGain,
  sortByGainMaintainRank,
} from "./utils";

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
      <Helmet>
        <title>NDCG</title>
        <meta
          name="description"
          content="relevance mesuration algorithm"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../public/favicon.webp" />
      </Helmet>

      <main className="px-5 lg:px-12 xl:px-24">
        {/*~~~~~~~~$ Get Start $~~~~~~~~*/}
        <div>
          {!showTable && (
            <Button
              title="get start"
              className="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={openModal}
            />
          )}
        </div>

        {/*~~~~~~~~$ Input Modal $~~~~~~~~*/}
        <InputsModal
          title="gain data"
          isOpen={isOpenModal}
          closeModal={closeModal}
        >
          <form onSubmit={onSubmitHandler}>
            {formInputsRender}

            <p className="text-sm text-red-500 mt-3">
              *Note: gain "rate" must be between 0 and 10 !
            </p>

            {/*~~~~~~~~$ modal buttons $~~~~~~~~*/}
            <div className="flex space-x-3 mt-4">
              <Button className="bg-blue-600" title="Submit" />
              <Button
                className="bg-red-600"
                onClick={showTable ? closeModal : cancelHandler}
                title="cancel"
              />
            </div>
          </form>
        </InputsModal>

        {/*~~~~~~~~$ Table $~~~~~~~~*/}
        {showTable && (
          <div className="md:flex items-center justify-center gap-10">
            <Table
              inputData={convertToRankedObject(inputData)}
              tableHeads={["rank", "gain", "dg"]}
              headStyling="bg-gray-900"
              rowStyling="even:bg-gray-200"
            />
            <Table
              inputData={sortByGain(convertToRankedObject(inputData))}
              tableHeads={["rank", "gain", "dg"]}
              headStyling="bg-gradient-to-r from-purple-600 to-blue-600"
              rowStyling="even:bg-blue-100"
            />
          </div>
        )}

        {showTable && (
          <p className="bg-indigo-700 py-2 my-4 md:my-5 text-white text-2xl font-semibold capitalize tracking-wider">
            rate is{" "}
            {Math.round(
              (getTotalNDCG(convertToRankedObject(inputData)) /
                getTotalNDCG(
                  sortByGainMaintainRank(convertToRankedObject(inputData))
                )) *
                100
            )}
            %
          </p>
        )}

        {/*~~~~~~~~$ Reset & Edit Buttons $~~~~~~~~*/}
        {showTable && (
          <div className="flex space-x-4 md:space-x-5">
            <Button title="edit" className="bg-green-600" onClick={openModal} />
            <Button
              className="bg-red-600"
              title="reset"
              onClick={resetHandler}
            />
          </div>
        )}
      </main>
    </Fragment>
  );
}

export default App;
