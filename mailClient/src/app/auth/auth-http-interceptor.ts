import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType //an object with many properties...helps us identify if we sent a request or received a repsonse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//we add it  - we also add implements
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //by default
        //get access to req - because we can't get direct access to it
        const modifiedReq = req.clone({
            withCredentials: true //so the value gets updated
        })
        return next.handle(modifiedReq);
    }
}
