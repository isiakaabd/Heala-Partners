import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import SettingsIcon from '@mui/icons-material/Settings'

export const menus = [
  { id: 0, title: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { id: 1, title: 'Pending Orders', icon: GroupIcon, path: '/pending-order' },
  {
    id: 2,
    title: 'Processing Orders',
    icon: GroupIcon,
    path: '/processing-order',
  },
  {
    id: 3,
    title: 'Completed orders',
    icon: GroupIcon,
    path: '/completed-order',
  },
  // { id: 4, title: "Appointments", icon: AssignmentIcon, path: "/appointments" },
  {
    id: 5,
    title: 'Cancelled Orders',
    icon: GroupIcon,
    path: '/cancelled-order',
  },

  { id: 11, title: 'Settings', icon: SettingsIcon, path: '/settings' },
]
