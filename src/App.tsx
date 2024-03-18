import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import "./App.css";
import Button from "./ui/Button";
import InputsModal from "./ui/InputsModal";
import { FromInputs, defaultFromInputs } from "./data";
import Input from "./ui/Input";
import { InputValidator } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

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
      <main className="bg-black">
        {/*~~~~~~~~$ Get Start $~~~~~~~~*/}
        <div>
          <Button
            title="get start"
            className="bg-indigo-700"
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
            <Button className="bg-indigo-700 mt-4" title="sumbit" />
          </form>
        </InputsModal>
      </main>
    </Fragment>
  );
}

export default App;
