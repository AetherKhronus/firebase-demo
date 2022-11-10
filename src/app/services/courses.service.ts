import { Injectable } from "@angular/core";
import { AngularFireDatabase , AngularFireList , AngularFireObject } from "@angular/fire/compat/database";
import { Course } from "../shared/course";

@Injectable({
    providedIn: "root"
})

export class CoursesService {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coursesRef!: AngularFireList<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    courseRef!: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) {

    }

    add(course: Course): void {

        this.coursesRef.push(
            {
                author: course.author,
                title: course.title,
                price: course.price
            }
        );

    }

    getById(id: string): AngularFireObject<unknown> {

        this.courseRef = this.db.object("Courses/" + id);
        return this.courseRef;

    }

    getAll(): AngularFireList<unknown[]> {

        this.coursesRef = this.db.list("Courses");
        return this.coursesRef;

    }

    update(course: Course): void {

        this.courseRef.update(
            {
                author: course.author,
                title: course.title,
                price: course.price
            }
        );

    }
    
    delete(id: string): void {

        this.courseRef = this.db.object("Courses/" + id);
        this.courseRef.remove();
        
    }

}
