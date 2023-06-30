import toast from 'react-hot-toast';

export function successNotification(message: string) {
  toast.success(`${ message }`, {
    style: {
      background: '#1e293b',
      color: '#cbd5e1',
    },
  });
}

export function errorNotification(message: string) {
  toast.success(`${ message }`, {
    style: {
      background: '#1e293b',
      color: '#cbd5e1',
    },
  });
}