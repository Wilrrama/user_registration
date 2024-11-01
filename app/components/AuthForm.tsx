"use client";
import React, { useState } from "react";

const roles = [
  { value: "full-stack", label: "Full-Stack" },
  { value: "front-end", label: "Front-End" },
  { value: "back-end", label: "Back-End" },
] as const;

type Role = (typeof roles)[number]["value"];
type UserType = "user" | "admin";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
  userType: UserType;
  role: Role;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  age?: string;
  userType?: string;
  role?: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    userType: "user",
    role: "full-stack",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!isLogin) {
      // Name validation
      if (!formData.name) {
        newErrors.name = "Nome é obrigatório";
      } else if (formData.name.length < 3) {
        newErrors.name = "Nome deve ter pelo menos 3 caracteres";
      }

      // Age validation
      if (!formData.age) {
        newErrors.age = "Idade é obrigatória";
      } else {
        const ageNum = parseInt(formData.age);
        if (isNaN(ageNum) || ageNum < 18) {
          newErrors.age = "Idade deve ser maior ou igual a 18";
        }
      }

      // Password confirmation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }

      // Role validation
      if (!formData.role) {
        newErrors.role = "Função é obrigatória";
      }

      // UserType validation
      if (!formData.userType) {
        newErrors.userType = "Tipo de usuário é obrigatório";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Aqui você adicionaria a lógica de autenticação
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            {isLogin ? "Login" : "Criar conta"}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              {/* nome completo */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              {/* idade */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-300"
                >
                  Idade
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  placeholder="Digite seu idade"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </div>
              {/*  Tipo de Usuário */}
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-300"
                >
                  Tipo de Usuário
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-500">{errors.userType}</p>
                )}
              </div>
              {/*  Função */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-300"
                >
                  Função
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                )}
              </div>
            </>
          )}
          {/*  Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          {/*  Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              {/* Confirmar senha */}
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Entrar" : "Criar conta"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            {isLogin
              ? "Não tem uma conta? Registre-se"
              : "Já tem uma conta? Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
