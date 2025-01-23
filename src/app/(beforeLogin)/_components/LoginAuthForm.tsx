'use client';

import { useRouter } from 'next/navigation';
import AuthButton from '../_components/AuthButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import customAxios from '@/utils/cutstomAxios';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type FormProps = {
  id: string;
  password: string;
};

export default function LoginAuthForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setError,
  } = useForm<FormProps>();

  const onsubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      const res = await customAxios.post('/auth/welcome', {
        loginId: data.id,
        password: data.password,
      });
      // addUser(res?.userId)
      console.log(res);
      localStorage.clear();
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      if (res.status === 200) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError('id', { message: error.response?.data.message });
      }
    } finally {
    }
  };
  return (
    <div>
      <div className="mb-20">
        <form>
          <input
            className="w-full h-11 border-b-2 pl-3 mb-4"
            type="email"
            placeholder="아이디"
            {...register('id', {
              required: '아이디를 입력해주세요.',
            })}
          />
          <input
            className="w-full h-11 border-b-2 pl-3"
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
        </form>
        {errors.id && (
          <p className="text-sm text-[#EF4444] mt-5">{errors?.id?.message}</p>
        )}
      </div>

      <div onClick={handleSubmit(onsubmit)}>
        <AuthButton
          title="로그인"
          type="submit"
          disabled={!isValid || isSubmitting}
        />
      </div>

      <Link href={'/signup'}>
        <div className="flex justify-center items-center mb-4">
          <Button
            type="submit"
            className="w-full h-12 rounded-3xl bg-[#F9FAFB] text-main"
          >
            회원가입
          </Button>
        </div>
      </Link>
    </div>
  );
}
