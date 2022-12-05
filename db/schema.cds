using {
    managed,
    sap,
    cuid
} from '@sap/cds/common';

namespace sap.capire.sfsf.mock.service;

entity Employee : managed {
    key userId            : String(64);
        hireDate          : Timestamp;
        originalStartDate : Timestamp;
        status            : String(1024);
        seniority         : DecimalFloat;
        terminationDate   : Timestamp;
}

entity EmpEmployment {
    key personIdExternal             : String(64);
    key userId                       : String(64);
        assignmentClass              : String(64);
        assignmentIdExternal         : String(64);
        benefitsEligibilityStartDate : Timestamp;
        benefitsEndDate              : Timestamp;
        bonusPayExpirationDate       : Timestamp;
        createdBy                    : String(64);
        createdDateTime              : Timestamp;
        createdOn                    : Timestamp;
        customDate1                  : Timestamp;
        eligibleForSalContinuation   : Boolean;
        eligibleForStock             : Boolean;
        employeeFirstEmployment      : Boolean;
        endDate                      : Timestamp;
        firstDateWorked              : Timestamp;
        hiringNotCompleted           : Boolean;
        lastDateWorked               : Timestamp;
        seniorityDate                : Timestamp;
        StockEndDate                 : Timestamp;
        customString1                : String(64);
        customString2                : String(64);
        customString3                : String(64);
        customString4                : String(64);
        includeAllRecords            : Boolean;
        initialOptionGrant           : DecimalFloat;
        initialStockGrant            : DecimalFloat;
        isContingentWorker           : Boolean;
        isECRecord                   : Boolean;
        jobNumber                    : Integer64;
        lastModifiedBy               : String(64);
        lastModifiedDateTime         : Timestamp;
        lastModifiedOn               : Timestamp;
        okToRehire                   : Boolean;
        originalStartDate            : Timestamp;
        payrollEndDate               : Timestamp;
        prevEmployeeId               : String(64);
        professionalServiceDate      : Timestamp;
        regretTermination            : Boolean;
        salaryEndDate                : Timestamp;
        serviceDate                  : Timestamp;
        startDate                    : Timestamp;
        userNav: Composition of User on userNav.userId = $self.userId ;
}

entity Photo : managed {
    key userId    : String(64);
    key  photoType : Integer;
        photo     : String;
}

entity User {
    key userId : String(64);
        defaultFullName: String(64);    
}