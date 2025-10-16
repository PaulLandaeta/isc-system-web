interface confirmModal {
  step: string;
  nextStep: string;
  isApproveButton: boolean;
  setShowModal: (it: boolean) => void;
  onNext: () => void;
}
const ConfirmModal = (props: confirmModal) => {
  return (
    <div className="flex absolute  items-center justify-center inset-0  bg-gradient-to-tr from-[#39414E]/90 from-40% via-50%  to-[#39414E]/95 to-55% via-[#272F3C]/90  z-50 bg-opacity-55">
      {" "}
      <div className="flex flex-col justify-center bg-white m-5 p-5 shadow-md rounded-lg h-fit lg:w-1/3 md:w-1/2 sm:w-1/2">
        <label className="txt-modal">Finalizando etapa: {props.step}</label>
        <label className="txt2-modal ">
          ¿Está seguro de continuar a la siguiente etapa de {props.nextStep}?
        </label>
        <label className="txt3-modal">No podrá modificar los datos una vez que continue</label>
        <div className="flex flex-row justify-between w-full px-5 md:px-2">
          <button
            onClick={() => {
              props.onNext();
            }}
            className="btn"
          >
            Continuar
          </button>
          <button
            onClick={() => {
              props.setShowModal(false);
            }}
            className="btn2-cancel"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
