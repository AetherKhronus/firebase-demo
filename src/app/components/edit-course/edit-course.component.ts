import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "src/app/services/courses.service";
import { Course } from "src/app/shared/course";
import { FormGroup, FormBuilder, AbstractControl, Validators } from "@angular/forms";

@Component({
    selector: "app-edit-course",
    templateUrl: "./edit-course.component.html",
    styleUrls: ["./edit-course.component.css"]
})
export class EditCourseComponent implements OnInit {

    editForm!: FormGroup;
    course!: Course;

    constructor(private coursesService: CoursesService , private router: Router , private fb: FormBuilder , private route: ActivatedRoute) {

    }

    ngOnInit(): void {

        this.updateCourseData();

        this.setCourse();

    }

    setCourse(): void {

        const id = this.route.snapshot.paramMap.get("id");

        if (id) {

            const cSnap = this.coursesService.getById(id);
            cSnap.snapshotChanges()
                .subscribe(c => {

                    this.course = c.payload.toJSON() as Course;
                    this.editForm.setValue(this.course);
                    this.course.$key = String(c.key);

                });

        }

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get title(): AbstractControl<any , any> | null {

        return this.editForm.get("title");

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get author(): AbstractControl<any , any> | null {

        return this.editForm.get("author");

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get price(): AbstractControl<any , any> | null {

        return this.editForm.get("price");

    }

    updateCourseData(): void {

        this.editForm = this.fb.group(
            {
                title: ["" , [Validators.required , Validators.minLength(3)]],
                author: ["" , [Validators.required]],
                price: ["" , [Validators.required]],
            }
        );
    }

    deleteCourse(course: Course): void {
        
        if (window.confirm("Are sure you want to delete this course ?")) { 

            this.coursesService.delete(course.$key);
            this.router.navigate(["/courses"]);

            console.log(course.title + " successfully deleted!");

        }

    }

    updateForm(): void {

        this.coursesService.update(this.editForm.value);

        console.log(this.editForm.controls["title"].value + " updated successfully");

        this.router.navigate(["/courses"]);

    }

}
