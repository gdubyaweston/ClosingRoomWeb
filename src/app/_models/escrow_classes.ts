
import { IntListItem, StringListItem } from "@app/_models/service_classes";

export class EscrowOrder {
    escrowOrderID: number = -1;
    submittedByID: number = -1;
    submittedByRoleID: number = -1;
    checkedOutToID: number = -1;
    orderStatusID: number = -1;
    tsOrderID: number = -1;
    btBOrderID: number = -1;
    defaultChecklistCreated: boolean | null = false;
    notesMigrated: boolean | null = false; 
    docEscrow: boolean = false; 
    preOwned: boolean | null = false;
    hasLinkedOrder: boolean = false;
    purchasePrice: number = 0;
    totEscrowFee: number | null = 0;
    orderDate: Date | null = null;
    closingDate: Date | null = null;
    submittedByName: string = '';        
    checkedOutToName: string = '';        
    orderStatus: string = '';
    escrowDescription: string = '';
    participantDisplay: string = '';
    price_old: string = '';        
    notes: string = '';
    source: string = '';
    createdByASPNETUsers: string = '';
    updatedByASPNETUsers: string = '';
    emailSubjectDescription: string = '';
    orderDateShort: string = '';
    closingDateShort: string = '';

  }

  export class EscrowParams {
    escrowOrderID: number = -1;
    submittedByID: number = -1;
    orderStatusID: number = -1; 
    checkedOutToID: number = -1;
    fundsID: number = -1;
    statementID: number = -1;;
    customerID: number = -1;
    agreementID: number = -1;
    orderDateStart: Date = new Date("01/01/1900 00:00:00");
    orderDateEnd: Date = new Date("01/01/2100 00:00:00");
    closingDateStart: Date = new Date("01/01/1900 00:00:00");
    closingDateEnd: Date = new Date("01/01/2100 00:00:00");
    useEngines: boolean = false;
    useProps: boolean = false; 
    iraf: boolean = false;
    irEngine: boolean = false;
    isEscrow: boolean = false;
    isIRSearch: boolean = false;
    isIncludeRegistration : boolean = false;
    isInclude337: boolean = false;        
    departmentName: string = '';
    fundListType: string = '';
    statementType: string = '';
    closingDescription: string = '';
   
  }

  export class EscrowCopy {
    domainUrl: string = '';
    trackerUrl: string = '';
    newEscrowOrderID: number = -1;
    
  }
  

