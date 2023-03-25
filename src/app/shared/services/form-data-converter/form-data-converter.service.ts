import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataConverterService {
  constructor() {}

  /**
   * Create Form Data from Object
   *
   * @param {Object} object
   * @param {FormData} [form]
   * @param {string} [namespace]
   * @returns {FormData}
   * @memberof RegistrationComponent
   */
  public createFormData(
    object: any,
    form?: FormData,
    namespace?: string
  ): FormData {
    const formData = form || new FormData();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      const formKey = namespace ? `${namespace}.${property}` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === 'object' &&
        !(object[property] instanceof File)
      ) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }
}
