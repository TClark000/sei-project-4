import { notify } from 'react-notify-toast'

const popupStyles = { background: '#688677', text: '#000' }

export const popupNotification = (message) => {
  return notify.show(message, 'custom', 3000, popupStyles)
}