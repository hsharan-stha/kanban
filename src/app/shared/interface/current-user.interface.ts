export interface CurrentUserInterface {
  profile: Profile,
  office: Office
}

export interface Profile {
  firstName: string,
  middleName: string,
  lastName: string,
  firstNameNp: string,
  middleNameNp: string,
  lastNameNp: string,
  email: string,
  username: string,
  employeeId: string,
  contactNo: string,
  contactNoNp: string,
  localBody: any,
  ward: number,
  province: any,
  district:any
}


export interface Office {
  code: string,
  name: string
  nameNp: string,
  address: string,
  addressNp: string,
  designation: any
}
