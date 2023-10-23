import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/actions/authActions";
import { useEffect } from "react";
import { EMAIL } from "../../../../utils/constants";

export const LoginForm = () => {
  const formLogin = document.getElementById("form-login");
  const btnLogin = document.getElementById("btn-login-submit");
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.login?.error?.message);
  const isFetching = useSelector((store) => store.login?.isFetching);
  const isLoggin = useSelector((store) => store.login?.isLoggin);
  const token = useSelector((store) => store.login?.user?.access);

  console.log(useSelector((store) => store));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async () => {
    reset();
    await dispatch(login(email, password));
    localStorage.setItem(EMAIL, JSON.stringify(email));
  };

  // Se não houver error. Não estiver esperando resposta da api
  // Se estiver logado e houver o token... navegue o usuário para página privada;
  useEffect(() => {
    if (!error && !isFetching && isLoggin && token) {
      navigate("/tarefas");
    }
  }, [error, isFetching, isLoggin, navigate, token]);

  // Pressionar Enter para entrar;
  formLogin?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnLogin?.click();
    }
  });

  const handlePasswordTypeInput = () => setIsPassword((prev) => !prev);

  return (
    <React.Fragment>
      <form id="form-login" className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__form-group">
          <span className="form__form-group-label">Email do Usuário</span>

          <input
            {...register("email", { required: true })}
            name="email"
            className="input-modal-form"
            placeholder="Email de usuário"
            required
            disabled={isFetching}
            type="email"
          />
          {errors.email && (
            <span className="span-validation">Campo 'Email' é obrigatório</span>
          )}
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Senha</span>
          <div className="form__form-group-field">
            <input
              {...register("password", { required: true })}
              name="password"
              className="input-modal-form"
              placeholder="Digite sua Senha"
              disabled={isFetching}
              required
              type={isPassword ? "password" : "text"}
            />
            <button
              onClick={handlePasswordTypeInput}
              type="button"
              disabled={isFetching}
              className="button-password"
            >
              {isPassword ? (
                <AiIcons.AiOutlineEye />
              ) : (
                <AiIcons.AiOutlineEyeInvisible />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="container-span-validation">
            <span className="span-validation">
              {error || "Erro de Autenticação"}
            </span>
          </div>
        )}
        <button
          className="button-primary-confirm"
          id="btn-login-submit"
          onClick={handleSubmit}
          type="submit"
          disabled={isFetching}
        >
          {isFetching ? "Aguardando..." : "Entrar"}
        </button>
      </form>
      <p
        className="acesso-restrito"
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline blue",
        }}
        onClick={() => navigate("/criar/usuario")}
      >
        Não Possui Cadastro?
      </p>
    </React.Fragment>
  );
};
