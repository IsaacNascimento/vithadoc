import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  clearError,
  clearSuccess,
} from "../../../redux/actions/notificacoesActions";

export const Notificationbar = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notificacoes.error?.message);
  const success = useSelector((state) => state.notificacoes.success);
  const time = 3500; // 3 segundos e meio

  console.log("Notification:", success, error);

  // Aciona o Toast
  const notify = () => {
    if (success) {
      toast.success(success);
    } else {
      toast.error(error);
    }
  };

  // Aciona a biblioteca Toast se ele identificar alguma mensagem de Error/Sucesso;
  useEffect(() => {
    if (error || success) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  // Limpa as notificações depois de 4 segundos;
  useEffect(() => {
    setTimeout(() => {
      if (error) {
        dispatch(clearError());
      }

      if (success) {
        dispatch(clearSuccess());
      }
    }, time + 500); // 4 segundos
  }, [dispatch, error, success]);

  return (
    <>
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={time}
        closeOnClick
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
};
