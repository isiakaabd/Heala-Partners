import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import EventBusySharpIcon from '@mui/icons-material/EventBusySharp'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'
export const menus = [
  { id: 0, title: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  {
    id: 1,
    title: 'Pending Orders',
    icon: AccessTimeFilledIcon,
    path: '/pending-order',
  },
  {
    id: 2,
    title: 'Processing Orders',
    icon: UpdateRoundedIcon,
    path: '/processing-order',
  },
  {
    id: 3,
    title: 'Completed orders',
    icon: CheckCircleSharpIcon,
    path: '/completed-order',
  },
  // { id: 4, title: "Appointments", icon: AssignmentIcon, path: "/appointments" },
  {
    id: 5,
    title: 'Cancelled Orders',
    icon: EventBusySharpIcon,
    path: '/cancelled-order',
  },

  { id: 11, title: 'Settings', icon: SettingsIcon, path: '/settings' },
]
