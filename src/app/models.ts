import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

export interface ContractMetadata {
	ContractID: number,
	Name: string,
	Description: string,
	Properties: ContractProperty[],
	Personas: Persona[],
	Actions: ContractAction[]
}

export interface ContractAction {
	ContractActionID: number,
	Name: string,
	DisplayName: string,
	IsInitiatingAction: boolean,
	Parameters: ContractActionParameter[]
}

export interface ContractActionParameter {
	Name: string,
	DisplayName: string,
	DataType: string,
	SequenceNbr: number,
	Constraints?: string,
	MinArraySize? : number,
	MaxArraySize? :number,
	IsArray : boolean,
	ConstraintsArray: any[]
}

export interface ContractProperty {
	Name: string,
	DataType: string
}

export interface ContractInstanceActivityInput {
	ContractID: number,
	ContractInstanceID?: number,
	Parameters: ContractInstanceActivityParameterInput[],
	ContractAction: ContractAction,
}

export interface ContractInstanceActivityParameterInput {
	Name: string,
	DataType: string,
	Value: string,
	ContractActionParameter: ContractActionParameter
}

export interface UIElementContractInstanceActivityParameterInput {
	Name: string,
	DataType: string,
	Value: string,
	ContractActionParameter: ContractActionParameter
	Selections: number[],
	Settings : IMultiSelectSettings;
}
export interface ContractInstanceActivity {
	ContractInstanceActionID?: number,
	ContractID: number,
	ContractAction: ContractAction,
	ContractInstanceID?: number,
	TransactionReceipt?: string,
	CompletedOn?: Date,
	StartedOn?: Date,
	CreatedBy?: ContractInstanceParticipant,
	CreatedOn?: Date,
	Parameters: ContractInstanceActivityParameter[]
}

export interface ContractInstanceActivityParameter {
	ContractInstanceActionID: number,
	ContractInstanceActionParameterID: number
	ContractActionParameterID: number
	Name: string,
	DisplayName: string
	Description: string,
	InboundParameter: boolean,
	DataType: string,
	IsArray: boolean,
	MinArraySize?: number,
	MaxArraySize?: number,
	Constraints?: string,
	SequenceNbr: number,
	Value: string
}
export interface ContractInstance {
	ContractID: number,
	CreatedBy: number,
	ContractInstanceID: number,
	ProcessPercentComplete: number,
	ContractInstanceAddress: number,
	StartedDtTm: Date,
	CompletedDtTm: Date,
	ContractState: ContractState,
	Properties: ContractInstanceProperty[],
	Personas: ContractInstanceParticipant[]
	Blocks: Block[],
	Transactions: Transaction[],
	Actions: ContractAction[]
}

export interface ContractInstanceProperty {
	ContractInstancePropertyID: number,
	ContractPropertyID: number,
	Name: string,
	DisplayName: string,
	SortOrder: number,
	DataType: string,
	DefaultValue: string,
	Description: string,
	IsStatic: boolean,
	IsActionColumn: boolean,
	Value: string
}

export interface ContractState {
	ContractStateID: number,
	Name: string
	DisplayName: string,
	IsDefaultState: boolean
}

export interface ContractInstanceParticipant {
	User: User,
	Persona: Persona
}

export interface Persona {
	PersonaID: number,
	ContractPersonaID: number;
	Name: string,
	DisplayName: string,
	Description: string,
	Role: Role
}

export interface User {
	AvatarUrl: string,
	ChainAddress: string,
	Description: string,
	DisplayName: string,
	EmailAddress: string,
	ExternalID: number
	FirstName: string,
	IsOrganization: boolean,
	LastName: string,
	MobileNbr: string,
	UserID: number,
	Roles: Role[]

}

export interface Role {
	RoleID: number,
	Name: string,
	Description: string
}

export interface Block {
	ID: number,
	BlockID?: number,
	AddedDtTm: Date
}
export interface Transaction {
	ContractInstanceTransactionID: number,
	AssociatedBlockID: number,
	FromAddress: string,
	ToAddress: string,
	Value: string,
	TransactionReceipt: string
}

export interface TransactionUIBlock {
	Transaction: Transaction,
	Block?: Block
}

export interface Notification {
	ContractInstanceNotificationID: number,
	ContractID: number,
	ContractInstanceID: number,
	ContractActionID: number,
	HeaderText: string,
	MessageText: string,
	Persona: ContractInstanceParticipant
}

export interface FileUpload {
	File: File,
	FileAsText : string,
	Url: any
}


export interface FileUploadIndexed{
	Index : number,
	FileUploads : FileUpload[]
}
export interface Document {
	ContractInstanceDocumentID, number
	ContractInstanceID: number,
	Description: string,
	Hash: string,
	Name: string,
	Source: string,
	Url: string
	UserID: number
}

export interface UserAssignment {
	ID: number,
	Persona: Persona,
	Contract: ContractMetadata,
	User: User
}

export interface UserAssignmentPage {
	PageCount: number,
	TotalCount: number,
	RecordsPerPage: number,
	UserAssignments: UserAssignment[]
}