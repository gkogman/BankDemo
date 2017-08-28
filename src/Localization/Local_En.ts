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
  public deleteUserAssignment:string;
  public deleteUserAssignmentMsg:string;
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
      this.direction="ltr";
      this.textAlign="left";
      this.edit="Edit";
      this.delete="Delete";
      this.submit="Submit";
      this.cancel="Cancel";
      
      //app.components Header
      this.header1="Northwind";
      this.header2="Traders";
      this.headerColor = "#0BCD4D";

      //Home.components
      this.viewsHeader = "Your views";
      this.viewsNothingToShow="You do not have access to any views";

      //Login.components
      this.dashboard="Dashboard";
      this.admin="Admin";
      this.logout="Logout";

      //AdminPage.components
      
      this.administrator="Administrator";
      this.demoContract="Deploy Demo Contract";
      this.customContract="Upload Custom Contract";
      this.userAssignment="User Assignment";

      //assignUser.Components
      this.assignUser="Assign User";
      this.user="User";
      this.users="Users";
      this.contract="Contract";
      this.persona="Persona";
      this.createNewAssignment="Create New Assignment";
      this.deleteUserAssignment="Delete User Assignment";
      this.deleteUserAssignmentMsg="Are you sure you want to delete the assignment?";
      this.editUserAssignment="Edit User Assignment";

      //Dialog
      this.loadUsers="Loading Users....";
      this.loadContract="Loading Contracts....";
      this.loadPersona="Loading Personas.....";
  }
};