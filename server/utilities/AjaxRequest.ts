

export class Ajax {
    url: string;
    xmlData: string;
    mode: bool; 
    response: string;
    objHttpReq:any;

    constructor (postUrl: string, postXml: string, postMode: bool) {
        this.url = postUrl;
        this.xmlData = postXml;
        this.mode = postMode;       
        this.objHttpReq = new XMLHttpRequest(); 
        this.objHttpReq.mode = this.mode;   

        this.objHttpReq.onreadystatechange =()=> this.OnRStateChange();

        this.objHttpReq.open("Post", this.url, this.mode);
        this.objHttpReq.send(this.xmlData);         
    }                   

    OnRStateChange(){               
        if (this.objHttpReq.readyState==4 && this.objHttpReq.status==200)
                    //here this refers to Ajax
        {
            //alert(xmlhttp.status);
            if( this.objHttpReq.mode == false)
            {
                alert(this.objHttpReq.responseText);
            }
            else
            {
                alert(this.objHttpReq.responseText);
            }
        }   
    }
}   