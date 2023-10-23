import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAction } from "../../../../redux/actions/authActions";

export const CreateUserForm = () => {
  const formLogin = document.getElementById("form-login");
  const btnLogin = document.getElementById("btn-login-submit");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.login?.error?.message);
  const success = useSelector((state) => state.notificacoes.success?.message);
  const isFetching = useSelector((store) => store.login?.isFetching);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");
  const name = watch("name");

  const onSubmit = async () => {
    reset();
    await dispatch(createUserAction(email, password, name));
  };

  // Pressionar Enter para entrar;
  formLogin?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnLogin?.click();
    }
  });

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
          <span className="form__form-group-label">Nome do Usuário</span>

          <input
            {...register("name", { required: true })}
            name="name"
            className="input-modal-form"
            placeholder="Nome de usuário"
            required
            disabled={isFetching}
            type="nome"
          />
          {errors.name && (
            <span className="span-validation">Campo Nome é obrigatório</span>
          )}
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Senha</span>
          <div className="form__form-group-field">
            <input
              {...register("password", {
                required: true,
              })}
              name="password"
              className="input-modal-form"
              placeholder="Digite sua Senha"
              disabled={isFetching}
              required
              type={"password"}
            />
          </div>
        </div>

        {success && (
          <div className="container-span-validation">
            <span className="span-validation-success">
              {success || "Usuário Criado"}
            </span>
          </div>
        )}

        {error && (
          <div className="container-span-validation">
            <span className="span-validation-success">
              {error || "Erro ao Autenticar"}
            </span>
          </div>
        )}

        {!success ? (
          <button
            className="button-primary-confirm"
            id="btn-login-submit"
            onClick={handleSubmit}
            type="submit"
            disabled={isFetching || success}
          >
            {isFetching ? "Aguardando..." : "Criar"}
          </button>
        ) : (
          <button
            className="button-primary-confirm"
            id="btn-login-submit"
            onClick={() => navigate("/")}
            type="button"
          >
            Voltar
          </button>
        )}
      </form>
      <p
        className="acesso-restrito"
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline blue",
        }}
        onClick={() => navigate("/")}
      >
        Voltar
      </p>
    </React.Fragment>
  );
};
