export function tasks(id,name,date,desc,url,marked=false){

    this.id = id;
    this.name = name;
    this.date = date;
    this.desc = desc;
    this.url = url;
    this.marked = marked;

    console.log("function constructor called");

}