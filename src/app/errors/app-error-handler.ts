import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {

    handleError(error: unknown): void {

        alert("An unexpected error occured.");
        console.log(error);

    }

}