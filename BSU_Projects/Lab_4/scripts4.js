function THashStorage()
{
    var self = this;
    var publicationH ={};

    self.AddValue = function (key, value) 
    {
        publicationH[key] = value;
    }
    self.Reset = function ()
    {
        publicationH = {};
    }
    self.DeleteValue = function (key) 
    {
        delete publicationH[key];
    }
    self.GetValue = function (key)
    {
        return publicationH[key];
    }
    self.GetKeys = function () 
    {
        return Object.keys(publicationH);
    }

    self.ListValues = function ()
    {
        var res = '';
        for (var Name of Publication.GetKeys() ) {
            res += 'Название издания: ' + Name + ', Тип: ' + Publication.GetValue(Name) +"\n"
        }
        return res;
    }

}
var Publication = new THashStorage();
Publication.Reset();

function AddPublication(){
    var PublicationName=prompt('Введите название издания:');
    var PublicationType=prompt('Введите тип:');
    Publication.AddValue(PublicationName, PublicationType);
}

function DeletePublication()
{
    var PublicationName =prompt('Введите название издания :');
    Publication.DeleteValue(PublicationName);
}

function InfoPublication(){
    var PublicationName = prompt('Введите название издания');
    if(Publication.GetValue(PublicationName) == undefined){
        console.log('издания не существует');
    }
    else
    console.log(Publication.GetValue(PublicationName));
}

function List_Publications(){
    console.log(Publication.ListValues());
}