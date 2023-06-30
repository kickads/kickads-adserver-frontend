import toast from 'react-hot-toast';
import { MySwal } from '../../config/sweetalert2/sweetalert2.config.ts';
import { SweetAlertResult } from 'sweetalert2';

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

interface ConfirmNotificationProps {
  title: string,
  text: string,
}

export function confirmNotification({ title, text }: ConfirmNotificationProps): Promise<SweetAlertResult> {
  return MySwal.fire({
    title: `Eliminar ${ title }`,
    text: `${ text }`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si',
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      popup: 'dark:bg-slate-800 text-gray-700 font-inter dark:text-slate-300',
      confirmButton: 'py-2 px-3 text-gray-400 dark:text-slate-300',
      cancelButton: 'py-2 px-3 bg-gray-50 rounded-lg text-red-400 dark:bg-slate-700',
    },
  });
}