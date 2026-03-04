const multer = require("multer");
const express = require("express");

const {
  registerController,
  loginController,
  authController,
  docController,
  deleteallnotificationController,
  updateProfileController,
  getallnotificationController,
  getAllDoctorsControllers,
  appointmentController,
  getAllUserAppointments,
  getDocsController,
  downloadDocController,
} = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/getuserdata", authMiddleware, authController);

router.post("/registerdoc", authMiddleware, docController);

router.get("/getalldoctorsu", authMiddleware, getAllDoctorsControllers);

router.post("/getappointment",upload.single("image"), authMiddleware, appointmentController);

router.post(
  "/getallnotification",
  authMiddleware,
  getallnotificationController
);

router.delete(
  "/deleteallnotification",
  authMiddleware,
  deleteallnotificationController
);

router.patch(
  "/update-profile",
  authMiddleware,
  updateProfileController
);

router.get("/getuserappointments", authMiddleware, getAllUserAppointments);

router.get("/getDocsforuser", authMiddleware, getDocsController)


module.exports = router;
