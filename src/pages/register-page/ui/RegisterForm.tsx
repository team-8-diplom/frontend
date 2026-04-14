import { Button, Input, Tab, Tabs } from '@heroui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { postAuthRegister } from '@/shared/api';
import { useAuth } from '@/app/providers/auth';

const registerSchema = z
  .object({
    email: z.email('Неверный email').min(1, 'Email обязателен'),
    name: z.string().min(5, 'ФИО должно содержать минимум 5 символов'),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type FormFields = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(selectedRole, data);
    try {
      // TODO добавить поле name в спецификацию swagger
      const response = await postAuthRegister({
        body: {
          email: data.email,
          password: data.password,
          role: selectedRole,
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 items-center">
      <Tabs
        aria-label="Role tab"
        selectedKey={selectedRole}
        color="primary"
        size="lg"
        radius="full"
        onSelectionChange={(key) => setSelectedRole(key as 'student' | 'teacher')}
      >
        <Tab key="student" title="Студент"></Tab>
        <Tab key="teacher" title="Преподаватель"></Tab>
      </Tabs>

      <Input
        label="Email"
        placeholder="Введите ваш email"
        variant="bordered"
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        isRequired
      />

      <Input
        type="text"
        label="ФИО"
        placeholder="Иванов Иван Иванович"
        variant="bordered"
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        isRequired
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        variant="bordered"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        isRequired
      />

      <Input
        type="password"
        label="Повторите пароль"
        placeholder="Повторите пароль"
        variant="bordered"
        {...register('confirmPassword')}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        isRequired
      />

      <div className="flex gap-3 pt-4 justify-center">
        <Button type="submit" color="primary" radius="full" isLoading={isSubmitting}>
          Сохранить
        </Button>
        <Button onPress={() => navigate('/login')} color="primary" radius="full" variant="light">
          Назад
        </Button>
      </div>
    </form>
  );
};
