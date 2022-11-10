import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CoursesService } from "src/app/services/courses.service";

@Component({
    selector: "app-add-course",
    templateUrl: "./add-course.component.html",
    styleUrls: ["./add-course.component.css"],
})

export class AddCourseComponent implements OnInit {

    public courseForm!: FormGroup;

    constructor(public coursesService: CoursesService , public fb: FormBuilder , public toastr: ToastrService) {

    }

    ngOnInit(): void {

        this.coursesService.getAll();
        this.cForm();

    }

    cForm(): void {

        this.courseForm = this.fb.group(
            {
                title: ["" , [Validators.required , Validators.minLength(3)]],
                author: ["" , [Validators.required]],
                price: ["" , [Validators.required]],
            }
        );
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get title(): AbstractControl<any , any> | null {

        return this.courseForm.get("title");

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get author(): AbstractControl<any , any> | null {

        return this.courseForm.get("author");

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get price(): AbstractControl<any , any> | null {

        return this.courseForm.get("price");

    }

    resetForm(): void {

        this.courseForm.reset();

    }

    submitCoursesData(): void {

        this.coursesService.add(this.courseForm.value);

        console.log(this.courseForm.controls["title"].value + " successfully added!");

        this.resetForm();

    }

}
