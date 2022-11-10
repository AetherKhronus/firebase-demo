import { CoursesService } from "./../../services/courses.service";
import { Component , OnInit } from "@angular/core";
import { Course } from "src/app/shared/course";

@Component({
    selector: "app-courses",
    templateUrl: "./courses.component.html",
    styleUrls: ["./courses.component.css"]
})

export class CoursesComponent implements OnInit {

    p = 1;
    courseList: Course[] = [];

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit(): void {

        this.getCourses();
        
    }

    getCourses(): void {

        const s = this.coursesService.getAll();
        s.snapshotChanges()
            .subscribe(courses => {

                this.courseList = [];

                courses.forEach(course => {

                    const a = course.payload.toJSON() as Course;
                    a.$key = String(course.key);

                    this.courseList.push(a as Course);
                    
                });

            });
    }

}
