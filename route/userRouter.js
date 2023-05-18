import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controller/user.js";
import Router from "express";
const router = Router();

router.route("/user").get(getAllUser);
router.route("/user").post(createUser);
router.route("/user/:id").delete(deleteUser);
router.route("/user/:id").put(updateUser);
router.route("/user/:id").get(getUser);

export { router as userRoute };
