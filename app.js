import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { logger } from "#util";
import indexRouter from "#routes/index";
import usersRouter from "#routes/users";
import authRouter from "#routes/auth";
import semesterRouter from "#routes/semester";
import accreditationRouter from "#routes/accreditation";
import infrastructureRouter from "#routes/infrastructure";
import practicalRouter from "#routes/practical";
import organizationRouter from "#routes/organization";
import studentRouter from "#routes/student";
import tutorialRouter from "#routes/tutorial";
import assignmentRouter from "#routes/assignment";
import timetableRouter from "#routes/timetable";
import courseworkRouter from "#routes/coursework";
import activityRouter from "#routes/activity";
import moduleRouter from "#routes/module";
import facultyRouter from "#routes/faculty";
import { identifyUser } from "#middleware/identifyUser";
import departmentRouter from "#routes/department";
import paperRouter from "#routes/paper";
import groupRouter from "#routes/group";

const app = express();
const currDirName = dirname(fileURLToPath(import.meta.url));

morgan.token("remote-user", (req) => req.user);
app.use(identifyUser);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan(
  ":remote-addr - :remote-user \":method :url HTTP/:http-version\" :status \":referrer\" \":user-agent\"",
  { stream: logger.stream },
));

app.use(express.static(path.join(currDirName, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/accreditation", accreditationRouter);
app.use("/infrastructure", infrastructureRouter);
app.use("/department", departmentRouter);
app.use("/practical", practicalRouter);
app.use("/organization", organizationRouter);
app.use("/student", studentRouter);
app.use("/activity", activityRouter);
app.use("/tutorial", tutorialRouter);
app.use("/assignment", assignmentRouter);
app.use("/timetable", timetableRouter);
app.use("/department", departmentRouter);
app.use("/coursework", courseworkRouter);
app.use("/module", moduleRouter);
app.use("/paper", paperRouter);
app.use("/group", groupRouter);
app.use("/semester", semesterRouter);
app.use("/faculty", facultyRouter);

export default app;
