const { default: QRCodes } = require("./components/leads/QRCodes");
const { default: Dashboard } = require("./components/leads/Dashboard");

const drawerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/qrcodes",
    name: "QR Codes",
    component: QRCodes,
  }
]