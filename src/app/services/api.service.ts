import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class ApiService{

    httpClient = inject(HttpClient);

    baseUrl = 'http://cnts-server.axianeagency.cloud/api/';
    tempAuth = {
        username: 'admin',
        password: 'secret123'
    };

    get(url: string){
        return this.httpClient.get(this.baseUrl + url, {
            headers: {
                'Authorization': 'Basic ' + btoa(this.tempAuth.username + ':' + this.tempAuth.password)
            }
        });
    }

    post(url: string, data: any){
        return this.httpClient.post(this.baseUrl + url, data, {
            headers: {
                'Authorization': 'Basic ' + btoa(this.tempAuth.username + ':' + this.tempAuth.password)
            }
        });
    }

    put(url: string, data: any){
        return this.httpClient.put(this.baseUrl + url, data, {
            headers: {
                'Authorization': 'Basic ' + btoa(this.tempAuth.username + ':' + this.tempAuth.password)
            }
        });
    }

    delete(url: string){
        return this.httpClient.delete(this.baseUrl + url, {
            headers: {
                'Authorization': 'Basic ' + btoa(this.tempAuth.username + ':' + this.tempAuth.password)
            }
        });
    }

}