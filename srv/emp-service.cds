using { sap.capire.mock.sfsf as my } from '../db/schema';


service EmployeeService @(path:'/odata/v2')
{
    entity Employee as
        projection on my.Employee
        {
            *
        };

    entity Photo as
        projection on my.Photo
        {
            *
        };
    entity EmpEmployment as projection on my.EmpEmployment;
    entity User as projection on my.User;
    action upsert
    (
        __metadata : metadataItem,
        customString1 : String,
        customString2 : String,
        customString3 : String,
        customString4 : String
    )
    returns String;

    type metadataItem
    {
        uri : String;
        type : String;
    }
}
