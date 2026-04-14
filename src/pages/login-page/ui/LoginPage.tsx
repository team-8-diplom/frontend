import loginImg from '../assets/login-img.svg';
import { LoginForm } from '@/pages/login-page/ui/LoginForm.tsx';

export const LoginPage = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-[63.5%] h-full">
        <img src={loginImg} alt="Background" className="w-full h-full object-cover" draggable={false} />
      </div>

      <div className="w-[36.5%] min-w-[320px] h-full flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold mb-8 text-center">Вход</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
