import { Button, Input } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { postAuthLogin } from '@/shared/api';
import { useAuth } from '@/app/providers/auth';

const loginSchema = z.object({
  email: z.email('Неверный email').min(1, 'Email обязателен'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

type FormFields = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const response = await postAuthLogin({
        // TODO поменять username на email в спецификации swagger
        body: {
          username: data.email,
          password: data.password,
        },
      });

      if (response.data?.access_token) {
        login(response.data.access_token);
        navigate('/themes');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        label="Email"
        placeholder="Введите ваш email"
        variant="bordered"
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        variant="bordered"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />

      <div className="flex gap-3 pt-4 justify-center">
        <Button type="submit" color="primary" radius="full" isLoading={isSubmitting}>
          Войти
        </Button>
        <Button onPress={() => navigate('/register')} variant="light" radius="full" color="primary">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};
