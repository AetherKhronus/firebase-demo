import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Routes , RouterModule } from "@angular/router";
import { ErrorHandler , NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";

import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from "ngx-pagination";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CoursesComponent } from "./components/courses/courses.component";
import { CourseComponent } from "./components/course/course.component";
import { AddCourseComponent } from "./components/add-course/add-course.component";
import { EditCourseComponent } from "./components/edit-course/edit-course.component";

import { AppErrorHandler } from "./errors/app-error-handler";
import { NotFoundComponent } from "./errors/components/not-found/not-found.component";
import { NoAccessComponent } from "./errors/components/no-access/no-access.component";

import { AuthorsService } from "./services/authors.service";
import { CoursesService } from "./services/courses.service";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
    { path : "" , component: AppComponent },

    { path : "home" , component: HomeComponent },
    { path : "courses" , component: CoursesComponent },
    { path : "course/:id/:title" , component: CourseComponent },

    { path : "no-access" , component: NoAccessComponent },
    { path : "**" , component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        CoursesComponent,
        CourseComponent,
        NoAccessComponent,
        NotFoundComponent,
        HomeComponent,
        AddCourseComponent,
        EditCourseComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthorsService,
        CoursesService,
        { provide: ErrorHandler , useClass: AppErrorHandler }
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { 

}
