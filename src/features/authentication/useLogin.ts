import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

type MutationFnProps = {
  email: string;
  password: string;
};

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: MutationFnProps) =>
      loginApi({ email, password }),

    onSuccess: user => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },

    onError: (err: Error) => {
      console.log('ERROR', err.message);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
