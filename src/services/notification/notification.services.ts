import toast from 'react-hot-toast';
import { MySwal } from '../../config/sweetalert2/sweetalert2.config.ts';
import { SweetAlertResult } from 'sweetalert2';

export function successNotification(message: string) {
  toast.success(`${ message }`, {
    className: 'bg-white font-inter dark:bg-slate-800 dark:text-slate-300'
  });
}

export function errorNotification(message: string) {
  toast.error(`${ message }`, {
    className: 'bg-white font-inter dark:bg-slate-800 dark:text-slate-300'
  });
}

interface ConfirmNotificationProps {
  title: string,
}

export function confirmNotification({ title }: ConfirmNotificationProps): Promise<SweetAlertResult> {
  return MySwal.fire({
    title: `Eliminar ${ title }`,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar',
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      popup: 'text-gray-800 font-inter dark:bg-gray-900 dark:text-gray-300',
      confirmButton: 'py-2 px-3 bg-red-400 text-white rounded-lg',
      cancelButton: 'py-2 px-3 bg-gray-50 text-gray-400 rounded-lg dark:bg-gray-800 dark:text-gray-300 ml-4',
    },
  });
}