module.exports = async (srv) => {
    const messaging = await cds.connect.to("messaging");
    const { Employee, EmpEmployment,Photo,User } = srv.entities;
    const  messagingurl = process.env["messagingurl"];
    var Url = require('url-parse');
    var querystring = require('querystring');
    srv.on("CREATE", "Employee", async (req, res) => {
        console.log("inside Employee create");
        
        cds.run(INSERT.into(Employee).entries(req.data));
        const payload = {
            "userId": req.data.userId,
            "hireDate": req.data.hireDate,
            "terminationDate": req.data.terminationDate,
            "originalStartDate": req.data.originalStartDate,
            "status": req.data.status
        }
        messaging.emit(messagingurl, payload);
        return payload;
    });

    srv.on("READ", "EmpEmployment", async(req)=>{
        let {from,where,limit,orderBy,columns} = req.query.SELECT;
        console.log(where)
        columns == undefined ? columns = [ '*', { ref: [ 'userNav' ], expand: [ '*' ] } ] : columns.push({ ref: [ 'userNav' ], expand: [ '*' ] });
        let result = await cds.run({ SELECT: { from: from, where: where, limit: limit, columns: columns, orderBy: orderBy } });
        if(result.length == 0){
            let empdataresult = await cds.run(SELECT.one(User).where({ userId: from.ref[0].where[2].val }));
            console.log(empdataresult);
            return {
                userId: from.ref[0].where[2].val,
                lastDateWorked: null,
                seniorityDate: null,
                userNav: {
                    defaultFullName: empdataresult !== null ? empdataresult: {}
                }
                };
        }
        else{
        return result;}  
    })

    srv.on("UPDATE","Employee", async (req, res) => {
        
        const payload = {
            "userId": req.data.userId,
            "hireDate": req.data.hireDate,
            "terminationDate": req.data.terminationDate,
            "originalStartDate": req.data.originalStartDate,
            "status": req.data.status
        }
        let empdataresult = await cds.run(SELECT.one(Employee).where({ userId: req.data.userId }));
        if (!empdataresult) {
            result = await cds.run(INSERT.into(Employee).entries(payload));
        }
        else {
            result = await cds.run(UPDATE(Employee).set(payload).where({userId: req.data.userId }));
        }
        
        
        return payload;
    })
    

    srv.on("READ","Photo", async(req)=>{
        let {from,where,limit,orderBy,columns} = req.query.SELECT;
        let result = await cds.run({ SELECT: { from: from, where: where, limit: limit, columns: columns, orderBy: orderBy } });
        if(result.length == 0){
            let res = {}
            return res;
        }
        else{
        return result;}
    })


    srv.on("upsert", async (req) => {
        console.log("inside upsert");
        url = Url(req.data.__metadata.uri, true);
        let urlattributes = querystring.parse(url.pathname.split("/")[3].slice(14, -1).replace(",", '&'));
        console.log(urlattributes);
        let userId = urlattributes.userId.replaceAll(/'/g,"");
        let personIdExternal = urlattributes.personIdExternal.replace(/'/g,"");  
        let payload = {
            "userId": userId ,
            "personIdExternal": userId,
            "customString1": req.data.customString1,
            "customString2": req.data.customString2,
            "customString3": req.data.customString3,
            "customString4": req.data.customString4
        }
        let empdataresult = await cds.run(SELECT.one(EmpEmployment).where({ personIdExternal: personIdExternal, userId: userId }));
        let result = 0;
        if (!empdataresult) {
            result = await cds.run(INSERT.into(EmpEmployment).entries(payload));
            console.log(result);
        }
        else {
            result = await cds.run(UPDATE(EmpEmployment).set(payload).where({ personIdExternal: personIdExternal, userId: userId }));
        }
        return ((result == 1 ? payload : "unable to update data"));
    })

}