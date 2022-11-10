import { Injectable } from "@angular/core";
import { AngularFireDatabase , AngularFireList , AngularFireObject } from "@angular/fire/compat/database";
import { Author } from "../shared/author";

@Injectable({
    providedIn: "root"
})

export class AuthorsService {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorsRef!: AngularFireList<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorRef!: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) {

    }

    add(author: Author): void {

        this.authorsRef.push(
            {
                name: author.name,
                isPremium: author.isPremium,
                students: author.students
            }
        );

    }

    getById(id: string): AngularFireObject<unknown> {

        this.authorRef = this.db.object("Authors/" + id);
        return this.authorRef;

    }

    getAll(): AngularFireList<unknown[]> {

        this.authorsRef = this.db.list("Authors");
        return this.authorsRef;

    }

    update(author: Author): void {

        this.authorRef.update(
            {
                name: author.name,
                isPremium: author.isPremium,
                students: author.students
            }
        );

    }
    
    delete(id: string): void {

        this.authorRef = this.db.object("Authors/" + id);
        this.authorRef.remove();

    }

}
