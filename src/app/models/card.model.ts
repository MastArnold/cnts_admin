export class Card{
    private _id: number = 0;
    private _title: string = "";
    private _type: string = "default";
    private _message: string;
    private _image: string = "default";

    constructor(message_: string){
        this._message = message_;
    }

    buildId(id_: number){
        this._id = id_;

        return this;
    }

    buildImage(image_: string){
        this._image = image_;

        return this;
    }

    buildInfo(){
        this.title = "Information";
        this._type = 'info';

        return this;
    }

    buildWarning(){
        this.title = "Avertissement";
        this._type = 'warning';

        return this;
    }

    buildError(){
        this.title = "Erreur";
        this._type = 'error';

        return this;
    }

    buildSuccess(){
        this.title = "Succès";
        this._type = 'success';

        return this;
    }

    buildRemove(){
        this.title = "Suppression";
        this._type = 'remove';

        return this;
    }

    public get id(): number { return this._id; }
    public get title(): string { return this._title; }
    public get type(): string { return this._type; }
    public get message(): string { return this._message; }
    public get image(): string { return this._image; }

    public set id(id_: number) { this._id = id_; }
    public set title(title_: string) { this._title = title_; }
    public set type(type_: string) { this._type = type_; }
    public set message(message_: string) { this._message = message_; }
    public set image(image_: string) { this._image = image_; }

}