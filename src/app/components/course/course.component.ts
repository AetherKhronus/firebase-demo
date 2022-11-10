import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthorsService } from "src/app/services/authors.service";
import { CoursesService } from "src/app/services/courses.service";
import { Course } from "src/app/shared/course";
import { Author } from "src/app/shared/author";

@Component({
    selector: "app-course",
    templateUrl: "./course.component.html",
    styleUrls: ["./course.component.css"]
})

export class CourseComponent {

    course!: Course;
    author!: Author;

    constructor(private coursesService: CoursesService , private authorsService: AuthorsService , private route: ActivatedRoute) { 

        this.setCourse();

    }

    setCourse(): void {

        const params = this.route.snapshot.paramMap;
        const id = params.get("id");

        if (id) {

            const cSnap = this.coursesService.getById(id);
            cSnap.snapshotChanges()
                .subscribe(c => {

                    const course = c.payload.toJSON() as Course;
                    course.$key = String(c.key);
                    this.course = course;

                    const aSnap = this.authorsService.getById(this.course.author);
                    aSnap.snapshotChanges()
                        .subscribe(a => {
        
                            const author = a.payload.toJSON() as Author;
                            author.$key = String(a.key);
                            this.author = author;
        
                        });

                });

        }

    }

}
