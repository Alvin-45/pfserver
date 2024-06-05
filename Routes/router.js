const express = require('express')
const userController = require('../Controllers/usercontroller')
const router = new express.Router()
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multermiddleware')

router.post('/register',userController.register)

router.post('/login',userController.login)

router.post("/add-project",jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

router.get("/all-projects",jwtMiddleware,projectController.getAllProjects)

router.get("/user-projects",jwtMiddleware,projectController.getUserProjects)

router.get("/home-projects",projectController.getHomeProjects)

router.put("/edit-projects/:pid",jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

router.delete("/remove-projects/:pid",jwtMiddleware,projectController.removeProject)


module.exports = router