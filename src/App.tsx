import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import "./App.css";
import Button from "./ui/Button";
import InputsModal from "./ui/InputsModal";
import { FromInputs, defaultFromInputs, gainColors } from "./data";
import Input from "./ui/Input";
import { InputValidator } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import Table from "./ui/Table";

function App() {
  /*~~~~~~~~$ States $~~~~~~~~*/
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputData, setInputData] = useState(defaultFromInputs);
  const [errors, setErrors] = useState(defaultFromInputs);

  /*~~~~~~~~$ Handlers $~~~~~~~~*/
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

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

    // ? clear inputs fields
    setInputData(defaultFromInputs);

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

        {/*~~~~~~~~$ c $~~~~~~~~*/}
        <table className="bg-white w-full mt-16  shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-blue-600">
              <th className="py-4 px-6 text-white font-bold uppercase">Rank</th>
              <th className="py-4 px-6 text-white font-bold uppercase">
                Gains
              </th>
              <th className="py-4 px-6 text-white font-bold uppercase">NDCG</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(inputData).map((value, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-blue-100" : ""
                } text-lg font-semibold`}
              >
                <td
                  className={`${
                    index !== 0
                      ? gainColors[index % gainColors.length]
                      : "bg-red-500"
                  } py-3 px-6 text-center text-white font-medium"`}
                >
                  {index + 1}
                </td>
                <td
                  className={`py-3 px-6 text-center text-blue-900 font-medium"`}
                >
                  {Number(value)}
                </td>
                <td
                  className={`py-3 px-6 text-center text-blue-900 font-medium"`}
                >
                  {index + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Table inputData={inputData}/>
      </main>
    </Fragment>
  );
}

export default App;
