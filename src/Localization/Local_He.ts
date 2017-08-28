export class Local  {
  public  direction:string;
  public  textAlign:string;
  public  header1:string;
  public  header2:string;
  public  headerColor:string;
  public  viewsHeader:string;
  public viewsNothingToShow:string;
  public dashboard:string;
  public admin:string;
  public logout:string;
  public administrator:string;
  public demoContract:string;
  public customContract:string;
  public userAssignment:string;
  public assignUser:string;
  public user:string;
  public users:string;
  public contract:string;
  public persona:string;
  public createNewAssignment:string;
  public deleteUserAssignment :string;
  public deleteUserAssignmentMsg :string;
   public editUserAssignment:string;
  public edit:string;
  public delete:string;
  public cancel:string;
  public submit:string;
  public loadUsers:string;
  public loadContract:string;
  public loadPersona:string;

  constructor(){
      //general
      this.direction="rtl";
      this.textAlign="right";
      this.edit="ערוך";
      this.delete="מחק";
      this.cancel="ביטול";
      this.submit="אישור";

      //app.components Header
      this.header1="בנק";
      this.header2="הפועלים";
      this.headerColor = "red";

      //Home.components
      this.viewsHeader = "תצוגות";
      this.viewsNothingToShow = "אין תצוגות רלוונטיות עבורך.";

      //Login.component
      this.dashboard="לוח בקרה";
      this.admin="אדמיניסטרציה";
      this.logout="התנתק";

      //AdminPage.components
      this.administrator="מנהל מערכת";
      this.demoContract="התקן חוזה לדוגמה";
      this.customContract="התקן חוזה מותאם אישית";
      this.userAssignment="ניהול משתמשים";

      //assignUser.Components
      this.assignUser="ניהול משימות";
      this.user="משתמש";
      this.contract="שם חוזה";
      this.persona="תפקיד";
      this.createNewAssignment="צור משימה חדשה";
      this.users="משתמשים";
      this.deleteUserAssignment="מחק משימה";
      this.deleteUserAssignmentMsg="האם אתה בטוח כי ברצונך למחוק את המשימה ?";
      this.editUserAssignment="ערוך משימה";

       //Dialog
      this.loadUsers="מעדכן משתמשים....";
      this.loadContract="מעדכן חוזים....";
      this.loadPersona="מעדכן תפקידים....";
  }
};