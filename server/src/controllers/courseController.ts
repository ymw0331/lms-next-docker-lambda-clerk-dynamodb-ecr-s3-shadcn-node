import { Request, Response } from "express";
import Course from "../models/courseModel";

export const listCourses = async (
    req: Request,
    res: Response
): Promise<void> => {

    const { category } = req.query;

    try {
        const courses = category && category !== "all"
            ? await Course.scan("category").eq(category).exec()
            : await Course.scan().exec()

        res.json({ message: "Courses retrieved successfully", data: courses })

    } catch (error) {
        res.status(500).json({ message: "Error retriving courses", error })
    }
}


export const getCourse = async (
    req: Request,
    res: Response
): Promise<void> => {
    // https://example.com/path?key=value //query string
    // https://example.com/path/{param} //path parameter


    const { courseId } = req.params;

    try {
        const course = await Course.get(courseId)
        if (!course) {
            res.status(404).json({ message: "Course not found" })
            return
        }

        res.json({ message: "Courses retrieved successfully", data: course })

    } catch (error) {
        res.status(500).json({ message: "Error retriving courses", error })
    }
}