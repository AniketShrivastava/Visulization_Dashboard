import express from"express";
import { Visualizations } from "../controller/Visualization_controller.js";
import saveDataFromJson from "../saveData.js";

const router = express.Router();


router.get("/data",Visualizations)
router.post("/setdata",saveDataFromJson)

export default router;